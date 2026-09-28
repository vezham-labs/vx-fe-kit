import { hostelRoomData } from './data'
import type { HostelRoomResponse, RQHostelRoom } from './types'

const HostelRoom = {
  list: async (_rq: RQHostelRoom): Promise<HostelRoomResponse> => {
    return Promise.resolve(hostelRoomData)
  }
}

export { HostelRoom }
