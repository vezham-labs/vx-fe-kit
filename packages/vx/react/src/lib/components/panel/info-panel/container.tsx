import { AnimatePresence, motion } from 'framer-motion'
import { ReactNode } from 'react'

import {
  CloseButton,
  ScrollShadow,
  Surface,
  Typography
} from '@vezham/react-v3'

import { useInfoPanel } from './provider'
import { ActiveInfoPanel, InfoPanelDefinition } from './types'

const INFO_PANEL_WIDTH = 328

const InfoPanelContainer = ({
  panels,
  className,
  width = INFO_PANEL_WIDTH
}: {
  panels: Record<Exclude<ActiveInfoPanel, null>, InfoPanelDefinition>
  className?: string
  width?: number
}) => {
  const { activeInfoPanel, closeInfoPanel, isOpen } = useInfoPanel()
  const panel = isOpen && activeInfoPanel ? panels[activeInfoPanel] : null

  return (
    <motion.aside
      aria-hidden={!panel}
      animate={{ width: panel ? width : 0 }}
      className={`sticky top-0 z-40 shrink-0 overflow-hidden ${className ?? ''}`}
      initial={false}
      transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}>
      <AnimatePresence mode="wait">
        {panel && (
          <motion.div
            key={activeInfoPanel}
            animate={{ opacity: 1, x: 0 }}
            className="h-full"
            exit={{ opacity: 0, x: -16 }}
            initial={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            style={{ width }}>
            <Surface
              data-vx="info-panel"
              className="border-default-200 bg-background/95 flex h-full flex-col border-r shadow-[8px_0_24px_rgba(15,23,42,0.06)] backdrop-blur-xl">
              <InfoPanelHeader title={panel.title} onClose={closeInfoPanel} />
              <InfoPanelContent>{panel.content}</InfoPanelContent>
            </Surface>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  )
}

const InfoPanelHeader = ({
  title,
  onClose
}: {
  title: string
  onClose?: () => void
}) => {
  return (
    <div className="flex shrink-0 items-center gap-3 px-4 py-4">
      <div className="min-w-0 flex-1">
        <Typography.Heading className="text-foreground truncate text-base font-semibold">
          {title}
        </Typography.Heading>
      </div>

      <CloseButton onPress={onClose} />
    </div>
  )
}

const InfoPanelContent = ({ children }: { children: ReactNode }) => {
  return (
    <ScrollShadow className="min-h-0 flex-1 px-4 pb-4" hideScrollBar>
      {children}
    </ScrollShadow>
  )
}

export { InfoPanelContainer, InfoPanelContent, InfoPanelHeader }
