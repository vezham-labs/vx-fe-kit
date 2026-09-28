import { useQuery } from '@tanstack/react-query'

import { Sections } from './action'
import type { RQSection } from './types'

export * from './data'
export * from './types'

export const CK_SECTION = 'section'

export const useSection = {
  list: (rq: RQSection = {}) =>
    useQuery({
      queryKey: [CK_SECTION, rq],
      queryFn: () => Sections.list(rq)
    })
}
