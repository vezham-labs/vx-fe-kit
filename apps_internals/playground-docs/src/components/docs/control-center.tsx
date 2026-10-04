import { useState } from 'react'

import { Settings } from '@vezham/icons-react'
import { Button, Modal, Popover, useMediaQuery } from '@vezham/react-v3'

import { controlCenterVariants } from '@components/docs/control-center.variants'
import { ControlCenterPanelOutlet } from '@components/docs/control-center/panel-outlet'
import type {
  ControlCenterPanelContext,
  ControlCenterPanelId
} from '@components/docs/control-center/panels'

type Props = ControlCenterPanelContext

const styles = controlCenterVariants()

const GlassHighlights = () => (
  <>
    <div aria-hidden="true" className={styles.edgeHighlight()} />
    <div aria-hidden="true" className={styles.surfaceHighlight()} />
  </>
)

export const ControlCenter = (props: Props) => {
  const isCompact = useMediaQuery('(width < 768px)', {
    initializeWithValue: false
  })
  const [isOpen, setOpen] = useState(false)
  const [panel, setPanel] = useState<ControlCenterPanelId | null>(null)

  const onOpenChange = (open: boolean) => {
    setOpen(open)
    if (!open) setPanel(null)
  }
  const trigger = (
    <Button aria-label="Control center" isIconOnly size="sm" variant="ghost">
      <Settings size={16} className={styles.triggerIcon()} />
    </Button>
  )
  const content = (
    <ControlCenterPanelOutlet
      {...props}
      panel={panel}
      onPanelChange={setPanel}
    />
  )

  return isCompact ? (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      {trigger}
      <Modal.Backdrop className={styles.backdrop()} variant="blur">
        <Modal.Container placement="top" className={styles.modalContainer()}>
          <Modal.Dialog
            aria-label="Control Center"
            className={styles.surface({ presentation: 'modal' })}>
            <GlassHighlights />
            <Modal.Body className={styles.content({ presentation: 'modal' })}>
              {content}
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  ) : (
    <Popover isOpen={isOpen} onOpenChange={onOpenChange}>
      {trigger}
      <Popover.Content
        className={styles.surface()}
        offset={8}
        placement="bottom end">
        <GlassHighlights />
        <Popover.Dialog
          aria-label="Control Center"
          className={styles.content()}>
          {content}
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  )
}
