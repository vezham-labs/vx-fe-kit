import type {
  ComponentProps,
  ComponentType,
  ReactElement,
  ReactNode
} from 'react'

import type { Popover } from '@vezham/react-v3'

export type TileDefinition<Context extends object = object> = {
  id: string
  span: 'compact' | 'standard' | 'wide' | 'full'
  label?: string
  editable?: boolean
} & (
  | {
      Tile: ComponentType<Context & { onOpen: () => void }>
      title: string
      Panel: ComponentType<Context>
      onAction?: never
    }
  | {
      Tile: ComponentType<Context>
      title?: never
      Panel?: never
      onAction?: never
    }
  | {
      label: string
      description?: string
      icon?: ReactNode
      onAction: (context: Context) => void
      Tile?: never
      title?: never
      Panel?: never
    }
)

export type ControlCenterProps<Context extends object> = {
  context: Context
  tiles: readonly TileDefinition<Context>[]
  trigger?: ReactElement
  placement?: ComponentProps<typeof Popover.Content>['placement']
  onOpenChange?: (open: boolean) => void
  appearance?: AppearanceAdapter
  preview?: boolean
}

export type ThemeMode = 'light' | 'dark' | 'auto'

export type AppearanceAdapter = {
  isDark: boolean
  setDark: (dark: boolean) => void
  themeMode?: ThemeMode
  setThemeMode?: (mode: ThemeMode) => void
}

export type Option = {
  value: string
  label: string
  href?: string
}

export type LanguageAdapter = {
  value: string
  options: readonly Option[]
  onChange: (value: string) => void
}

export type BuiltinTileType =
  | 'theme-toggle'
  | 'appearance-toggle'
  | 'appearance'
  | 'theme'
  | 'direction'
  | 'language'
  | 'edit-controls'
  | 'preview-wifi'
  | 'preview-bluetooth'
  | 'preview-airdrop'
  | 'preview-focus'
  | 'preview-stage-manager'
  | 'preview-mirroring'
  | 'preview-media'
  | 'preview-display'
  | 'preview-sound'

export type TileConfig = {
  id: string
  span: TileDefinition['span']
  label?: string
  title?: string
  description?: string
  editable?: boolean
} & (
  { type: BuiltinTileType; action?: never } | { type: 'custom'; action: string }
)

export type ControlCenterConfig = { tiles: readonly TileConfig[] }
export type ControlCenterContext = {
  language?: LanguageAdapter
  languageOptions?: readonly Option[]
}
export type TileRegistration<Context extends object> = {
  Tile: ComponentType<Context & { onOpen: () => void; onAction: () => void }>
  Panel?: ComponentType<Context>
  title?: string
}
