import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import {
  ToolbarActionsProvider,
  useToolbarAction
} from '../../../toolbar-actions'
import { ConfiguredControlCenter, resolveTiles } from './configured'
import type { ControlCenterConfig } from './types'

const config: ControlCenterConfig = {
  tiles: [
    { id: 'direction', type: 'direction', span: 'wide' },
    {
      id: 'workspace',
      type: 'custom',
      action: 'workspace.open',
      label: 'Open workspace',
      span: 'full'
    }
  ]
}

describe('configured control center', () => {
  it('adds one locked Edit Controls action after the configured tiles', () => {
    const tiles = resolveTiles(config, vi.fn())
    expect(tiles.map(tile => tile.id)).toEqual([
      'direction',
      'workspace',
      'edit-controls'
    ])
    expect(tiles.at(-1)).toMatchObject({
      title: 'Edit Controls',
      editable: false,
      span: 'full'
    })
  })

  it('supplies built-in display names without YAML labels or titles', () => {
    const tiles = resolveTiles(
      {
        tiles: [
          { id: 'wifi', type: 'preview-wifi', span: 'wide' },
          { id: 'focus', type: 'preview-focus', span: 'full' },
          { id: 'sound', type: 'preview-sound', span: 'full' },
          { id: 'toggle', type: 'theme-toggle', span: 'compact' }
        ]
      },
      vi.fn()
    )
    expect(tiles.slice(0, 4).map(tile => tile.label)).toEqual([
      'Wi-Fi',
      'Do Not Disturb',
      'Sound',
      'Appearance'
    ])
    expect(tiles[0]).toMatchObject({ title: 'Wi-Fi' })
  })

  it('uses one label override for the tile and detail panel', async () => {
    render(
      <ConfiguredControlCenter
        config={{
          tiles: [
            {
              id: 'direction',
              type: 'direction',
              span: 'wide',
              label: 'Reading direction'
            }
          ]
        }}
        context={{}}
      />
    )
    fireEvent.click(screen.getByRole('button', { name: 'Control center' }))
    fireEvent.click(
      await screen.findByRole('button', { name: 'Reading direction' })
    )
    expect(await screen.findByText('Reading direction')).toBeInTheDocument()
  })

  it('handles built-in settings in React and emits custom actions through the toolbar dispatcher', async () => {
    const handler = vi.fn()
    const App = () => {
      useToolbarAction('workspace.open', handler, { pageKey: 'control-center' })
      return <ConfiguredControlCenter config={config} context={{}} />
    }
    render(
      <ToolbarActionsProvider>
        <App />
      </ToolbarActionsProvider>
    )
    fireEvent.click(screen.getByRole('button', { name: 'Control center' }))
    fireEvent.click(await screen.findByRole('button', { name: 'Direction' }))
    fireEvent.click(await screen.findByRole('button', { name: 'RTL' }))
    expect(document.documentElement.dir).toBe('rtl')
    expect(handler).not.toHaveBeenCalled()
    fireEvent.click(
      screen.getByRole('button', { name: 'Back to Control Center' })
    )
    fireEvent.click(
      await screen.findByRole('button', { name: 'Open workspace' })
    )
    expect(handler).toHaveBeenCalledOnce()
    expect(handler).toHaveBeenCalledWith({
      tileId: 'workspace',
      actionKey: 'workspace.open',
      pageKey: 'control-center',
      pathname: '/'
    })
    document.documentElement.removeAttribute('dir')
  })

  it('uses generated i18n configuration for language labels, default, and selection', async () => {
    const originalLanguage = document.documentElement.getAttribute('lang')
    document.documentElement.removeAttribute('lang')
    try {
      render(
        <ConfiguredControlCenter
          config={{
            tiles: [{ id: 'language', type: 'language', span: 'wide' }]
          }}
          context={{ i18n: { defaultLanguage: 'fr', languages: ['fr', 'de'] } }}
        />
      )
      fireEvent.click(screen.getByRole('button', { name: 'Control center' }))
      fireEvent.click(await screen.findByRole('button', { name: 'Language' }))
      expect(screen.getByRole('button', { name: 'français' })).toHaveAttribute(
        'aria-pressed',
        'true'
      )
      expect(
        screen.queryByRole('button', { name: 'English' })
      ).not.toBeInTheDocument()
      fireEvent.click(screen.getByRole('button', { name: 'allemand' }))
      expect(document.documentElement.lang).toBe('de')
    } finally {
      if (originalLanguage === null)
        document.documentElement.removeAttribute('lang')
      else document.documentElement.lang = originalLanguage
    }
  })

  it('connects a registered custom tile click to the configured action', async () => {
    const onAction = vi.fn()
    render(
      <ConfiguredControlCenter
        config={config}
        context={{ workspace: 'Main' }}
        onAction={onAction}
        registrations={{
          workspace: {
            Tile: ({ onAction: press }) => (
              <button onClick={press}>Custom workspace</button>
            )
          }
        }}
      />
    )
    fireEvent.click(screen.getByRole('button', { name: 'Control center' }))
    fireEvent.click(
      await screen.findByRole('button', { name: 'Custom workspace' })
    )
    expect(onAction).toHaveBeenCalledWith(
      expect.objectContaining({
        tileId: 'workspace',
        actionKey: 'workspace.open'
      })
    )
  })
})
