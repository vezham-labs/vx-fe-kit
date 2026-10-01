import { RouterProvider, createMemoryHistory } from '@tanstack/react-router'
import { fireEvent, render, screen, within } from '@testing-library/react'

import { toast } from '@vezham/react-v3'

import { createRouter } from '@vx/start/router/tanstack'

import { routeTree } from '../src/routeTree.gen'

const renderApp = (path = '/') => {
  const router = createRouter({
    history: createMemoryHistory({ initialEntries: [path] }),
    routeTree
  })
  render(<RouterProvider router={router} />)
  return router
}

describe('Navigation toolbar', () => {
  beforeAll(() => {
    Element.prototype.getAnimations = () => []
  })

  it('uses page-specific Add actions in the School OS toolbar order', async () => {
    renderApp('/academic/classes/allclasses')
    const create = await screen.findByRole('button', { name: 'Add Class' })
    const onAction = vi.fn()
    window.addEventListener('demo:toolbar-action', onAction)
    try {
      fireEvent.click(create)
      expect(onAction.mock.calls[0][0].detail).toEqual({
        action: 'create',
        pageKey: 'allclasses'
      })
      const actions = screen.getByRole('group', { name: 'Toolbar actions' })
      expect(
        within(actions)
          .getAllByRole('button')
          .map(button => button.getAttribute('aria-label'))
          .filter(Boolean)
      ).toEqual(['Search', 'Sync', 'More', 'Add Class'])
      fireEvent.click(screen.getByRole('tab', { name: 'Schedule' }))
      await screen.findByRole('button', { name: 'Add Schedule' })
      expect(screen.getByRole('tabpanel').textContent).toContain(
        '/academic/classes/schedule'
      )
    } finally {
      window.removeEventListener('demo:toolbar-action', onAction)
    }
  })

  it('shows the Sync placeholder without refreshing and hides Add on result pages', async () => {
    const router = renderApp('/academic/examinations/exam-results')
    await screen.findByRole('tab', { name: 'Exam Results' })
    const actions = screen.getByRole('group', { name: 'Toolbar actions' })
    expect(within(actions).queryByRole('button', { name: /^Add / })).toBeNull()
    const refresh = vi.spyOn(router, 'invalidate')
    fireEvent.click(screen.getByRole('button', { name: 'Sync' }))
    await screen.findByRole('alertdialog', {
      name: 'Server sync is not implemented yet.'
    })
    expect(refresh).not.toHaveBeenCalled()
    toast.clear()
    expect(screen.getByRole('tabpanel').textContent).toContain(
      '/academic/examinations/exam-results'
    )
  })
})
