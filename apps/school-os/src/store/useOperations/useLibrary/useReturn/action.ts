import { returnData } from './data'
import type { RQReturn, ReturnResponse } from './types'

const Return = {
  list: async (_rq: RQReturn): Promise<ReturnResponse> => {
    return Promise.resolve(returnData)
  }
}

export { Return }
