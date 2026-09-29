import { useQuery } from '@tanstack/react-query'

import { Disc } from './action'
import { discData } from './data'
import type { RQDisc } from './types'

export * from './data'
export * from './types'

export const CK_DISC = 'disc'

const useDiscList = (rq: RQDisc = {}) =>
  useQuery({
    queryKey: [CK_DISC, rq],
    queryFn: () => Disc.list(rq),
    initialData: discData
  })

export const useDisc = {
  list: useDiscList
}
