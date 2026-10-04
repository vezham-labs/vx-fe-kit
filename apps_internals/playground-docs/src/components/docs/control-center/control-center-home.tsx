import type { ComponentType } from 'react'

import { controlCenterVariants } from '@components/docs/control-center.variants'
import {
  type ControlCenterPanelContext,
  type ControlCenterPanelId,
  controlCenterTiles
} from '@components/docs/control-center/panels'

const styles = controlCenterVariants()

type Props = ControlCenterPanelContext & {
  onPanelOpen: (panel: ControlCenterPanelId) => void
}

export const ControlCenterHome = ({ onPanelOpen, ...context }: Props) => (
  <div className={styles.home()}>
    {controlCenterTiles.map(entry => {
      const Tile = entry.Tile
      const ActionTile: ComponentType<ControlCenterPanelContext> | null =
        'Panel' in entry ? null : entry.Tile
      return (
        <div
          key={entry.id}
          className={styles.tileContainer({ span: entry.span })}>
          {'Panel' in entry ? (
            <Tile {...context} onOpen={() => onPanelOpen(entry.id)} />
          ) : (
            ActionTile && <ActionTile {...context} />
          )}
        </div>
      )
    })}
  </div>
)
