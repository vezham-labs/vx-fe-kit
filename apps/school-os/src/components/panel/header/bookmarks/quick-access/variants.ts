import { type FavoriteItem } from '../types'

const getFavoriteIds = (items: FavoriteItem[]) => items.map(item => item.id)

const reconcileFavoriteOrder = (orderIds: string[], items: FavoriteItem[]) => {
  const itemIds = new Set(getFavoriteIds(items))
  const orderedIds = orderIds.filter(id => itemIds.has(id))
  const missingIds = items
    .map(item => item.id)
    .filter(id => !orderedIds.includes(id))

  return [...orderedIds, ...missingIds]
}

const orderFavorites = (items: FavoriteItem[], orderIds: string[]) => {
  const favoriteById = new Map(items.map(item => [item.id, item]))

  return reconcileFavoriteOrder(orderIds, items)
    .map(id => favoriteById.get(id))
    .filter((item): item is FavoriteItem => Boolean(item))
}

const areIdsEqual = (firstIds: string[], secondIds: string[]) =>
  firstIds.length === secondIds.length &&
  firstIds.every((id, index) => id === secondIds[index])

export { areIdsEqual, getFavoriteIds, orderFavorites, reconcileFavoriteOrder }
