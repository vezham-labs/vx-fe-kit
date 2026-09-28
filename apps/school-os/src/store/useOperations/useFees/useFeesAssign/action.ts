import { feesAssignData } from './data'
import type { FeesAssignResponse, RQFeesAssign } from './types'

const FeesAssign = {
  list: async (_rq: RQFeesAssign): Promise<FeesAssignResponse> => {
    return Promise.resolve(feesAssignData)
  }
}

export { FeesAssign }
