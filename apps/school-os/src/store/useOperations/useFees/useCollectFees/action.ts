import { collectFeesData } from './data'
import type { CollectFeesResponse, RQCollectFees } from './types'

const CollectFees = {
  list: async (_rq: RQCollectFees): Promise<CollectFeesResponse> => {
    return Promise.resolve(collectFeesData)
  }
}

export { CollectFees }
