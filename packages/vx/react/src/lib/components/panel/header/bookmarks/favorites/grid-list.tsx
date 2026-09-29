import { Button, GridList, GridListItem } from 'react-aria-components'

import { Star as StarIcon } from '@vezham/icons-react'
import { Avatar, Typography, cn } from '@vezham/react-v3'

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

              {item.backgroundImage ? (
                <img
                  alt={item.name}
                  className={slots.backgroundImage({
                    class: classNames?.backgroundImage
                  })}
                  src={item.backgroundImage}
                />
              ) : (
                <div
                  className={slots.backgroundFallback({
                    class: classNames?.backgroundFallback
                  })}
                />
              )}

              <div className={slots.overlay({ class: classNames?.overlay })} />

              <div
                className={slots.avatarContainer({
                  class: classNames?.avatarContainer
                })}>
                <Avatar
                  className={slots.avatar({ class: classNames?.avatar })}
                  size="sm">
                  {item.avatar && (
                    <Avatar.Image src={item.avatar} alt={item.name} />
                  )}
                  <Avatar.Fallback
                    className={slots.avatarFallback({
                      class: classNames?.avatarFallback
                    })}>
                    <StarIcon
                      className={slots.avatarIcon({
                        class: classNames?.avatarIcon
                      })}
                      size={14}
                      weight="filled"
                      aria-hidden="true"
                    />
                  </Avatar.Fallback>
                </Avatar>
              </div>

              <div className={slots.content({ class: classNames?.content })}>
                <Typography.Paragraph
                  className={slots.name({ class: classNames?.name })}>
                  {item.name}
                </Typography.Paragraph>
              </div>
            </>
          )}
        </GridListItem>
      )}
    </GridList>
  )
}

export { FavoriteGridList }
