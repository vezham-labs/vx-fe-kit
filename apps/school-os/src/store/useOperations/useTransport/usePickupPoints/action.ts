import { pickupPointsData } from './data'
import type { PickupPointsResponse, RQPickupPoints } from './types'

const PickupPoints = {
  list: async (_rq: RQPickupPoints): Promise<PickupPointsResponse> => {
    return Promise.resolve(pickupPointsData)
  }
}

export { PickupPoints }
