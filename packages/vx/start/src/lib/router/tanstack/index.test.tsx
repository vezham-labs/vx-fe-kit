import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  useRouter
} from '@tanstack/react-router'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, expect, it, vi } from 'vitest'

import { RouterRoot, createRouter } from './index'

vi.mock('@vx/env/vite', () => ({
  APP_ID: 'test',
  APP_NAME: 'Test',
  APP_VER: '1',
  APP_ENV: 'development',
  __DEV__: true
}))
vi.mock('@vx/template/components', () => ({
  Loading: () => null,
  ErrorPage: () => <span>Route error</span>,
  NotFound: () => <span>Not found</span>
}))
vi.mock('../../provider/shared/devtools', () => ({
  ClientDevtools: ({ env }: { env: boolean }) => {
    const router = useRouter()
    return env ? <span>Devtools: {router.state.location.pathname}</span> : null
  }
}))

afterEach(cleanup)

it('renders route content and devtools inside the same router context', async () => {
  const root = createRootRoute({ component: RouterRoot })
  const page = createRoute({
    getParentRoute: () => root,
    path: '/',
    component: () => <span>Page content</span>
  })
  const router = createRouter({
    routeTree: root.addChildren([page]),
    history: createMemoryHistory({ initialEntries: ['/'] })
  })
  await router.load()
  render(<RouterProvider router={router} />)
  expect(await screen.findByText('Page content')).toBeTruthy()
  expect(await screen.findByText('Devtools: /')).toBeTruthy()
})
