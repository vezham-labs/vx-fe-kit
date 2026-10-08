import { useDragAndDrop } from 'react-aria-components/useDragAndDrop'
import { useListData } from 'react-aria-components/useListData'

import { sampleFavorites } from './data'
import { FavoriteGridList } from './grid-list'
import { type FavoriteGridListProps, type FavoriteItem } from './types'

type Props = Omit<FavoriteGridListProps, 'dragAndDropHooks'>

const ReorderableGridList = (props: Props) => {
  const list = useListData<FavoriteItem>({
    initialItems: props.items ?? sampleFavorites
  })

  const items = props.items && props.onReorder ? props.items : list.items
  const { dragAndDropHooks } = useDragAndDrop({
    getItems(_keys, items: FavoriteItem[]) {
      return items.map(item => ({
        'text/plain': item.name,
        favorite: JSON.stringify(item)
      }))
    },
    onReorder(event) {
      const moved = items.filter(item => event.keys.has(item.id))
      const remaining = items.filter(item => !event.keys.has(item.id))
      const target = remaining.findIndex(item => item.id === event.target.key)
      if (target >= 0) {
        remaining.splice(
          target + (event.target.dropPosition === 'after' ? 1 : 0),
          0,
          ...moved
        )
        props.onReorder?.(remaining)
      }
      if (props.items && props.onReorder) return
      if (event.target.dropPosition === 'before') {
        list.moveBefore(event.target.key, event.keys)
        return
      }

      if (event.target.dropPosition === 'after') {
        list.moveAfter(event.target.key, event.keys)
      }
    }
  })

  return (
    <FavoriteGridList
      {...props}
      items={items}
      dragAndDropHooks={dragAndDropHooks}
    />
  )
}

export { ReorderableGridList }
