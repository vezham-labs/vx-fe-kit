import { discData } from './data'
import type { DiscResponse, RQDisc } from './types'

const Disc = {
  list: async (rq: RQDisc): Promise<DiscResponse> => {
    void rq
    return Promise.resolve(discData)
  }
}

export { Disc }
