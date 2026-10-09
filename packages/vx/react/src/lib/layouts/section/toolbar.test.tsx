import {
  fireEvent,
  render,
  screen,
  waitFor,
  within
} from '@testing-library/react'
import { useRef, useState } from 'react'
import { describe, expect, it, vi } from 'vitest'

import {
  SectionActiveFilters,
  type SectionFilterKey,
  SectionToolbar
} from './toolbar'

const actions = vi.hoisted(() => ({
  import: vi.fn(),
  sync: vi.fn(),
  create: vi.fn()
}))

const ToolbarFixture = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState<SectionFilterKey[]>([])
  const [search, setSearch] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <>
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
        view={[
          { key: 'filter', label: 'Filter', icon: 'vx:sort-descending' },
          { key: 'grid', label: 'Grid view', icon: 'vx:grid' },
          { key: 'list', label: 'List view', icon: 'vx:list' }
        ]}
        selectedFilters={selectedFilters}
        onSelectedFiltersChange={setSelectedFilters}
        viewMode="grid"
        onViewModeChange={vi.fn()}
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
        onSync={actions.sync}
      />
      <SectionActiveFilters
        selectedFilters={selectedFilters}
        onSelectedFiltersChange={setSelectedFilters}
      />
    </>
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

  it('changes the selected view mode', () => {
    const onViewModeChange = vi.fn()
    render(
      <SectionToolbar
        title="Classes"
        tabs={[]}
        navigationControls={null}
        menuActions={[]}
        onSync={actions.sync}
        view={[
          { key: 'grid', label: 'Grid view', icon: 'vx:grid' },
          { key: 'list', label: 'List view', icon: 'vx:list' }
        ]}
        selectedFilters={[]}
        onSelectedFiltersChange={vi.fn()}
        viewMode="grid"
        onViewModeChange={onViewModeChange}
        isMenuOpen={false}
        onMenuOpenChange={vi.fn()}
      />
    )

    expect(screen.getByRole('button', { name: 'Grid view' })).toHaveAttribute(
      'aria-pressed',
      'true'
    )
    fireEvent.click(screen.getByRole('button', { name: 'List view' }))
    expect(onViewModeChange).toHaveBeenCalledWith('list')
  })

  it('keeps the filter menu open while selecting and clearing multiple options', async () => {
    render(<ToolbarFixture />)

    fireEvent.click(screen.getByRole('button', { name: 'Filter' }))
    fireEvent.click(await screen.findByRole('menuitem', { name: 'Images' }))
    expect(screen.getByRole('menuitem', { name: 'Documents' })).toBeVisible()
    fireEvent.click(screen.getByRole('menuitem', { name: 'Documents' }))
    expect(screen.getByRole('menuitem', { name: 'Images' })).toBeVisible()
    fireEvent.keyDown(screen.getByRole('menuitem', { name: 'Images' }), {
      key: 'Escape',
      code: 'Escape'
    })
    await waitFor(() =>
      expect(screen.queryByRole('menuitem', { name: 'Images' })).toBeNull()
    )
    expect(screen.getByRole('button', { name: 'Filter' })).toHaveAttribute(
      'aria-pressed',
      'true'
    )
    fireEvent.click(
      screen.getByRole('button', { name: 'Remove Images filter' })
    )
    expect(
      screen.getByRole('button', { name: 'Remove Documents filter' })
    ).toBeVisible()
    expect(screen.getByRole('button', { name: 'Filter' })).toHaveAttribute(
      'aria-pressed',
      'true'
    )
    fireEvent.click(
      screen.getByRole('button', { name: 'Remove Documents filter' })
    )
    expect(screen.getByRole('button', { name: 'Filter' })).toHaveAttribute(
      'aria-pressed',
      'false'
    )
  })

  it('omits only a disabled view action', () => {
    render(
      <SectionToolbar
        title="Classes"
        tabs={[]}
        navigationControls={null}
        menuActions={[]}
        onSync={actions.sync}
        view={[
          { key: 'grid', label: 'Grid view', icon: 'vx:grid' },
          { key: 'list', label: 'List view', icon: 'vx:list' }
        ]}
        selectedFilters={[]}
        onSelectedFiltersChange={vi.fn()}
        viewMode="grid"
        onViewModeChange={vi.fn()}
        isMenuOpen={false}
        onMenuOpenChange={vi.fn()}
      />
    )

    expect(screen.queryByRole('button', { name: 'Filter' })).toBeNull()
    expect(screen.getByRole('button', { name: 'Grid view' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'List view' })).toBeVisible()
  })
})
