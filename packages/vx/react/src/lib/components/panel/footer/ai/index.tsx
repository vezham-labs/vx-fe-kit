import { useState } from 'react'

import { VezhamTamizhi } from '@vezham/icons-react'
import { Sheet } from '@vezham/react-pro-v3'

import type { InfoPanelDefinition } from '../../info-panel'
import { AIContent } from './content'
import { useMockConversation } from './conversation'

type Props = { isOpen: boolean; onClose: () => void }

const AISheet = ({ isOpen, onClose }: Props) =>
  isOpen ? <AISession onClose={onClose} /> : null

const AISession = ({ onClose }: Pick<Props, 'onClose'>) => {
  const conversation = useMockConversation()
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
            <Sheet.CloseTrigger aria-label="Close Tamizhi AI" />
            <Sheet.Header className="px-4 py-3">
              <Sheet.Heading className="flex items-center gap-2 text-base font-semibold">
                <VezhamTamizhi
                  size={20}
                  aria-hidden="true"
                  className="shrink-0"
                />
                Tamizhi AI
              </Sheet.Heading>
            </Sheet.Header>
            <Sheet.Body className="min-h-0 flex-1 overflow-hidden px-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <AIContent
                conversation={conversation}
                panel
                expanded={expanded}
                onExpand={() => setExpanded(current => !current)}
              />
            </Sheet.Body>
          </Sheet.Dialog>
        </Sheet.Content>
      </Sheet.Backdrop>
    </Sheet>
  )
}

const AIPanelContent = () => {
  const conversation = useMockConversation()
  return <AIContent conversation={conversation} panel />
}

export const aiPanel: InfoPanelDefinition = {
  title: 'Tamizhi AI',
  titleIcon: (
    <VezhamTamizhi size={20} aria-hidden="true" className="shrink-0" />
  ),
  scrollable: false,
  content: <AIPanelContent />,
  renderCompact: props => <AISheet {...props} />
}
