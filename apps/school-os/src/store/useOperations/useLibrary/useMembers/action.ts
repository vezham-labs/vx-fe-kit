import { membersData } from './data'
import type { MembersResponse, RQMembers } from './types'

const Members = {
  list: async (_rq: RQMembers): Promise<MembersResponse> => {
    return Promise.resolve(membersData)
  }
}

export { Members }
