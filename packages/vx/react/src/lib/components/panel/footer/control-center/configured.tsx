import { useCallback, useContext, useMemo } from 'react'

import {
  type ToolbarActionEvent,
  ToolbarActionsContext
} from '../../../toolbar-actions'
import {
  AppearanceSettings,
  AppearanceTile,
  AppearanceToggle,
  ThemeToggle
} from './appearance'
import { DirectionSettings, DirectionTile } from './direction'
import { EditControlsSettings, EditControlsTile } from './editor'
import { ControlCenter } from './index'
import {
  DocumentLanguageSettings,
  DocumentLanguageTile,
  LanguageSettings,
  LanguageTile
} from './language'
import {
  PreviewAirDropSettings,
  PreviewAirDropTile,
  PreviewBluetoothSettings,
  PreviewBluetoothTile,
  PreviewDisplayTile,
  PreviewFocusTile,
  PreviewMediaTile,
  PreviewMirroringSettings,
  PreviewMirroringTile,
  PreviewSoundTile,
  PreviewStageManagerTile,
  PreviewWiFiSettings,
  PreviewWiFiTile
} from './preview'
import { ThemeSettings, ThemeTile } from './theme'
import type {
  BuiltinTileType,
  ControlCenterConfig,
  ControlCenterContext,
  ControlCenterProps,
  TileDefinition,
  TileRegistration
} from './types'

const ConfiguredLanguageTile = ({
  onOpen,
  language,
  languageOptions = [{ value: 'en', label: 'English' }]
}: ControlCenterContext & { onOpen: () => void }) =>
  language ? (
    <LanguageTile language={language} onOpen={onOpen} />
  ) : (
    <DocumentLanguageTile languageOptions={languageOptions} onOpen={onOpen} />
  )
const ConfiguredLanguageSettings = ({
  language,
  languageOptions = [{ value: 'en', label: 'English' }]
}: ControlCenterContext) =>
  language ? (
    <LanguageSettings language={language} />
  ) : (
    <DocumentLanguageSettings languageOptions={languageOptions} />
  )

const builtins: Record<BuiltinTileType, TileRegistration<object>> = {
  'theme-toggle': { Tile: ThemeToggle },
  'appearance-toggle': { Tile: AppearanceToggle },
  appearance: {
    Tile: AppearanceTile,
    Panel: AppearanceSettings,
    title: 'Appearance'
  },
  theme: { Tile: ThemeTile, Panel: ThemeSettings, title: 'Theme' },
  direction: {
    Tile: DirectionTile,
    Panel: DirectionSettings,
    title: 'Direction'
  },
  language: {
    Tile: ConfiguredLanguageTile,
    Panel: ConfiguredLanguageSettings,
    title: 'Language'
  },
  'edit-controls': {
    Tile: EditControlsTile,
    Panel: EditControlsSettings,
    title: 'Edit Controls'
  },
  'preview-wifi': {
    Tile: PreviewWiFiTile,
    Panel: PreviewWiFiSettings,
    title: 'Wi-Fi'
  },
  'preview-bluetooth': {
    Tile: PreviewBluetoothTile,
    Panel: PreviewBluetoothSettings,
    title: 'Bluetooth'
  },
  'preview-airdrop': {
    Tile: PreviewAirDropTile,
    Panel: PreviewAirDropSettings,
    title: 'AirDrop'
  },
  'preview-focus': { Tile: PreviewFocusTile },
  'preview-stage-manager': { Tile: PreviewStageManagerTile },
  'preview-mirroring': {
    Tile: PreviewMirroringTile,
    Panel: PreviewMirroringSettings,
    title: 'Screen Mirroring'
  },
  'preview-media': { Tile: PreviewMediaTile },
  'preview-display': { Tile: PreviewDisplayTile },
  'preview-sound': { Tile: PreviewSoundTile }
}

export type ControlCenterActionEvent = ToolbarActionEvent & { tileId: string }
export type ConfiguredControlCenterProps<Context extends object> = Omit<
  ControlCenterProps<Context & ControlCenterContext>,
  'tiles'
> & {
  config: ControlCenterConfig
  registrations?: Readonly<
    Record<string, TileRegistration<Context & ControlCenterContext>>
  >
  onAction?: (event: ControlCenterActionEvent) => void
}

export const resolveTiles = <Context extends object>(
  config: ControlCenterConfig,
  onAction: (tileId: string, actionKey: string) => void,
  registrations: Readonly<Record<string, TileRegistration<Context>>> = {}
): readonly TileDefinition<Context>[] =>
  config.tiles.map(tile => {
    const { id, span, label, description, editable } = tile
    const base = {
      id,
      span,
      label,
      editable: editable ?? tile.type !== 'edit-controls'
    }
    const registration =
      tile.type === 'custom' ? registrations[id] : builtins[tile.type]
    const emit = () => {
      if (tile.type === 'custom') onAction(id, tile.action)
    }
    if (!registration) {
      if (tile.type !== 'custom')
        throw new Error(`Unknown control center tile type: ${tile.type}`)
      return { ...base, label: label ?? id, description, onAction: emit }
    }
    const { Tile, Panel } = registration
    if (Panel) {
      return {
        ...base,
        title: tile.title ?? registration.title ?? label ?? id,
        Panel: (props: Context) => <Panel {...props} />,
        Tile: (props: Context & { onOpen: () => void }) => (
          <Tile {...props} onAction={emit} />
        )
      }
    }
    return {
      ...base,
      Tile: (props: Context) => (
        <Tile {...props} onOpen={emit} onAction={emit} />
      )
    }
  })

export const ConfiguredControlCenter = <Context extends object>({
  config,
  registrations,
  onAction,
  ...props
}: ConfiguredControlCenterProps<Context>) => {
  const actions = useContext(ToolbarActionsContext)
  const emit = useCallback(
    (tileId: string, actionKey: string) => {
      const event = {
        tileId,
        actionKey,
        pageKey: 'control-center',
        pathname: window.location.pathname
      }
      if (onAction) onAction(event)
      else if (!actions?.emit(event))
        throw new Error(`Unhandled control center action: ${actionKey}`)
    },
    [actions, onAction]
  )
  const tiles = useMemo(
    () =>
      resolveTiles<Context & ControlCenterContext>(config, emit, registrations),
    [config, emit, registrations]
  )
  return <ControlCenter {...props} tiles={tiles} />
}
