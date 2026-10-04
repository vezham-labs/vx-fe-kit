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

  const { dragAndDropHooks } = useDragAndDrop({
    getItems(_keys, items: FavoriteItem[]) {
      return items.map(item => ({
        'text/plain': item.name,
        favorite: JSON.stringify(item)
      }))
    },
    onReorder(event) {
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
      items={list.items}
      dragAndDropHooks={dragAndDropHooks}
    />
  )
}

export { ReorderableGridList }
