import { RouterProvider, createMemoryHistory } from '@tanstack/react-router'
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within
} from '@testing-library/react'

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
  beforeAll(() => {
    Element.prototype.getAnimations = () => []
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

  it('loads child menus as tabs and navigates between them', async () => {
    renderApp('/tabs/overview')

    const activity = await screen.findByRole('tab', { name: 'Activity' })
    fireEvent.click(activity)

    await waitFor(() =>
      expect(activity.getAttribute('aria-selected')).toBe('true')
    )
    expect(screen.getByRole('tabpanel').textContent).toContain('/tabs/activity')
  })

  it('loads sidebar sections with their own route tabs', async () => {
    renderApp('/workspace/projects/activity')

    const sidebar = await screen.findByRole('navigation', {
      name: 'Workspace sections'
    })
    expect(
      screen
        .getByRole('tab', { name: 'Activity' })
        .getAttribute('aria-selected')
    ).toBe('true')
    fireEvent.click(within(sidebar).getByRole('link', { name: 'Team' }))

    const members = await screen.findByRole('tab', { name: 'Members' })
    expect(members.getAttribute('aria-selected')).toBe('true')
    fireEvent.click(screen.getByRole('tab', { name: 'Roles' }))
    await waitFor(() =>
      expect(screen.getByRole('tabpanel').textContent).toContain(
        '/workspace/team/roles'
      )
    )
  })

  it('keeps navigation collapsed while changing child routes', async () => {
    renderApp('/workspace/projects/overview')
    await screen.findByRole('navigation', { name: 'Workspace sections' })
    fireEvent.click(
      screen.getByRole('button', { name: 'Collapse section navigation' })
    )
    expect(
      screen.queryByRole('navigation', { name: 'Workspace sections' })
    ).toBeNull()
    fireEvent.click(screen.getByRole('tab', { name: 'Activity' }))
    await waitFor(() =>
      expect(screen.getByRole('tabpanel').textContent).toContain(
        '/workspace/projects/activity'
      )
    )
    expect(
      screen.queryByRole('navigation', { name: 'Workspace sections' })
    ).toBeNull()
    fireEvent.click(
      screen.getByRole('button', { name: 'Expand section navigation' })
    )
    expect(
      screen.getByRole('navigation', { name: 'Workspace sections' })
    ).toBeTruthy()
  })

  it('opens section navigation in a drawer and closes it after selecting a section', async () => {
    renderApp('/workspace/projects/overview')
    fireEvent.click(
      await screen.findByRole('button', { name: 'Open section sidebar' })
    )
    const drawer = await screen.findByRole('dialog', { name: 'Projects' })
    fireEvent.click(within(drawer).getByRole('link', { name: 'Team' }))
    await screen.findByRole('tab', { name: 'Members' })
    await waitFor(() =>
      expect(screen.queryByRole('dialog', { name: 'Projects' })).toBeNull()
    )
  })

  it.each([
    ['/tabs', '/tabs/overview'],
    ['/workspace', '/workspace/projects/overview']
  ])('opens the default child at %s', async (path, title) => {
    renderApp(path)
    await waitFor(() =>
      expect(screen.getByRole('tabpanel').textContent).toContain(title)
    )
  })
})
