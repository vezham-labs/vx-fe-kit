import { useQuery } from '@tanstack/react-query'

import { AllClasses } from './action'
import type { RQAllClasses } from './types'

export * from './data'
export * from './types'

export const CK_ALL_CLASSES = 'all-classes'

export const useAllClasses = {
  list: (rq: RQAllClasses = {}) =>
    useQuery({
      queryKey: [CK_ALL_CLASSES, rq],
      queryFn: () => AllClasses.list(rq)
    })
}
