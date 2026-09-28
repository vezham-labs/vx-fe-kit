import { hostelListData } from './data'
import type { HostelListResponse, RQHostelList } from './types'

const HostelList = {
  list: async (_rq: RQHostelList): Promise<HostelListResponse> => {
    return Promise.resolve(hostelListData)
  }
}

export { HostelList }
