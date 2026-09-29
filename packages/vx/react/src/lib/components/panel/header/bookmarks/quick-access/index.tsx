import React from 'react'

import {
  AltArrowDown as AltArrowDownIcon,
  AltArrowUp as AltArrowUpIcon,
  ArrowLeft as ArrowLeftIcon,
  Eye as EyeIcon,
  Star as StarIcon
} from '@vezham/icons-react'
import { Avatar, Button, ScrollShadow, Typography } from '@vezham/react-v3'

import { ReorderableGridList } from '../favorites'
import { type QuickAccessProps } from './types'

const QuickAccess = ({
  mode,
  quickAccessFavorites,
  scrollFavorites,
  hasMoreFavorites,
  isScrollFavoritesOpen,
  renderFavoriteItem,
  getSectionProps,
  getSectionHeaderProps,
  getSectionTitleProps,
  getFavorite2ItemsProps,
  getFavoriteBackgroundImageProps,
  getFavoriteBackgroundGradientProps,
  getFavoriteOverlayProps,
  getFavoriteAvatarContainerProps,
  getFavoriteAvatarProps,
  getFavoriteAvatarIconProps,
  getFavoriteAvatarFallbackProps,
  getFavoriteContentProps,
  getFavoriteNameProps,
  onFavoriteClick,
  onViewAllFavorites,
  onBackToNormalView,
  onToggleScrollFavorites
}: QuickAccessProps) => {
  const renderAllFavoritesFullView = () => {
    return (
      <div className="space-y-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex min-w-0 items-center gap-2">
            <Button
              isIconOnly
              aria-label="Back to bookmarks"
              size="sm"
              variant="ghost"
              className="text-default-600 shrink-0"
              onPress={onBackToNormalView}>
              <ArrowLeftIcon size={16} aria-hidden="true" />
            </Button>
            <Typography.Heading className="text-xl font-semibold">
              All Favorites
            </Typography.Heading>
          </div>
        </div>
        <div className="space-y-2">
          {quickAccessFavorites.map(item => (
            <button
              key={item.id}
              onClick={() => onFavoriteClick(item.url, item)}
              className="hover:bg-default-100 focus-visible:ring-primary flex w-full cursor-pointer items-center gap-4 rounded-xl px-3 py-3 text-left transition-colors duration-200 outline-none focus-visible:ring-2">
              <Avatar className="h-6 w-6 shrink-0">
                {item.avatar ? (
                  <Avatar.Image src={item.avatar} alt={item.name} />
                ) : item.backgroundImage ? (
                  <Avatar.Image src={item.backgroundImage} alt={item.name} />
                ) : null}
                <Avatar.Fallback className="bg-default-500 text-white">
                  <StarIcon
                    className="text-warning"
                    size="1em"
                    weight="filled"
                    aria-hidden="true"
                  />
                </Avatar.Fallback>
              </Avatar>
              <Typography.Paragraph className="font-base min-w-0 flex-1 truncate text-sm text-black">
                {item.name}
              </Typography.Paragraph>
            </button>
          ))}
        </div>
      </div>
    )
  }

  const renderFavoriteItemsForScroll = () => {
    if (renderFavoriteItem) {
      return scrollFavorites.map(item => (
        <React.Fragment key={item.id}>
          {renderFavoriteItem({
            item,
            onItemClick: url => onFavoriteClick(url, item)
          })}
        </React.Fragment>
      ))
    }

    return (
      <div className="flex flex-nowrap gap-3 pb-2">
        {scrollFavorites.map(item => (
          <div
            role="button"
            tabIndex={0}
            key={item.id}
            {...getFavorite2ItemsProps()}
            onClick={() => onFavoriteClick(item.url, item)}
            onKeyDown={event => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                onFavoriteClick(item.url, item)
              }
            }}>
            {item.backgroundImage ? (
              <img
                {...getFavoriteBackgroundImageProps(
                  item.backgroundImage,
                  item.name
                )}
                alt={item.name}
              />
            ) : (
              <div {...getFavoriteBackgroundGradientProps()} />
            )}
            <div {...getFavoriteOverlayProps()} />

            <div {...getFavoriteAvatarContainerProps()}>
              <Avatar {...getFavoriteAvatarProps()}>
                {item.avatar && (
                  <Avatar.Image src={item.avatar} alt={item.name} />
                )}
                <Avatar.Fallback {...getFavoriteAvatarFallbackProps(item.name)}>
                  <StarIcon
                    {...getFavoriteAvatarIconProps()}
                    weight="filled"
                    aria-hidden="true"
                  />
                </Avatar.Fallback>
              </Avatar>
            </div>

            <div {...getFavoriteContentProps()}>
              <Typography.Paragraph {...getFavoriteNameProps(item.name)} />
            </div>
          </div>
        ))}

        {hasMoreFavorites && (
          <button
            onClick={onViewAllFavorites}
            className="group bg-default-100 hover:bg-default-200 relative flex aspect-square w-[120px] shrink-0 cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98]">
            <div className="flex flex-col items-center gap-2 p-4">
              <EyeIcon
                size={32}
                className="text-primary"
                weight="filled"
                aria-hidden="true"
              />
              <div className="text-center">
                <Typography.Paragraph className="text-default-700 text-sm font-semibold">
                  View All
                </Typography.Paragraph>
                <Typography.Paragraph className="text-default-500 text-xs">
                  {quickAccessFavorites.length - 6} more
                </Typography.Paragraph>
              </div>
            </div>
          </button>
        )}
      </div>
    )
  }

  if (mode === 'all') {
    return renderAllFavoritesFullView()
  }

  return (
    <>
      <section {...getSectionProps()}>
        <div {...getSectionHeaderProps()}>
          <Typography.Heading {...getSectionTitleProps('Favorites')} />
        </div>

        <ReorderableGridList />
      </section>

      <section {...getSectionProps()}>
        <div {...getSectionHeaderProps()}>
          <div className="flex flex-1 items-center gap-2">
            <Typography.Heading {...getSectionTitleProps('Quick Access')} />
          </div>
          <div className="flex items-center gap-2">
            <Button
              aria-label={
                isScrollFavoritesOpen
                  ? 'Collapse quick access'
                  : 'Expand quick access'
              }
              isIconOnly
              size="sm"
              variant="ghost"
              onPress={onToggleScrollFavorites}
              className="text-default-400">
              {isScrollFavoritesOpen ? (
                <AltArrowUpIcon size={18} aria-hidden="true" />
              ) : (
                <AltArrowDownIcon size={18} aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>

        {isScrollFavoritesOpen && (
          <ScrollShadow
            orientation="horizontal"
            className="max-w-full overflow-x-auto pb-2"
            hideScrollBar={false}>
            {renderFavoriteItemsForScroll()}
          </ScrollShadow>
        )}
      </section>
    </>
  )
}

export { QuickAccess }
