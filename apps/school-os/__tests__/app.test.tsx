import { RouterProvider, createMemoryHistory } from '@tanstack/react-router'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

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
  it('opens the local Create drawer from a toolbar action', async () => {
    Element.prototype.getAnimations = () => []
    Element.prototype.scrollIntoView = () => undefined
    renderApp('/academic/classes/allclasses')
    fireEvent.click(await screen.findByRole('button', { name: 'Add Class' }))
    await screen.findByRole('dialog')
  })
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

  it('opens a linked exam schedule row on initial navigation', async () => {
    Element.prototype.getAnimations = () => []
    Element.prototype.scrollIntoView = () => undefined

    const { baseElement } = renderApp(
      '/academic/examinations/exam-schedule/RT167648?mode=view'
    )

    await waitFor(() =>
      expect(baseElement.querySelector('[role="dialog"]')).toBeTruthy()
    )
  })
})
