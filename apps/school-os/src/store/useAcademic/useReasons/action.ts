import { reasonsData } from './data'
import type { RQReasons, ReasonsResponse } from './types'

const Reasons = {
  list: async (_rq: RQReasons): Promise<ReasonsResponse> => {
    return Promise.resolve(reasonsData)
  }
}

export { Reasons }
