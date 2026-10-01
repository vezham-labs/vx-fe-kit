import { RouterProvider, createMemoryHistory } from '@tanstack/react-router'
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within
} from '@testing-library/react'

import { createRouter } from '@vx/start/router/tanstack'

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

describe('Academic navigation', () => {
  beforeAll(() => {
    Element.prototype.getAnimations = () => []
  })

  it('opens Academic and switches between grouped and standalone pages', async () => {
    renderApp('/academic')
    const sidebar = await screen.findByRole('navigation', {
      name: 'Academic sections'
    })
    await screen.findByRole('tab', { name: 'All Classes' })
    fireEvent.click(screen.getByRole('tab', { name: 'Schedule' }))
    await waitFor(() =>
      expect(screen.getByRole('tabpanel').textContent).toContain(
        '/academic/classes/schedule'
      )
    )

    fireEvent.click(within(sidebar).getByRole('link', { name: 'Class Room' }))
    await screen.findByText('/academic/classroom')
    expect(screen.queryByRole('tablist')).toBeNull()
    expect(
      screen.getByRole('searchbox', { name: 'Search content' })
    ).toBeTruthy()

    fireEvent.click(
      within(
        screen.getByRole('navigation', { name: 'Academic sections' })
      ).getByRole('link', { name: 'Examinations' })
    )
    await screen.findByRole('tab', { name: 'Exam' })
    fireEvent.click(screen.getByRole('tab', { name: 'Exam Results' }))
    await waitFor(() =>
      expect(screen.getByRole('tabpanel').textContent).toContain(
        '/academic/examinations/exam-results'
      )
    )
  })

  it('loads an Academic tab directly', async () => {
    renderApp('/academic/examinations/grades')
    const grades = await screen.findByRole('tab', { name: 'Grades' })
    expect(grades.getAttribute('aria-selected')).toBe('true')
    expect(screen.getByRole('tabpanel').textContent).toContain(
      '/academic/examinations/grades'
    )
  })
})
