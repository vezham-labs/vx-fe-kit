import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { runInNewContext } from 'node:vm'
import { ModuleKind, transpile } from 'typescript'
import { afterEach, describe, expect, it } from 'vitest'
import { stringify } from 'yaml'

import { getNavigationFiles } from './index'

const roots: string[] = []
const project = () => {
  const root = mkdtempSync(path.join(tmpdir(), 'vx-nav-'))
  roots.push(root)
  return root
}
afterEach(() => {
  for (const root of roots.splice(0))
    rmSync(root, { recursive: true, force: true })
})

describe('navigation generation', () => {
  it('looks up children, returns an empty list for leaves, and rejects missing keys', () => {
    const root = project()
    const children = [{ key: 'classes', title: 'Classes' }]
    writeFileSync(
      path.join(root, 'vx.nav.yaml'),
      stringify({
        items: [
          { key: 'school', title: 'School', children },
          { key: 'home', title: 'Home' }
        ]
      })
    )
    const [file] = getNavigationFiles(root)
    const exports: {
      getNavigationChildren?: (key: string) => unknown
      navigationItems?: { key: string; children?: typeof children }[]
    } = {}
    runInNewContext(transpile(file.content, { module: ModuleKind.CommonJS }), {
      exports
    })
    const lookup = exports.getNavigationChildren!
    expect(lookup('school')).toEqual(children)
    const updatedChildren = [{ key: 'teachers', title: 'Teachers' }]
    exports.navigationItems![0].children = updatedChildren
    expect(lookup('school')).toBe(updatedChildren)
    expect(lookup('home')).toEqual([])
    expect(() => lookup('missing')).toThrow('Unknown navigation key: missing')
    expect(() => lookup('toString')).toThrow('Unknown navigation key: toString')
  })
  it('is optional for apps without shell navigation', () => {
    expect(getNavigationFiles(project())).toEqual([])
  })

  it('preserves ordered nested navigation and emits a typed module', () => {
    const root = project()
    const items = [
      {
        key: 'school',
        title: 'School',
        href: '/school',
        children: [
          {
            key: 'classes',
            title: 'Classes',
            href: '/school/classes',
            icon: 'vx:book'
          }
        ]
      }
    ]
    writeFileSync(path.join(root, 'vx.nav.yaml'), stringify({ items }))
    const [file] = getNavigationFiles(root)
    expect(file.path).toBe(path.join(root, 'src/generated/navigation.ts'))
    expect(file.content).toContain(JSON.stringify(items, null, 2))
    expect(file.content).toContain('satisfies AppNavigationItem[]')
  })

  it.each([
    [
      { key: 'home', title: 'Home' },
      { key: 'home', title: 'Duplicate' }
    ],
    [{ key: 'home', title: 'Home', children: [{ key: 'missing-title' }] }],
    [{ key: 'home', title: 'Home', onPress: 'callback' }],
    [{ key: 'home', title: 'Home', href: 42 }]
  ])('rejects invalid navigation before writing output: %j', (...items) => {
    const root = project()
    writeFileSync(path.join(root, 'vx.nav.yaml'), stringify({ items }))
    expect(() => getNavigationFiles(root)).toThrow()
  })
})
