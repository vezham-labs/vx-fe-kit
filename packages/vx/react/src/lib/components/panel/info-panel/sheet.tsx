import { useState } from 'react'

import { Maximize, Minimize } from '@vezham/icons-react'
import { Sheet } from '@vezham/react-pro-v3'
import { Button, Tooltip } from '@vezham/react-v3'

import type { InfoPanelDefinition } from './types'

export const InfoPanelSheet = ({
  panel,
  onClose
}: {
  panel: InfoPanelDefinition
  onClose: () => void
}) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <Sheet
      isOpen
      onOpenChange={open => !open && onClose()}
      placement="bottom"
      isHandleOnly
      shouldAutoFocus>
      <Sheet.Backdrop
        variant="blur"
        className="bg-overlay/10 z-80 backdrop-blur-xs">
        <Sheet.Content
          className={`mx-auto w-full ${expanded ? 'h-dvh max-h-none max-w-none' : 'h-[75dvh] max-h-[75dvh] max-w-2xl'}`}>
          <Sheet.Dialog
            className={`bg-surface/95 border-border flex h-full max-h-none flex-col overflow-hidden border shadow-2xl backdrop-blur-2xl ${expanded ? 'rounded-none pt-[env(safe-area-inset-top)]' : 'rounded-t-[1.75rem]'}`}>
            {!expanded && <Sheet.Handle />}
            <Sheet.Header className="flex shrink-0 flex-row items-center gap-2 px-4 py-3">
              <Sheet.Heading className="flex min-w-0 flex-1 items-center gap-2 text-base font-semibold">
                {panel.titleIcon}
                <span className="truncate">{panel.title}</span>
              </Sheet.Heading>
              <Tooltip>
                <Button
                  isIconOnly
                  size="sm"
                  variant="ghost"
                  aria-label={`${expanded ? 'Collapse' : 'Expand'} ${panel.title}`}
                  onPress={() => setExpanded(current => !current)}>
                  {expanded ? (
                    <Minimize size={18} aria-hidden="true" />
                  ) : (
                    <Maximize size={18} aria-hidden="true" />
                  )}
                </Button>
                <Tooltip.Content>
                  {expanded ? 'Collapse' : 'Expand'}
                </Tooltip.Content>
              </Tooltip>
              <Sheet.CloseTrigger
                aria-label={`Close ${panel.title}`}
                className="static shrink-0"
              />
            </Sheet.Header>
            <Sheet.Body
              className={`min-h-0 flex-1 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] ${panel.scrollable === false ? 'overflow-hidden' : 'overflow-y-auto overscroll-contain'}`}>
              {panel.content}
            </Sheet.Body>
          </Sheet.Dialog>
        </Sheet.Content>
      </Sheet.Backdrop>
    </Sheet>
  )
}
