import { roomTypeData } from './data'
import type { RQRoomType, RoomTypeResponse } from './types'

const RoomType = {
  list: async (_rq: RQRoomType): Promise<RoomTypeResponse> => {
    return Promise.resolve(roomTypeData)
  }
}

export { RoomType }
