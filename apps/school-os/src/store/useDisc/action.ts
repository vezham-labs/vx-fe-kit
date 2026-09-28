import { discData } from './data'
import type { DiscResponse, RQDisc } from './types'

const Disc = {
  list: async (_rq: RQDisc): Promise<DiscResponse> => {
    return Promise.resolve(discData)
  }
}

export { Disc }
