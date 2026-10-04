import type { ComponentType } from 'react'

import { AppearanceLitePanel } from '@components/docs/control-center/appearance-lite-panel'
import { AppearancePanel } from '@components/docs/control-center/appearance-panel'
import {
  LanguagePanel,
  LanguageSettings
} from '@components/docs/control-center/language-panel'
import type { Locale } from '@generated/vx'

export type ControlCenterPanelContext = {
  locale: Locale
  page: string
  platform: 'web' | 'native'
}

type TileDefinition = {
  id: string
  span: 'compact' | 'standard' | 'wide' | 'full'
} & (
  | {
      // vx-bot/NOTE: The home tile calls onOpen; the detail panel mounts only afterward.
      Tile: ComponentType<ControlCenterPanelContext & { onOpen: () => void }>
      // vx-bot/NOTE: The outlet uses these together for its shared detail header and body.
      title: string
      Panel: ComponentType<ControlCenterPanelContext>
    }
  | {
      Tile: ComponentType<ControlCenterPanelContext>
      title?: never
      Panel?: never
    }
)

export const controlCenterTiles = [
  { id: 'appearance-lite', Tile: AppearanceLitePanel, span: 'compact' },
  {
    id: 'language',
    Tile: LanguagePanel,
    span: 'wide',
    title: 'Language',
    Panel: LanguageSettings
  },
  { id: 'appearance', Tile: AppearancePanel, span: 'wide' },
  { id: 'appearance-lite1', Tile: AppearanceLitePanel, span: 'compact' },
  { id: 'appearance-23', Tile: AppearancePanel, span: 'standard' },
  { id: 'appearance-12', Tile: AppearancePanel, span: 'full' },
  { id: 'appearance-lite2', Tile: AppearanceLitePanel, span: 'compact' },
  { id: 'appearance-lite3', Tile: AppearanceLitePanel, span: 'compact' },
  { id: 'appearance-lite4', Tile: AppearanceLitePanel, span: 'compact' },
  { id: 'appearance-lite5', Tile: AppearanceLitePanel, span: 'compact' }
] as const satisfies readonly TileDefinition[]

type RegisteredTile = (typeof controlCenterTiles)[number]
export type ControlCenterPanelId = Extract<
  RegisteredTile,
  { Panel: ComponentType<ControlCenterPanelContext> }
>['id']
