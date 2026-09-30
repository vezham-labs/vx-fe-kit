import { RouterProvider, createMemoryHistory } from '@tanstack/react-router'
import { render, waitFor } from '@testing-library/react'

import { createRouter } from '@vx/start/router/tanstack'

import { vxI18n } from '../src/generated/vx'
import { routeTree } from '../src/routeTree.gen'

const renderApp = (path = '/') => {
  const router = createRouter({
    history: createMemoryHistory({
      initialEntries: [path]
    }),
    routeTree
  })

  return render(<RouterProvider router={router} />)
}

describe('App', () => {
  it('uses the configured default language for the document', async () => {
    renderApp()

    await waitFor(() =>
      expect(document.documentElement.lang).toBe(vxI18n.defaultLanguage)
    )
  })

  it('should render successfully', async () => {
    const { baseElement } = renderApp()

    await waitFor(() => expect(baseElement).toBeTruthy())
  })

  it('should mount app shell container', async () => {
    const { baseElement } = renderApp()

    await waitFor(() =>
      expect(baseElement.querySelector('.vx-app')).toBeTruthy()
    )
  })
})
