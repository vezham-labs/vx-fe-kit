import type { ComponentProps, ReactNode } from 'react'

import { ScrollShadow } from '@vezham/react-v3'

export const StorageHistoryShell = ({
  search,
  actions,
  containerProps,
  children
}: {
  search: ReactNode
  actions?: ReactNode
  containerProps: ComponentProps<'div'>
  children: ReactNode
}) => (
  <div className="flex min-h-0 flex-1 flex-col">
    <div className="bg-background/95 sticky top-0 z-10 shrink-0 pb-3">
      {search}
      {actions}
    </div>
    <div {...containerProps}>
      <ScrollShadow hideScrollBar className="h-full">
        {children}
      </ScrollShadow>
    </div>
  </div>
)
