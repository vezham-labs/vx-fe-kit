import { type DragAndDropHooks } from 'react-aria-components'

import { type tvProps, type tvSlots } from './variant'

export interface FavoriteItem {
  id: string
  name: string
  url: string
  avatar?: string
  backgroundImage?: string
}

export interface FavoriteGridListProps extends tvProps {
  items?: FavoriteItem[]
  onAction?: (item: FavoriteItem) => void
  onRemove?: (id: string) => void
  onReorder?: (items: FavoriteItem[]) => void
  dragAndDropHooks?: DragAndDropHooks<FavoriteItem>
  classNames?: Partial<Record<tvSlots, string>>
}
