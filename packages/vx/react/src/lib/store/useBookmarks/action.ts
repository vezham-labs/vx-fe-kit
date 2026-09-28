import { bookmarksData } from './data'
import type { BookmarksResponse, RQBookmarks } from './types'

const Bookmarks = {
  list: async (_rq: RQBookmarks): Promise<BookmarksResponse> => {
    return Promise.resolve(bookmarksData)
  }
}

export { Bookmarks }
