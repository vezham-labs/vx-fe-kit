import { fireEvent, render, screen } from '@testing-library/react'
import { type ComponentProps, type ReactNode } from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import Header from '../src/components/panel/header'
import { type HeaderActionsProps } from '../src/components/panel/header/types'
import MenuMD from '../src/layouts/menu-layout/index-md'

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
vi.mock('../src/components/workspace-navigation', () => ({
  useWorkspaceNavigation: () => state
}))
vi.mock('../src/components/command', () => ({
  useCommand: () => state
}))
vi.mock('../src/components/panel/info-panel', () => ({
  useInfoPanel: () => state,
  InfoPanelContainer: () => null
}))
vi.mock('../src/store/users/useUserStore', () => ({
  useUser: () => ({ user: null })
}))
vi.mock('../src/components/panel/header', () => ({
  default: vi.fn(
    ({
      compact,
      onOpenNavigation,
      onCollapseNavigation
    }: HeaderActionsProps) =>
      compact ? (
        <div>
          <button onClick={onOpenNavigation}>
            Expand workspace navigation
          </button>
          <button onClick={state.openCommand}>Open command palette</button>
        </div>
      ) : (
        <div>
          Application menu
          {onCollapseNavigation && (
            <button onClick={onCollapseNavigation}>
              Collapse Home navigation
            </button>
          )}
        </div>
      )
  )
}))
vi.mock('../src/components/panel/menu', () => ({ Menu: () => null }))
vi.mock('../src/components/panel/menu/sidebar-items', () => ({ items: [] }))
vi.mock('../src/components/panel/footer', () => ({ default: () => null }))
vi.mock('../src/components/panel/footer/ai', () => ({ aiPanel: {} }))
vi.mock('../src/components/panel/header/bookmarks', () => ({
  bookmarksPanel: {}
}))
vi.mock('../src/components/panel/header/disc', () => ({ discPanel: {} }))
vi.mock('../src/components/panel/footer/control-center', () => ({
  ControlCenterDrawer: () => null
}))
vi.mock('../src/components/panel/footer/notification-center', () => ({
  NotificationDrawer: () => null
}))
vi.mock('../src/components/panel/footer/preferences/modal', () => ({
  default: () => null
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
    render(<MenuMD />)
    fireEvent.click(
      screen.getByRole('button', { name: 'Collapse Home navigation' })
    )

    expect(state.closeInfoPanel).toHaveBeenCalledOnce()
    expect(state.closeCommand).toHaveBeenCalledOnce()
    expect(screen.queryByText('Application menu')).toBeNull()

    fireEvent.click(
      screen.getByRole('button', { name: 'Expand workspace navigation' })
    )
    expect(screen.getByText('Application menu')).toBeTruthy()
    expect(state.expandNavigation).not.toHaveBeenCalled()
  })

  it('opens search from the bubble without expanding the rail', () => {
    render(<MenuMD />)
    fireEvent.click(
      screen.getByRole('button', { name: 'Collapse Home navigation' })
    )
    fireEvent.click(
      screen.getByRole('button', { name: 'Open command palette' })
    )

    expect(state.openCommand).toHaveBeenCalledOnce()
    expect(
      screen.getByRole('button', { name: 'Expand workspace navigation' })
    ).toBeTruthy()
  })

  it('keeps Home collapsed independently when navigating to a module and back', () => {
    const { rerender } = render(<MenuMD />)
    fireEvent.click(
      screen.getByRole('button', { name: 'Collapse Home navigation' })
    )

    state.pathname = '/academic'
    rerender(<MenuMD />)
    expect(screen.getByText('Application menu')).toBeTruthy()
    expect(
      screen.queryByRole('button', { name: 'Collapse Home navigation' })
    ).toBeNull()

    state.pathname = '/'
    rerender(<MenuMD />)
    expect(
      screen.getByRole('button', { name: 'Expand workspace navigation' })
    ).toBeTruthy()
  })

  it('preserves the module bubble and its existing expand action', () => {
    state.isNavigationCollapsed = true
    const { rerender } = render(<MenuMD />)
    expect(screen.getByText('Application menu')).toBeTruthy()

    state.pathname = '/reports/grade'
    rerender(<MenuMD />)
    fireEvent.click(
      screen.getByRole('button', { name: 'Expand workspace navigation' })
    )
    expect(state.expandNavigation).toHaveBeenCalledOnce()
    expect(screen.queryByRole('group', { name: 'Home navigation' })).toBeNull()
  })

  it('reuses the compact application header with the same app avatar', () => {
    render(<MenuMD />)
    const expandedUsers = vi.mocked(Header).mock.calls[0][0].users
    fireEvent.click(
      screen.getByRole('button', { name: 'Collapse Home navigation' })
    )

    expect(screen.getByRole('group', { name: 'Home navigation' })).toBeTruthy()
    expect(vi.mocked(Header).mock.lastCall?.[0]).toEqual(
      expect.objectContaining({ compact: true, users: expandedUsers })
    )
  })

  it('keeps the Home gutter on collapse but still releases it on module pages', () => {
    const { container, rerender } = render(<MenuMD />)
    const rail = container.querySelector('[data-vx="menu-layout"]')
    expect(rail).toHaveClass('w-[106px]')

    fireEvent.click(
      screen.getByRole('button', { name: 'Collapse Home navigation' })
    )
    expect(rail).toHaveClass('w-[106px]', 'p-0', 'border-0')
    expect(rail).not.toHaveClass('w-0')
    expect(rail).toBeEmptyDOMElement()

    fireEvent.click(
      screen.getByRole('button', { name: 'Expand workspace navigation' })
    )
    expect(rail).toHaveClass('w-[106px]')

    state.pathname = '/academic'
    state.isNavigationCollapsed = true
    rerender(<MenuMD />)
    expect(rail).toHaveClass('w-0')
    expect(rail).not.toHaveClass('w-[106px]')
  })
})
