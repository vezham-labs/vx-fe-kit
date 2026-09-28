import { feesMasterData } from './data'
import type { FeesMasterResponse, RQFeesMaster } from './types'

const FeesMaster = {
  list: async (_rq: RQFeesMaster): Promise<FeesMasterResponse> => {
    return Promise.resolve(feesMasterData)
  }
}

export { FeesMaster }
