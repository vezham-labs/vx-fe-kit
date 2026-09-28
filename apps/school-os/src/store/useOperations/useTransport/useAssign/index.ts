import { useQuery } from '@tanstack/react-query'

import { Assign } from './action'
import { assignVehicleConfig, assignVehicleData } from './data'
import type { RQAssign } from './types'

export * from './data'
export * from './types'

export const CK_ASSIGN = 'assign'

export const useAssign = {
  list: (rq: RQAssign = {}) =>
    useQuery({
      queryKey: [CK_ASSIGN, rq],
      queryFn: () => Assign.list(rq),
      initialData: assignVehicleData
    })
}

export { assignVehicleConfig }
