import { useQuery } from '@tanstack/react-query'

import { IssueBooks } from './action'
import { issueBookConfig, issueBooksData } from './data'
import type { RQIssueBooks } from './types'

export * from './data'
export * from './types'

export const CK_ISSUE_BOOKS = 'issue-books'

export const useIssueBooks = {
  list: (rq: RQIssueBooks = {}) =>
    useQuery({
      queryKey: [CK_ISSUE_BOOKS, rq],
      queryFn: () => IssueBooks.list(rq),
      initialData: issueBooksData
    })
}

export { issueBookConfig }
