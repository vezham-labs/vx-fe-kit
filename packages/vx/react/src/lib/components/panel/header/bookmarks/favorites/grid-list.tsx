import { Button, GridList, GridListItem } from 'react-aria-components'

import { Avatar, cn } from '@vezham/react-v3'

import { sampleFavorites } from './data'
import { type FavoriteGridListProps } from './types'
import { tva } from './variant'

const FavoriteGridList = ({
  items = sampleFavorites,
  dragAndDropHooks,
  classNames,
  ...variantProps
}: FavoriteGridListProps) => {
  const slots = tva(variantProps)

  return (
    <GridList
      aria-label="Favorites"
      className={slots.grid({ class: classNames?.grid })}
      dragAndDropHooks={dragAndDropHooks}
      items={items}
      layout="grid"
      renderEmptyState={() => (
        <span className={slots.emptyState({ class: classNames?.emptyState })}>
          Drop items here
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
  )
}

export { FavoriteGridList }
