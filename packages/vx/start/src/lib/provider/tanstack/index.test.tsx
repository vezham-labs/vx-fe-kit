import { Outlet } from '@tanstack/react-router'
import { describe, expect, it } from 'vitest'

import { RootDocument, createRootComponent, defineConfig } from './index'

describe('TanStack root component', () => {
  it('renders the router outlet by default', () => {
    const root = defineConfig({})

    expect(root.type).toBe(RootDocument)
    expect(root.props.children.type).toBe(Outlet)
  })

  it('renders custom children when supplied', () => {
    const children = <main>Application</main>
    const RootComponent = createRootComponent({ children })
    const root = RootComponent()

    expect(root.type).toBe(RootDocument)
    expect(root.props.children).toBe(children)
  })
})
