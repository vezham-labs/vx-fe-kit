import { useQuery } from '@tanstack/react-query'

import { RoomType } from './action'
import { roomTypeConfig, roomTypeData } from './data'
import type { RQRoomType } from './types'

export * from './data'
export * from './types'

export const CK_ROOM_TYPE = 'room-type'

export const useRoomType = {
  list: (rq: RQRoomType = {}) =>
    useQuery({
      queryKey: [CK_ROOM_TYPE, rq],
      queryFn: () => RoomType.list(rq),
      initialData: roomTypeData
    })
}

export { roomTypeConfig }
