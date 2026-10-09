import { describe, expect, it, vi } from 'vitest'

import type { NavigationToolbar } from '@vx/react'

import { getToolbarActions } from './actions'

describe('getToolbarActions', () => {
  it('removes only view actions explicitly disabled in navigation metadata', () => {
    const toolbar: NavigationToolbar = {
      view: [
        {
          key: 'filter',
          label: 'Filter',
          icon: 'vx:sort-descending',
          enabled: false
        },
        { key: 'grid', label: 'Grid view', icon: 'vx:grid' },
        { key: 'list', label: 'List view', icon: 'vx:list' }
      ]
    }

    expect(
      getToolbarActions(
        toolbar,
        { pageKey: 'classes', pathname: '/classes' },
        vi.fn()
      ).view
    ).toEqual([
      { key: 'grid', label: 'Grid view', icon: 'vx:grid' },
      { key: 'list', label: 'List view', icon: 'vx:list' }
    ])
  })
})
