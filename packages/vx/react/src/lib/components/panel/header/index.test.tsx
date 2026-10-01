import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { Header } from './index'

const actions = vi.hoisted(() => ({ openCommand: vi.fn(), expand: vi.fn() }))

vi.mock('../../command', () => ({ useCommand: () => actions }))
vi.mock('./bookmarks', () => ({
  BookmarksTrigger: () => null
}))
vi.mock('./disc', () => ({
  DiscTrigger: () => null
}))

describe('Shared compact navigation header', () => {
  beforeEach(() => vi.clearAllMocks())

  it('matches the small ghost action buttons without extra spacing', () => {
    const { container } = render(
      <Header compact users={{ id: '1', name: 'School' }} />
    )

    for (const name of ['Show Sidebar', 'Open command palette']) {
      const button = screen.getByRole('button', { name })
      expect(button).toHaveClass(
        'button--icon-only',
        'button--sm',
        'button--ghost',
        'text-muted',
        'hover:text-foreground'
      )
      expect(button).not.toHaveClass('h-11', 'w-11', 'rounded-full')
      expect(button.querySelector('svg')).toHaveAttribute('width', '16')
      expect(button.querySelector('svg')).toHaveClass('size-4')
    }

    const header = container.querySelector('[data-vx="header"]')
    expect(header).toHaveClass('flex', 'items-center')
    expect(header).not.toHaveClass('justify-between')
    expect(
      screen.getByRole('group', { name: 'Application controls' })
    ).toHaveClass('h-12')
    expect(
      screen.getByRole('button', { name: 'Open application menu' })
    ).toBeTruthy()
  })

  it('preserves expand and search actions', () => {
    render(
      <Header
        compact
        users={{ id: '1', name: 'School' }}
        onOpenNavigation={actions.expand}
      />
    )
    fireEvent.click(screen.getByRole('button', { name: 'Show Sidebar' }))
    fireEvent.click(
      screen.getByRole('button', { name: 'Open command palette' })
    )

    expect(actions.expand).toHaveBeenCalledOnce()
    expect(actions.openCommand).toHaveBeenCalledOnce()
  })
})
