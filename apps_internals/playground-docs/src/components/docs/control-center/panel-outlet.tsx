import { AltArrowLeft } from '@vezham/icons-react'
import { Button } from '@vezham/react-v3'

import { controlCenterVariants } from '@components/docs/control-center.variants'
import { ControlCenterHome } from '@components/docs/control-center/control-center-home'
import {
  type ControlCenterPanelContext,
  type ControlCenterPanelId,
  controlCenterTiles
} from '@components/docs/control-center/panels'

const styles = controlCenterVariants()

type Props = ControlCenterPanelContext & {
  panel: ControlCenterPanelId | null
  onPanelChange: (panel: ControlCenterPanelId | null) => void
}

export const ControlCenterPanelOutlet = ({
  panel,
  onPanelChange,
  ...context
}: Props) => {
  const entry = controlCenterTiles.find(entry => entry.id === panel)

  if (!entry || !('Panel' in entry)) {
    return <ControlCenterHome {...context} onPanelOpen={onPanelChange} />
  }

  const { title, Panel: Content } = entry

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
        <span className={styles.panelTitle()}>{title}</span>
      </div>
      <div className={styles.panelBody()}>
        <Content key={panel} {...context} />
      </div>
    </>
  )
}
