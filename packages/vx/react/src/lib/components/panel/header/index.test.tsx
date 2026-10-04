import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { useState } from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { AppMenuProvider } from '../../app-menu'
import { Header } from './index'

const actions = vi.hoisted(() => ({
  openCommand: vi.fn(),
  expand: vi.fn(),
  toggleInfoPanel: vi.fn()
}))

vi.mock('../../command', () => ({ useCommand: () => actions }))
vi.mock('../info-panel', () => ({
  useInfoPanel: () => ({ toggleInfoPanel: actions.toggleInfoPanel })
}))

describe('Shared compact navigation header', () => {
  beforeEach(() => vi.clearAllMocks())

  it('matches the small ghost action buttons without extra spacing', () => {
    const { container } = render(
      <Header
        compact
        isDockHidden
        users={{ id: '1', name: 'School' }}
        onToggleDock={actions.expand}
      />
    )

    for (const name of ['Show Dock']) {
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
    ).toHaveClass('h-8')
    expect(
      screen.getByRole('button', { name: 'Open application menu' })
    ).toBeTruthy()
  })

  it('preserves expand and search actions', async () => {
    render(
      <Header
        compact
        isDockHidden
        users={{ id: '1', name: 'School' }}
        onToggleDock={actions.expand}
      />
    )
    fireEvent.click(screen.getByRole('button', { name: 'Show Dock' }))
    fireEvent.click(
      screen.getByRole('button', { name: 'Open application menu' })
    )
    fireEvent.click(
      await screen.findByRole('menuitem', { name: 'Open command palette' })
    )

    expect(actions.expand).toHaveBeenCalledOnce()
    expect(actions.openCommand).toHaveBeenCalledOnce()
  })

  it('omits duplicate dock and search actions from module menus', async () => {
    render(
      <Header
        users={{ id: '1', name: 'School' }}
        showMenuUtilities={false}
        onToggleDock={actions.expand}
      />
    )

    fireEvent.click(
      screen.getByRole('button', { name: 'Open application menu' })
    )
    await screen.findByRole('menu', { name: 'Application menu' })

    expect(screen.queryByRole('menuitem', { name: /Hide Dock/ })).toBeNull()
    expect(
      screen.queryByRole('menuitem', { name: 'Open command palette' })
    ).toBeNull()
  })

  it('moves Bookmarks and Disc into the application menu with their panel actions', async () => {
    render(
      <Header
        compact
        users={{ id: '1', name: 'School' }}
        showBookamarks
        showDisk
      />
    )

    fireEvent.click(
      screen.getByRole('button', { name: 'Open application menu' })
    )
    fireEvent.click(await screen.findByRole('menuitem', { name: 'Bookmarks' }))
    expect(actions.toggleInfoPanel).toHaveBeenCalledWith('bookmarks')
    await waitFor(() => expect(screen.queryByRole('menu')).toBeNull())

    fireEvent.click(
      screen.getByRole('button', { name: 'Open application menu' })
    )
    fireEvent.click(await screen.findByRole('menuitem', { name: 'Disc' }))
    expect(actions.toggleInfoPanel).toHaveBeenCalledWith('disc')
  })

  it.each([true, false])(
    'uses an accessible application menu (compact=%s)',
    async compact => {
      const collapse = vi.fn()
      render(
        <Header
          compact={compact}
          users={{ id: '1', name: 'School' }}
          onToggleDock={collapse}
        />
      )
      fireEvent.click(
        screen.getByRole('button', { name: 'Open application menu' })
      )
      expect(
        await screen.findByRole('menu', { name: /application menu/i })
      ).toBeTruthy()
      fireEvent.click(screen.getByRole('menuitem', { name: /Hide Dock/ }))
      expect(collapse).toHaveBeenCalledOnce()
      await waitFor(() => expect(screen.queryByRole('menu')).toBeNull())

      fireEvent.click(
        screen.getByRole('button', { name: 'Open application menu' })
      )
      fireEvent.click(
        await screen.findByRole('menuitem', { name: 'Open command palette' })
      )
      expect(actions.openCommand).toHaveBeenCalledOnce()
      await waitFor(() => expect(screen.queryByRole('menu')).toBeNull())
    }
  )

  it('uses the same callback for both dock menu states', async () => {
    const Dock = () => {
      const [hidden, setHidden] = useState(false)
      return (
        <Header
          users={{ id: '1', name: 'School' }}
          isDockHidden={hidden}
          onToggleDock={() => setHidden(value => !value)}
        />
      )
    }
    render(<Dock />)
    fireEvent.click(
      screen.getByRole('button', { name: 'Open application menu' })
    )
    fireEvent.click(await screen.findByRole('menuitem', { name: /Hide Dock/ }))
    await waitFor(() => expect(screen.queryByRole('menu')).toBeNull())
    fireEvent.click(
      screen.getByRole('button', { name: 'Open application menu' })
    )
    fireEvent.click(await screen.findByRole('menuitem', { name: /Show Dock/ }))
    await waitFor(() => expect(screen.queryByRole('menu')).toBeNull())
    fireEvent.click(
      screen.getByRole('button', { name: 'Open application menu' })
    )
    expect(
      await screen.findByRole('menuitem', { name: /Hide Dock/ })
    ).toBeTruthy()
  })

  it('opens the File submenu with the keyboard and dispatches configured actions', async () => {
    const notice = vi.fn()
    render(
      <AppMenuProvider
        items={[
          {
            key: 'file',
            label: 'File',
            groups: [[{ key: 'file.new', label: 'New…', shortcut: 'Mod N' }]]
          }
        ]}
        onAction={notice}>
        <Header compact isDockHidden users={{ id: '1', name: 'School' }} />
      </AppMenuProvider>
    )
    fireEvent.click(
      screen.getByRole('button', { name: 'Open application menu' })
    )
    const file = await screen.findByRole('menuitem', { name: 'File' })
    file.focus()
    fireEvent.keyDown(file, { key: 'ArrowRight', code: 'ArrowRight' })
    const newItem = await screen.findByRole('menuitem', { name: /New…/ })
    expect(newItem).not.toHaveAttribute('aria-disabled', 'true')
    fireEvent.click(newItem)
    expect(notice).toHaveBeenCalledWith({
      key: 'file.new',
      label: 'New…',
      shortcut: 'Mod N'
    })
    await waitFor(() => expect(screen.queryByRole('menu')).toBeNull())
  })
})
