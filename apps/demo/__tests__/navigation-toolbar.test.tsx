import { RouterProvider, createMemoryHistory } from '@tanstack/react-router'
import { fireEvent, render, screen, within } from '@testing-library/react'

import { toast } from '@vezham/react-v3'

import { createRouter } from '@vx/start/router/tanstack'

import { routeTree } from '../src/routeTree.gen'

const renderApp = async (path = '/') => {
  const router = createRouter({
    history: createMemoryHistory({ initialEntries: [path] }),
    routeTree
  })
  await router.load()
  render(<RouterProvider router={router} />)
  return router
}

describe('Navigation toolbar', () => {
  beforeAll(() => {
    Element.prototype.getAnimations = () => []
  })

  it('shows a placeholder toast for page search without opening command search', async () => {
    await renderApp('/tabs/overview')
    const search = await screen.findByRole('button', { name: 'Search' })
    const notice = vi.spyOn(toast, 'info').mockReturnValue('search-notice')
    try {
      fireEvent.click(search)
      expect(notice).toHaveBeenCalledWith('Search is not implemented yet.')
      expect(screen.queryByPlaceholderText(/Search commands/)).toBeNull()
    } finally {
      notice.mockRestore()
    }
  })

  it('uses page-specific Add actions in the School OS toolbar order', async () => {
    await renderApp('/academic/classes/allclasses')
    const create = await screen.findByRole('button', { name: 'Add Class' })
    const notice = vi.spyOn(toast, 'info').mockReturnValue('create-notice')
    try {
      fireEvent.click(create)
      expect(notice).toHaveBeenCalledWith(
        'Create is not implemented in this navigation demo.'
      )
    } finally {
      notice.mockRestore()
    }
    const actions = screen.getByRole('group', { name: 'Toolbar actions' })
    expect(
      within(actions)
        .getAllByRole('button')
        .map(button => button.getAttribute('aria-label'))
        .filter(Boolean)
    ).toEqual([
      'Search',
      'Sync',
      'Filter',
      'Grid view',
      'List view',
      'More',
      'Add Class'
    ])
    const viewOptions = within(actions).getByRole('group', {
      name: 'View options'
    })
    fireEvent.click(within(actions).getByRole('button', { name: 'Filter' }))
    fireEvent.click(await screen.findByRole('menuitem', { name: 'Images' }))
    expect(
      within(actions)
        .getByRole('button', { name: 'Filter' })
        .getAttribute('aria-pressed')
    ).toBe('true')
    expect(
      within(viewOptions)
        .getByRole('button', { name: 'Grid view' })
        .getAttribute('aria-pressed')
    ).toBe('true')
    fireEvent.click(
      within(viewOptions).getByRole('button', { name: 'List view' })
    )
    expect(
      within(viewOptions)
        .getByRole('button', { name: 'List view' })
        .getAttribute('aria-pressed')
    ).toBe('true')
    fireEvent.click(screen.getByRole('tab', { name: 'Schedule' }))
    await screen.findByRole('button', { name: 'Add Schedule' })
    expect(screen.getByRole('tabpanel').textContent).toContain(
      '/academic/classes/schedule'
    )
  })

  it('shows the Sync placeholder without refreshing and hides Add on result pages', async () => {
    const router = await renderApp('/academic/examinations/exam-results')
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
