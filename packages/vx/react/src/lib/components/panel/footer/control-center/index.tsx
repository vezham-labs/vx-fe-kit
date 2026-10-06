import { type ComponentType, useContext, useState } from 'react'

import { AltArrowLeft, Settings } from '@vezham/icons-react'
import { Sheet } from '@vezham/react-pro-v3'
import { Button, Popover, ScrollShadow, useMediaQuery } from '@vezham/react-v3'

import { AppearanceProvider } from './appearance'
import { EditorProvider } from './editor'
import { FooterControlCenterContext } from './footer-context'
import { PreviewProvider } from './preview'
import { ActionTile } from './tile'
import type { ControlCenterProps, TileDefinition } from './types'
import { controlCenterVariants } from './variant'

const styles = controlCenterVariants()

const GlassHighlights = () => (
  <>
    <div aria-hidden="true" className={styles.edgeHighlight()} />
    <div aria-hidden="true" className={styles.surfaceHighlight()} />
  </>
)

export const ControlCenter = <Context extends object>({
  context,
  tiles,
  trigger,
  placement = 'bottom end',
  onOpenChange,
  appearance,
  preview = false
}: ControlCenterProps<Context>) => {
  const isCompact = useMediaQuery('(width < 768px)', {
    initializeWithValue: false
  })
  const footer = useContext(FooterControlCenterContext)
  const [localOpen, setLocalOpen] = useState(false)
  const isOpen = footer?.isOpen ?? localOpen
  const setOpen = footer?.onOpenChange ?? setLocalOpen
  const [panel, setPanel] = useState<string | null>(null)
  const [order, setOrder] = useState(() => tiles.map(tile => tile.id))
  const [hidden, setHidden] = useState<readonly string[]>([])
  const orderedTiles = [
    ...order.flatMap(id => tiles.filter(tile => tile.id === id)),
    ...tiles.filter(tile => !order.includes(tile.id))
  ]
  const visibleTiles = orderedTiles.filter(tile => !hidden.includes(tile.id))
  const changeOpen = (nextOpen: boolean) => {
    setOpen(nextOpen)
    if (!nextOpen) setPanel(null)
    onOpenChange?.(nextOpen)
  }
  const button = trigger ?? (
    <Button aria-label="Control center" isIconOnly size="sm" variant="ghost">
      <Settings size={16} className={styles.triggerIcon()} />
    </Button>
  )
  const content = (
    <EditorProvider
      value={{
        items: orderedTiles.map(tile => ({
          id: tile.id,
          label: tile.label ?? tile.title ?? tile.id.replaceAll('-', ' '),
          visible: !hidden.includes(tile.id),
          editable: tile.editable !== false
        })),
        onVisibilityChange: (id, visible) => {
          if (tiles.find(tile => tile.id === id)?.editable === false) return
          setHidden(previous =>
            visible
              ? previous.filter(value => value !== id)
              : [...previous.filter(value => value !== id), id]
          )
        },
        onMove: (id, offset) => {
          const ids = orderedTiles.map(tile => tile.id)
          const index = ids.indexOf(id)
          const target = index + offset
          if (index < 0 || target < 0 || target >= ids.length) return
          const next = [...ids]
          next.splice(index, 1)
          next.splice(target, 0, id)
          setOrder(next)
        },
        onReset: () => {
          setOrder(tiles.map(tile => tile.id))
          setHidden([])
        }
      }}>
      <ScrollShadow
        key={panel ?? 'home'}
        className={styles.viewport({
          presentation: isCompact ? 'sheet' : 'popover'
        })}>
        {preview && (
          <p className={styles.previewNotice()}>
            UI preview · Device controls are simulated.
          </p>
        )}
        <PanelOutlet
          context={context}
          tiles={visibleTiles}
          panel={panel}
          onPanelChange={setPanel}
        />
      </ScrollShadow>
    </EditorProvider>
  )

  const overlay = isCompact ? (
    <Sheet
      isOpen={isOpen}
      onOpenChange={changeOpen}
      placement="bottom"
      isHandleOnly
      shouldAutoFocus>
      {footer?.compact ? null : <Sheet.Trigger>{button}</Sheet.Trigger>}
      <Sheet.Backdrop className={styles.backdrop()} variant="blur">
        <Sheet.Content className={styles.sheetContent()}>
          <Sheet.Dialog className={styles.surface({ presentation: 'sheet' })}>
            <GlassHighlights />
            <Sheet.Handle />
            <Sheet.CloseTrigger aria-label="Close Control Center" />
            <Sheet.Header className={styles.sheetHeader()}>
              <Sheet.Heading className={styles.sheetHeading()}>
                Control Center
              </Sheet.Heading>
            </Sheet.Header>
            <Sheet.Body className={styles.content({ presentation: 'sheet' })}>
              {content}
            </Sheet.Body>
          </Sheet.Dialog>
        </Sheet.Content>
      </Sheet.Backdrop>
    </Sheet>
  ) : (
    <Popover isOpen={isOpen} onOpenChange={changeOpen}>
      {footer?.compact ? null : button}
      <Popover.Content
        className={styles.surface()}
        offset={8}
        placement={placement}>
        <GlassHighlights />
        <Popover.Dialog
          aria-label="Control Center"
          className={styles.content()}>
          {content}
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  )
  return (
    <AppearanceProvider appearance={appearance}>
      <PreviewProvider enabled={preview}>{overlay}</PreviewProvider>
    </AppearanceProvider>
  )
}

