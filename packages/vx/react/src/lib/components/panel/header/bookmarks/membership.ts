import { useSyncExternalStore } from 'react'

import type { FavoriteItem } from './types'

export const FAVORITES_LIMIT = 12
const storageKey = 'vx:bookmark-membership'
const subscribe = (onChange: () => void) => {
  window.addEventListener('storage', onChange)
  window.addEventListener('vx:bookmark-membership', onChange)
  return () => {
    window.removeEventListener('storage', onChange)
    window.removeEventListener('vx:bookmark-membership', onChange)
  }
}
const read = () => localStorage.getItem(storageKey) ?? ''
const serverSnapshot = () => ''
const uniqueIds = (items: readonly FavoriteItem[]) => [
  ...new Set(items.map(item => item.id))
]
const savedIds = (value: unknown): string[] =>
  Array.isArray(value)
    ? [...new Set(value.filter((id): id is string => typeof id === 'string'))]
    : []
export const useBookmarkMembership = ({
  favorites,
  pins,
  onFavoritesChange,
  onPinsChange
}: {
  favorites: readonly FavoriteItem[]
  pins: readonly FavoriteItem[]
  onFavoritesChange?: (items: FavoriteItem[]) => void
  onPinsChange?: (items: FavoriteItem[]) => void
}) => {
  const snapshot = useSyncExternalStore(subscribe, read, serverSnapshot)
  let preferences = {
    removedFavorites: [] as string[],
    removedPins: [] as string[],
    favoriteOrder: [] as string[]
  }
  try {
    const saved = JSON.parse(snapshot || 'null')
    if (saved)
      preferences = {
        removedFavorites: savedIds(saved.removedFavorites),
        removedPins: savedIds(saved.removedPins),
        favoriteOrder: savedIds(saved.favoriteOrder)
      }
  } catch {
    // vx-bot/NOTE: Invalid saved preferences fall back to app-supplied collections.
  }
  const favoritesById = new Map(favorites.map(item => [item.id, item]))
  const pinsById = new Map(pins.map(item => [item.id, item]))
  const removedFavorites = new Set(
    onFavoritesChange ? [] : preferences.removedFavorites
  )
  const removedPins = new Set(onPinsChange ? [] : preferences.removedPins)
  const favoriteIds = uniqueIds(favorites).filter(
    id => !removedFavorites.has(id)
  )
  const favoriteSet = new Set(favoriteIds)
  const preferredOrder = onFavoritesChange
    ? []
    : preferences.favoriteOrder.filter(id => favoriteSet.has(id))
  const orderedIds = new Set(preferredOrder)
  const orderedFavorites = [
    ...preferredOrder,
    ...favoriteIds.filter(id => !orderedIds.has(id))
  ].slice(0, FAVORITES_LIMIT)
  const resolve = (
    ids: readonly string[],
    source: ReadonlyMap<string, FavoriteItem>
  ): FavoriteItem[] =>
    ids.flatMap(id => {
      const item = source.get(id)
      return item ? [item] : []
    })
  const currentFavorites = resolve(orderedFavorites, favoritesById)
  const currentPins = resolve(
    uniqueIds(pins).filter(id => !removedPins.has(id)),
    pinsById
  )
  const save = (next: typeof preferences) => {
    localStorage.setItem(storageKey, JSON.stringify(next))
    window.dispatchEvent(new Event('vx:bookmark-membership'))
  }
  return {
    favorites: currentFavorites,
    pins: currentPins,
    unpin: (id: string) => {
      if (onPinsChange) onPinsChange(currentPins.filter(item => item.id !== id))
      else save({ ...preferences, removedPins: [...removedPins, id] })
    },
    removeFavorite: (id: string) => {
      if (onFavoritesChange)
        onFavoritesChange(currentFavorites.filter(item => item.id !== id))
      else save({ ...preferences, removedFavorites: [...removedFavorites, id] })
    },
    reorderFavorites: (items: readonly FavoriteItem[]) => {
      if (onFavoritesChange)
        onFavoritesChange([...items].slice(0, FAVORITES_LIMIT))
      else
        save({
          ...preferences,
          favoriteOrder: uniqueIds(items).slice(0, FAVORITES_LIMIT)
        })
    }
  }
}
