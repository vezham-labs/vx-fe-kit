import { useQuery } from '@tanstack/react-query'

import { Bookmarks } from './action'
import { bookmarksData } from './data'
import type { RQBookmarks } from './types'

export * from './data'
export * from './types'

const CK_BOOKMARKS = 'bookmarks'

const useBookmarksList = (rq: RQBookmarks = {}) =>
  useQuery({
    queryKey: [CK_BOOKMARKS, rq],
    queryFn: () => Bookmarks.list(rq),
    initialData: bookmarksData
  })

export const useBookmarks = {
  list: useBookmarksList
}
