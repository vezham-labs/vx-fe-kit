import {
  fireEvent,
  render,
  screen,
  waitFor,
  within
} from '@testing-library/react'
import { useRef, useState } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { SectionToolbar } from './toolbar'

const actions = vi.hoisted(() => ({
  import: vi.fn(),
  refresh: vi.fn(),
  create: vi.fn()
}))

const ToolbarFixture = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [search, setSearch] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <SectionToolbar
      title="Classes"
      tabs={[]}
      navigationControls={null}
      search={{
        value: search,
        onChange: setSearch,
        inputRef,
        isOpen: isSearchOpen,
        onOpenChange: setIsSearchOpen
      }}
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      menuActions={[
        {
          key: 'import',
          label: 'Import',
          icon: 'vx:upload',
          onAction: actions.import
        }
      ]}
      primaryAction={{
        key: 'create',
        label: 'Add Class',
        icon: 'vx:plus',
        onAction: actions.create
      }}
      onRefresh={actions.refresh}
    />
  )
}

describe('Section toolbar', () => {
  it('opens More and invokes its action', async () => {
    render(<ToolbarFixture />)
    fireEvent.click(screen.getByRole('button', { name: 'More' }))
    const menu = await screen.findByRole('menu', { name: 'More' })
    fireEvent.click(within(menu).getByRole('menuitem', { name: 'Import' }))
    expect(actions.import).toHaveBeenCalledOnce()
  })

  it('edits mobile search and dismisses it with Escape', async () => {
    render(<ToolbarFixture />)
    fireEvent.click(screen.getByRole('button', { name: 'Search' }))
    const dialog = await screen.findByRole('dialog', { name: 'Search content' })
    const input = within(dialog).getByRole('searchbox')
    fireEvent.change(input, { target: { value: 'science' } })
    expect(input).toHaveValue('science')
    fireEvent.keyDown(input, { key: 'Escape', code: 'Escape' })
    await waitFor(() =>
      expect(
        screen.queryByRole('dialog', { name: 'Search content' })
      ).toBeNull()
    )
  })
})
