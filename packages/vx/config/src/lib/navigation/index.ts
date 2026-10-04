import { existsSync } from 'node:fs'
import path from 'node:path'

import { readYamlConfig } from '../yaml-config.ts'
import { validateAppMenu } from './app-menu.ts'
import { validateToolbar } from './toolbar.ts'

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const validateItems = (items: unknown, location: string): void => {
  if (!Array.isArray(items)) throw new Error(`${location} must be an array`)
  const keys = new Set<string>()
  for (const item of items) {
    if (!isObject(item)) throw new Error(`${location} items must be objects`)
    for (const field of ['key', 'title']) {
      if (typeof item[field] !== 'string' || !item[field].trim()) {
        throw new Error(`${location}.${field} must be a non-empty string`)
      }
    }
    const key = item.key as string
    if (keys.has(key))
      throw new Error(`Duplicate navigation key: ${location}.${key}`)
    keys.add(key)
    for (const [field, value] of Object.entries(item)) {
      if (field === 'children') {
        validateItems(value, `${location}.${key}.children`)
      } else if (field === 'toolbar') {
        validateToolbar(value, `${location}.${key}.toolbar`)
      } else if (
        !['key', 'title', 'href', 'icon', 'iconActive'].includes(field)
      ) {
        throw new Error(`Unknown navigation field: ${location}.${key}.${field}`)
      } else if (typeof value !== 'string') {
        throw new Error(`${location}.${key}.${field} must be a string`)
      }
    }
  }
}

export const getNavigationFiles = (projectRoot: string) => {
  const file = path.join(projectRoot, 'vx.nav.yaml')
  if (!existsSync(file)) return []
  const config = readYamlConfig<unknown>(file)
  if (
    !isObject(config) ||
    Object.keys(config).some(key => !['items', 'appMenu'].includes(key))
  ) {
    throw new Error(`${file} must contain items and optional appMenu arrays`)
  }
  validateItems(config.items, file)
  if (config.appMenu !== undefined)
    validateAppMenu(config.appMenu, `${file}.appMenu`)
  const helpers = `
export const getNavigationChildren = (key: string) => {
  const item = navigationItems.find(item => item.key === key)
  if (!item) {
    throw new Error('Unknown navigation key: ' + key)
  }
  return 'children' in item && Array.isArray(item.children) ? item.children : []
}
`
  return [
    {
      path: path.join(projectRoot, 'src/generated/navigation.ts'),
      content: `// Generated from vx.nav.yaml. DO NOT EDIT.\nimport type { AppNavigationItem, AppMenuItem } from '@vx/react'\n\nexport const navigationItems = ${JSON.stringify(config.items, null, 2)} satisfies AppNavigationItem[]\n\nexport const appMenu = ${JSON.stringify(config.appMenu ?? [], null, 2)} satisfies AppMenuItem[]\n${helpers}`
    }
  ]
}
