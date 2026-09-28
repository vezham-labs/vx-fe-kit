import {
  type ComponentProps,
  type HTMLAttributes,
  type ImgHTMLAttributes,
  type ReactNode
} from 'react'

import { Star as StarIcon } from '@vezham/icons-react'
import { Avatar } from '@vezham/react-v3'

import { type FavoriteItem } from '@components/panel/header/bookmarks/types'

export interface QuickAccessProps {
  mode: 'sections' | 'all'
  quickAccessFavorites: FavoriteItem[]
  scrollFavorites: FavoriteItem[]
  hasMoreFavorites: boolean
  isScrollFavoritesOpen: boolean
  renderFavoriteItem?: (props: {
    item: FavoriteItem
    onItemClick?: (url: string) => void
  }) => ReactNode
  getSectionProps: () => HTMLAttributes<HTMLElement>
  getSectionHeaderProps: () => HTMLAttributes<HTMLDivElement>
  getSectionTitleProps: (title: string) => HTMLAttributes<HTMLHeadingElement>
  getFavorite2ItemsProps: () => HTMLAttributes<HTMLDivElement>
  getFavoriteBackgroundImageProps: (
    src: string,
    alt: string
  ) => ImgHTMLAttributes<HTMLImageElement>
  getFavoriteBackgroundGradientProps: () => HTMLAttributes<HTMLDivElement>
  getFavoriteOverlayProps: () => HTMLAttributes<HTMLDivElement>
  getFavoriteAvatarContainerProps: () => HTMLAttributes<HTMLDivElement>
  getFavoriteAvatarProps: () => ComponentProps<typeof Avatar>
  getFavoriteAvatarIconProps: () => ComponentProps<typeof StarIcon>
  getFavoriteAvatarFallbackProps: (
    name: string
  ) => ComponentProps<typeof Avatar.Fallback>
  getFavoriteContentProps: () => HTMLAttributes<HTMLDivElement>
  getFavoriteNameProps: (name: string) => HTMLAttributes<HTMLParagraphElement>
  onFavoriteClick: (url: string, item: FavoriteItem) => void
  onViewAllFavorites: () => void
  onBackToNormalView: () => void
  onToggleScrollFavorites: () => void
}