const PanelOutlet = <Context extends object>({
  context,
  tiles,
  panel,
  onPanelChange
}: Pick<ControlCenterProps<Context>, 'context' | 'tiles'> & {
  panel: string | null
  onPanelChange: (panel: string | null) => void
}) => {
  const entry = tiles.find(entry => entry.id === panel)
  if (entry?.Panel) {
    const Content = entry.Panel
    return (
      <>
        <div className={styles.panelHeader()}>
          <Button
            aria-label="Back to Control Center"
            isIconOnly
            size="sm"
            variant="ghost"
            onPress={() => onPanelChange(null)}>
            <AltArrowLeft size={16} />
          </Button>
          <span className={styles.panelTitle()}>{entry.title}</span>
        </div>
        <div className={styles.panelBody()}>
          <Content key={panel} {...context} />
        </div>
      </>
    )
  }
  return (
    <div className={styles.home()}>
      {tiles.map(entry => (
        <div
          key={entry.id}
          className={styles.tileContainer({ span: entry.span })}>
          <TileContent
            entry={entry}
            context={context}
            onOpen={() => onPanelChange(entry.id)}
          />
        </div>
      ))}
    </div>
  )
}

const TileContent = <Context extends object>({
  entry,
  context,
  onOpen
}: {
  entry: TileDefinition<Context>
  context: Context
  onOpen: () => void
}) => {
  if (entry.onAction) {
    return (
      <ActionTile
        label={entry.label}
        description={entry.description}
        icon={entry.icon}
        compact={entry.span === 'compact'}
        onPress={() => entry.onAction(context)}
      />
    )
  }
  if (entry.Panel) {
    const Tile = entry.Tile
    return <Tile {...context} onOpen={onOpen} />
  }
  const Tile: ComponentType<Context> = entry.Tile
  return <Tile {...context} />
}

export type { ControlCenterProps, TileDefinition } from './types'
export type {
  AppearanceAdapter,
  ThemeMode,
  LanguageAdapter,
  Option
} from './types'
export {
  ThemeToggle,
  AppearanceToggle,
  AppearanceTile,
  AppearanceSettings
} from './appearance'
export { ThemeTile, ThemeSettings } from './theme'
export {
  LanguageTile,
  LanguageSettings,
  DocumentLanguageTile,
  DocumentLanguageSettings
} from './language'
export { DirectionTile, DirectionSettings } from './direction'
export { ActionTile } from './tile'
export { Options } from './options'
export { EditControlsTile, EditControlsSettings } from './editor'
export {
  PreviewWiFiTile,
  PreviewWiFiSettings,
  PreviewBluetoothTile,
  PreviewBluetoothSettings,
  PreviewAirDropTile,
  PreviewAirDropSettings,
  PreviewFocusTile,
  PreviewStageManagerTile,
  PreviewMirroringTile,
  PreviewMirroringSettings,
  PreviewMediaTile,
  PreviewDisplayTile,
  PreviewSoundTile
} from './preview'
export {
  controlCenterTileVariants,
  controlCenterVariants,
  optionTileVariants
} from './variant'

export { ConfiguredControlCenter, resolveTiles } from './configured'
export type {
  ConfiguredControlCenterProps,
  ControlCenterActionEvent
} from './configured'
export type {
  BuiltinTileType,
  TileConfig,
  ControlCenterConfig,
  ControlCenterContext,
  TileRegistration
} from './types'
