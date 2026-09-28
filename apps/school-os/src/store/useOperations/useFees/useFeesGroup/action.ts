import { feesGroupData } from './data'
import type { FeesGroupResponse, RQFeesGroup } from './types'

const FeesGroup = {
  list: async (_rq: RQFeesGroup): Promise<FeesGroupResponse> => {
    return Promise.resolve(feesGroupData)
  }
}

export { FeesGroup }
