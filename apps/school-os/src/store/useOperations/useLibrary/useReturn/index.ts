import { useQuery } from '@tanstack/react-query'

import { Return } from './action'
import { returnBooksConfig, returnData } from './data'
import type { RQReturn } from './types'

export * from './data'
export * from './types'

export const CK_RETURN = 'return'

export const useReturn = {
  list: (rq: RQReturn = {}) =>
    useQuery({
      queryKey: [CK_RETURN, rq],
      queryFn: () => Return.list(rq),
      initialData: returnData
    })
}

export { returnBooksConfig }
