import { act, renderHook } from '@testing-library/react'
import { beforeEach, expect, it } from 'vitest'

import { useBookmarkMembership } from './membership'

beforeEach(() => localStorage.clear())
const bookmarks = Array.from({ length: 20 }, (_, index) => ({
  id: String(index),
  name: `Item ${index}`,
  url: `/item/${index}`
}))

it('caps app-supplied favorites while pins remain unlimited and independently removable', () => {
  const { result, rerender } = renderHook(
    props => useBookmarkMembership(props),
    {
      initialProps: {
        favorites: bookmarks.slice(0, 13),
        pins: bookmarks.slice(0, 18)
      }
    }
  )
  expect(result.current.favorites).toHaveLength(12)
  expect(result.current.pins).toHaveLength(18)
  act(() => result.current.removeFavorite('0'))
  expect(result.current.pins.some(item => item.id === '0')).toBe(true)
  act(() => result.current.unpin('1'))
  expect(result.current.favorites.some(item => item.id === '1')).toBe(true)
  rerender({ favorites: bookmarks.slice(0, 13), pins: bookmarks })
  expect(result.current.pins).toHaveLength(19)
  expect(result.current.favorites).toHaveLength(12)
  expect(bookmarks).toHaveLength(20)
})

it('restores memberships and favorite ordering without deleting source bookmarks', () => {
  const props = {
    favorites: bookmarks.slice(0, 2),
    pins: bookmarks.slice(1, 3)
  }
  const first = renderHook(() => useBookmarkMembership(props))
  act(() => first.result.current.reorderFavorites([bookmarks[1], bookmarks[0]]))
  act(() => first.result.current.unpin('1'))
  first.unmount()
  const second = renderHook(() => useBookmarkMembership(props))
  expect(second.result.current.favorites.map(item => item.id)).toEqual([
    '1',
    '0'
  ])
  expect(second.result.current.pins.map(item => item.id)).toEqual(['2'])
  expect(bookmarks).toHaveLength(20)
})

it('resolves pins and favorites from separate collections even when their IDs overlap', () => {
  const favorite = { id: 'same', name: 'Favorite app', url: '/favorite' }
  const pin = { id: 'same', name: 'Pinned app', url: '/pin' }
  const { result } = renderHook(() =>
    useBookmarkMembership({ favorites: [favorite], pins: [pin] })
  )
  expect(result.current.favorites).toEqual([favorite])
  expect(result.current.pins).toEqual([pin])
  act(() => result.current.unpin('same'))
  expect(result.current.pins).toEqual([])
  expect(result.current.favorites).toEqual([favorite])
})
