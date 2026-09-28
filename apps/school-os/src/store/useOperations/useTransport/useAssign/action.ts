import { assignVehicleData } from './data'
import type { AssignResponse, RQAssign } from './types'

const Assign = {
  list: async (_rq: RQAssign): Promise<AssignResponse> => {
    return Promise.resolve(assignVehicleData)
  }
}

export { Assign }
