import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import {
  ToolbarActionsProvider,
  useToolbarAction
} from '../../../toolbar-actions'
import { ConfiguredControlCenter } from './configured'
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
