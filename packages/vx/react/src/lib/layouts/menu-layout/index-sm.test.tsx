import {
  fireEvent,
  render,
  screen,
  waitFor,
  within
} from '@testing-library/react'
import { type ComponentProps, type ReactNode } from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { WorkspaceNavigationProvider } from '../../components/workspace-navigation'
import { SectionLayout } from '../section'
import { MenuSM } from './index-sm'

const actions = vi.hoisted(() => ({
  openCommand: vi.fn(),
  closeCommand: vi.fn(),
  openInfoPanel: vi.fn(),
  closeInfoPanel: vi.fn(),
  toggleInfoPanel: vi.fn()
}))

vi.mock('@tanstack/react-router', () => ({
  useLocation: () => ({ pathname: '/academic' }),
  useNavigate: () => vi.fn(),
  useRouter: () => ({ history: { back: vi.fn(), forward: vi.fn() } }),
  Link: ({ to, children, ...props }: ComponentProps<'a'> & { to: string }) => (
    <a href={to} {...props}>
      {children}
    </a>
  )
}))
vi.mock('../section/toolbar', () => ({
  SectionToolbar: ({
    navigationControls
  }: {
    navigationControls: ReactNode
  }) => <div>{navigationControls}</div>
}))

vi.mock('../../components/command', () => ({
  useCommand: () => actions
}))
vi.mock('../../components/panel/info-panel', () => ({
  useInfoPanel: () => actions,
  InfoPanelContainer: () => null
}))
vi.mock('../../store/users/useUserStore', () => ({
  useUser: () => ({ user: null })
}))
vi.mock('../../components/menu', () => ({
  BottomNavbar: () => <nav aria-label="Bottom navigation">Home</nav>
}))
vi.mock('../../components/panel/footer', () => ({
  Footer: () => <button>Account</button>
}))
vi.mock('../../components/panel/footer/ai', () => ({ aiPanel: {} }))
vi.mock('../../components/panel/header/bookmarks', () => ({
  bookmarksPanel: {}
}))
vi.mock('../../components/panel/header/storage', () => ({ storagePanel: {} }))
vi.mock('../../components/panel/footer/control-center', () => ({
  ControlCenterDrawer: () => null
}))
vi.mock('../../components/panel/footer/notification-center', () => ({
  NotificationDrawer: () => null
}))
vi.mock('../../components/panel/footer/preferences/modal', () => ({
  UserInfoModal: () => null
}))

const items = [{ key: 'home', title: 'Home', href: '/' }]

const renderMobile = () =>
  render(
    <WorkspaceNavigationProvider>
      <MenuSM items={items} />
    </WorkspaceNavigationProvider>
  )

describe('Small-screen navigation', () => {
  beforeEach(() => vi.clearAllMocks())

  it.each([
    { label: 'Bookmarks', panel: 'bookmarks' },
    { label: 'Storage', panel: 'storage' }
  ])(
    'opens $label from the bubble while retaining the bottom navigation',
    async ({ label, panel }) => {
      renderMobile()

      const bubble = screen.getByRole('group', {
        name: 'Mobile navigation controls'
      })
      expect(within(bubble).queryByLabelText('Bookmarks')).toBeNull()
      expect(within(bubble).queryByLabelText('Storage')).toBeNull()

      fireEvent.click(
        within(bubble).getByRole('button', { name: 'Open application menu' })
      )
      fireEvent.click(await screen.findByRole('menuitem', { name: label }))

      expect(actions.toggleInfoPanel).toHaveBeenCalledWith(panel)
      await waitFor(() => expect(screen.queryByRole('menu')).toBeNull())
      expect(
        screen.getByRole('navigation', { name: 'Bottom navigation' })
      ).toBeVisible()
      expect(
        screen.getByRole('group', { name: 'Mobile account actions' })
      ).toBeVisible()
    }
  )

  it('opens search from the bubble while retaining the bottom navigation', async () => {
    renderMobile()
    expect(
      screen.queryByRole('button', { name: /(?:Hide|Show) Dock/ })
    ).toBeNull()
    expect(screen.queryByRole('button', { name: 'Show Sidebar' })).toBeNull()
    fireEvent.click(
      screen.getByRole('button', { name: 'Open application menu' })
    )
    await screen.findByRole('menu', { name: /application menu/i })
    expect(
      screen.queryByRole('menuitem', { name: /(?:Hide|Show) Dock/ })
    ).toBeNull()
    fireEvent.click(
      await screen.findByRole('menuitem', { name: 'Open command palette' })
    )

    expect(actions.openCommand).toHaveBeenCalledOnce()
    await waitFor(() => expect(screen.queryByRole('menu')).toBeNull())
    expect(
      screen.getByRole('navigation', { name: 'Bottom navigation' })
    ).toBeVisible()
  })

  it('opens the module drawer from the bubble and menu, then unregisters it when leaving the module', async () => {
    const { rerender } = render(
      <WorkspaceNavigationProvider>
        <MenuSM items={items} />
        <SectionLayout
          title="Academic"
          tabs={[]}
          sidebarItems={[
            { key: 'students', title: 'Students', href: '/academic/students' }
          ]}>
          Students page
        </SectionLayout>
      </WorkspaceNavigationProvider>
    )
    const bubble = screen.getByRole('group', {
      name: 'Mobile navigation controls'
    })
    const bottomNavigation = screen.getByRole('navigation', {
      name: 'Bottom navigation'
    })
    fireEvent.click(
      within(bubble).getByRole('button', { name: 'Show Sidebar' })
    )
    let drawer = await screen.findByRole('dialog', { name: 'Academic' })
    expect(within(drawer).getByRole('link', { name: 'Students' })).toBeVisible()
    expect(bottomNavigation).toBeInTheDocument()
    expect(
      within(bubble).getByRole('button', { name: 'Hide Sidebar', hidden: true })
    ).toBeInTheDocument()

    fireEvent.click(
      within(drawer).getByRole('button', { name: 'Hide Sidebar' })
    )
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull())
    expect(
      within(bubble).getByRole('button', { name: 'Show Sidebar' })
    ).toBeVisible()

    fireEvent.click(
      within(bubble).getByRole('button', { name: 'Open application menu' })
    )
    fireEvent.click(
      await screen.findByRole('menuitem', { name: /Show Sidebar/ })
    )
    drawer = await screen.findByRole('dialog', { name: 'Academic' })
    expect(bottomNavigation).toBeInTheDocument()
    fireEvent.click(
      within(drawer).getByRole('button', { name: 'Hide Sidebar' })
    )
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull())

    rerender(
      <WorkspaceNavigationProvider>
        <MenuSM items={items} />
      </WorkspaceNavigationProvider>
    )
    expect(
      screen.queryByRole('button', { name: /(?:Hide|Show) Sidebar/ })
    ).toBeNull()
    expect(bottomNavigation).toBeVisible()
  })
})
