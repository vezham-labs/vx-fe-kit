import { Button, GridList, GridListItem } from 'react-aria-components'

import { Avatar, cn } from '@vezham/react-v3'

import { ShortcutContextMenu } from '../shortcut-context-menu'
import { sampleFavorites } from './data'
import { type FavoriteGridListProps } from './types'
import { tva } from './variant'

const FavoriteGridList = ({
  items = sampleFavorites,
  onAction,
  onRemove,
  onReorder,
  dragAndDropHooks,
  classNames,
  ...variantProps
}: FavoriteGridListProps) => {
  void onReorder
  const slots = tva(variantProps)

  return (
    <ShortcutContextMenu items={items} kind="favorite" onRemove={onRemove}>
      <GridList
        aria-label="Favorites"
        className={slots.grid({ class: classNames?.grid })}
        dragAndDropHooks={dragAndDropHooks}
        items={items.slice(0, 12)}
        onAction={key => {
          const item = items.find(item => item.id === key)
          if (item) onAction?.(item)
        }}
        layout="grid"
        renderEmptyState={() => (
          <span className={slots.emptyState({ class: classNames?.emptyState })}>
            No favorites yet
          </span>
        )}
        selectionMode="multiple">
        {item => (
          <GridListItem
            className={({ isDragging, isDropTarget }) =>
              cn(
                slots.item({ class: classNames?.item }),
                isDragging &&
                  slots.itemDragging({ class: classNames?.itemDragging }),
                isDropTarget &&
                  slots.itemDropTarget({ class: classNames?.itemDropTarget })
              ) ?? ''
            }
            data-shortcut-id={item.id}
            id={item.id}
            textValue={item.name}>
            {({ allowsDragging }) => (
              <>
                {allowsDragging && (
                  <Button
                    aria-label={`Drag ${item.name}`}
                    className={slots.dragButton({
                      class: classNames?.dragButton
                    })}
                    slot="drag"
                  />
                )}

                <div
                  title={item.name}
                  className={slots.avatarContainer({
                    class: classNames?.avatarContainer
                  })}>
                  <Avatar
                    className={slots.avatar({ class: classNames?.avatar })}
                    size="sm">
                    {(item.avatar || item.backgroundImage) && (
                      <Avatar.Image
                        src={item.avatar || item.backgroundImage}
                        alt=""
                      />
                    )}
                    <Avatar.Fallback
                      className={slots.avatarFallback({
                        class: classNames?.avatarFallback
                      })}>
                      {item.name.charAt(0)}
                    </Avatar.Fallback>
                  </Avatar>
                </div>
              </>
            )}
          </GridListItem>
        )}
      </GridList>
    </ShortcutContextMenu>
  )
}

export { FavoriteGridList }
