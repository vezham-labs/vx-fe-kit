import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion'
import { ReactNode } from 'react'

import {
  CloseButton,
  ScrollShadow,
  Surface,
  Typography,
  useMediaQuery
} from '@vezham/react-v3'

import { ACCOUNT_BUBBLE_MEDIA_QUERY } from '../responsive'
import { useInfoPanel } from './provider'
import { InfoPanelSheet } from './sheet'
import {
  panelBodyClass,
  panelHeaderClass,
  panelHeadingClass,
  panelLayoutClass
} from './styles'
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
  const activePanel = activeInfoPanel ? panels[activeInfoPanel] : null
  const compact = useMediaQuery(ACCOUNT_BUBBLE_MEDIA_QUERY, {
    initializeWithValue: false
  })
  const panel = isOpen && activeInfoPanel ? panels[activeInfoPanel] : null

  if (compact && activePanel) {
    if (activePanel.renderCompact) {
      return activePanel.renderCompact({ isOpen, onClose: closeInfoPanel })
    }
    return panel ? (
      <InfoPanelSheet
        key={activeInfoPanel}
        panel={panel}
        onClose={closeInfoPanel}
      />
    ) : null
  }

  return (
    <aside
      aria-hidden={!panel}
      className={`sticky top-0 z-40 shrink-0 overflow-hidden ${className ?? ''}`}
      style={{ width: panel ? width : 0 }}>
      <LazyMotion features={domAnimation}>
        <AnimatePresence mode="wait">
          {panel && (
            <m.div
              key={activeInfoPanel}
              animate={{ opacity: 1, x: 0 }}
              className="h-full"
              exit={{ opacity: 0, x: -16 }}
              initial={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              style={{ width }}>
              <Surface
                variant="transparent"
                data-vx="info-panel"
                className={`${panelLayoutClass} border-border border-r`}>
                <InfoPanelHeader
                  title={panel.title}
                  titleIcon={panel.titleIcon}
                  onClose={closeInfoPanel}
                />
                <InfoPanelContent scrollable={panel.scrollable ?? true}>
                  {panel.content}
                </InfoPanelContent>
              </Surface>
            </m.div>
          )}
        </AnimatePresence>
      </LazyMotion>
    </aside>
  )
}

const InfoPanelHeader = ({
  title,
  titleIcon,
  onClose
}: {
  title: string
  titleIcon?: ReactNode
  onClose?: () => void
}) => {
  return (
    <div className={panelHeaderClass}>
      <div className="flex min-w-0 flex-1 items-center gap-2">
        {titleIcon}
        <Typography.Heading className={panelHeadingClass}>
          {title}
        </Typography.Heading>
      </div>

      <CloseButton onPress={onClose} />
    </div>
  )
}

const InfoPanelContent = ({
  children,
  scrollable
}: {
  children: ReactNode
  scrollable: boolean
}) => {
  if (!scrollable)
    return <div className={`${panelBodyClass} overflow-hidden`}>{children}</div>
  return (
    <ScrollShadow className={panelBodyClass} hideScrollBar>
      {children}
    </ScrollShadow>
  )
}

export { InfoPanelContainer }
