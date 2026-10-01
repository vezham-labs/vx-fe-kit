import { fireEvent, render, screen } from '@testing-library/react'
import { type ComponentProps, type ReactNode } from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { Header } from '../../components/panel/header'
import { type HeaderActionsProps } from '../../components/panel/header/types'
import type { AppNavigationItem } from '../../navigation'
import { MenuMD } from './index-md'

const items: AppNavigationItem[] = [
  { key: 'home', title: 'Home', href: '/', icon: 'vx:home' },
  { key: 'academic', title: 'Academic', href: '/academic', icon: 'vx:library' },
  { key: 'reports', title: 'Reports', href: '/reports', icon: 'vx:chart' }
]

const state = vi.hoisted(() => ({
  pathname: '/',
  isNavigationCollapsed: false,
  expandNavigation: vi.fn(),
  closeInfoPanel: vi.fn(),
  openCommand: vi.fn(),
  closeCommand: vi.fn()
}))

vi.mock('@tanstack/react-router', () => ({
  useLocation: () => ({ pathname: state.pathname })
}))
vi.mock('../../components/workspace-navigation', () => ({
  useWorkspaceNavigation: () => state,
  useSidebarShortcut: vi.fn()
}))
vi.mock('../../components/command', () => ({
  useCommand: () => state
}))
vi.mock('../../components/panel/info-panel', () => ({
  useInfoPanel: () => state,
  InfoPanelContainer: () => null
}))
vi.mock('../../store/users/useUserStore', () => ({
  useUser: () => ({ user: null })
}))
vi.mock('../../components/panel/header', () => ({
  Header: vi.fn(
    ({
      compact,
      onOpenNavigation,
      onCollapseNavigation
    }: HeaderActionsProps) =>
      compact ? (
        <div>
          <button onClick={onOpenNavigation}>Show Sidebar</button>
          <button onClick={state.openCommand}>Open command palette</button>
        </div>
      ) : (
        <div>
          Application menu
          {onCollapseNavigation && (
            <button onClick={onCollapseNavigation}>Hide Sidebar</button>
          )}
        </div>
      )
  )
}))
vi.mock('../../components/panel/menu', () => ({ Menu: () => null }))
vi.mock('../../components/panel/footer', () => ({ Footer: () => null }))
vi.mock('../../components/panel/footer/ai', () => ({ aiPanel: {} }))
vi.mock('../../components/panel/header/bookmarks', () => ({
  bookmarksPanel: {}
}))
vi.mock('../../components/panel/header/disc', () => ({ discPanel: {} }))
vi.mock('../../components/panel/footer/control-center', () => ({
  ControlCenterDrawer: () => null
}))
vi.mock('../../components/panel/footer/notification-center', () => ({
  NotificationDrawer: () => null
}))
vi.mock('../../components/panel/footer/preferences/modal', () => ({
  UserInfoModal: () => null
}))
vi.mock('@vezham/react-v3', () => ({
  Surface: ({
    children,
    role,
    className,
    'aria-label': label,
    'data-vx': vx
  }: ComponentProps<'div'> & { 'data-vx'?: string; children?: ReactNode }) => (
    <div role={role} aria-label={label} className={className} data-vx={vx}>
      {children}
    </div>
  )
}))

describe('Home desktop navigation', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    state.pathname = '/'
    state.isNavigationCollapsed = false
  })

  it('closes auxiliary panels and restores the rail from the Home bubble', () => {
    render(<MenuMD items={items} />)
    fireEvent.click(screen.getByRole('button', { name: 'Hide Sidebar' }))

    expect(state.closeInfoPanel).toHaveBeenCalledOnce()
    expect(state.closeCommand).toHaveBeenCalledOnce()
    expect(screen.queryByText('Application menu')).toBeNull()

    fireEvent.click(screen.getByRole('button', { name: 'Show Sidebar' }))
    expect(screen.getByText('Application menu')).toBeTruthy()
    expect(state.expandNavigation).not.toHaveBeenCalled()
  })

  it('opens search from the bubble without expanding the rail', () => {
    render(<MenuMD items={items} />)
    fireEvent.click(screen.getByRole('button', { name: 'Hide Sidebar' }))
    fireEvent.click(
      screen.getByRole('button', { name: 'Open command palette' })
    )

    expect(state.openCommand).toHaveBeenCalledOnce()
    expect(screen.getByRole('button', { name: 'Show Sidebar' })).toBeTruthy()
  })

  it('keeps Home collapsed independently when navigating to a module and back', () => {
    const { rerender } = render(<MenuMD items={items} />)
    fireEvent.click(screen.getByRole('button', { name: 'Hide Sidebar' }))

    state.pathname = '/academic'
    rerender(<MenuMD items={items} />)
    expect(screen.getByText('Application menu')).toBeTruthy()
    expect(screen.queryByRole('button', { name: 'Hide Sidebar' })).toBeNull()

    state.pathname = '/'
    rerender(<MenuMD items={items} />)
    expect(screen.getByRole('button', { name: 'Show Sidebar' })).toBeTruthy()
  })

  it('preserves the module bubble and its existing expand action', () => {
    state.isNavigationCollapsed = true
    const { rerender } = render(<MenuMD items={items} />)
    expect(screen.getByText('Application menu')).toBeTruthy()

    state.pathname = '/reports/grade'
    rerender(<MenuMD items={items} />)
    fireEvent.click(screen.getByRole('button', { name: 'Show Sidebar' }))
    expect(state.expandNavigation).toHaveBeenCalledOnce()
    expect(screen.queryByRole('group', { name: 'Home navigation' })).toBeNull()
  })

  it('reuses the compact application header with the same app avatar', () => {
    render(<MenuMD items={items} />)
    const expandedUsers = vi.mocked(Header).mock.calls[0][0].users
    fireEvent.click(screen.getByRole('button', { name: 'Hide Sidebar' }))

    expect(screen.getByRole('group', { name: 'Home navigation' })).toBeTruthy()
    expect(vi.mocked(Header).mock.lastCall?.[0]).toEqual(
      expect.objectContaining({ compact: true, users: expandedUsers })
    )
  })

  it('keeps the Home gutter on collapse but still releases it on module pages', () => {
    const { container, rerender } = render(<MenuMD items={items} />)
    const rail = container.querySelector('[data-vx="menu-layout"]')
    expect(rail).toHaveClass('w-[106px]')

    fireEvent.click(screen.getByRole('button', { name: 'Hide Sidebar' }))
    expect(rail).toHaveClass('w-[106px]', 'p-0', 'border-0')
    expect(rail).not.toHaveClass('w-0')
    expect(rail).toBeEmptyDOMElement()

    fireEvent.click(screen.getByRole('button', { name: 'Show Sidebar' }))
    expect(rail).toHaveClass('w-[106px]')

    state.pathname = '/academic'
    state.isNavigationCollapsed = true
    rerender(<MenuMD items={items} />)
    expect(rail).toHaveClass('w-0')
    expect(rail).not.toHaveClass('w-[106px]')
  })
})
