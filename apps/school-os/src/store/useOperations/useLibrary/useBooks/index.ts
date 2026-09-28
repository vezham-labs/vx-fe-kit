import { useQuery } from '@tanstack/react-query'

import { Books } from './action'
import { booksConfig, booksData } from './data'
import type { RQBooks } from './types'

export * from './data'
export * from './types'

export const CK_BOOKS = 'books'

export const useBooks = {
  list: (rq: RQBooks = {}) =>
    useQuery({
      queryKey: [CK_BOOKS, rq],
      queryFn: () => Books.list(rq),
      initialData: booksData
    })
}

export { booksConfig }
