import { useQuery } from '@tanstack/react-query'

import { PickupPoints } from './action'
import { pickupPointsConfig, pickupPointsData } from './data'
import type { RQPickupPoints } from './types'

export * from './data'
export * from './types'

export const CK_PICKUP_POINTS = 'pickup-points'

export const usePickupPoints = {
  list: (rq: RQPickupPoints = {}) =>
    useQuery({
      queryKey: [CK_PICKUP_POINTS, rq],
      queryFn: () => PickupPoints.list(rq),
      initialData: pickupPointsData
    })
}

export { pickupPointsConfig }
