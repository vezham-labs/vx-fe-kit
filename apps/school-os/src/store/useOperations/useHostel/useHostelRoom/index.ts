import { useQuery } from '@tanstack/react-query'

import { HostelRoom } from './action'
import { hostelRoomConfig, hostelRoomData } from './data'
import type { RQHostelRoom } from './types'

export * from './data'
export * from './types'

export const CK_HOSTEL_ROOM = 'hostel-room'

export const useHostelRoom = {
  list: (rq: RQHostelRoom = {}) =>
    useQuery({
      queryKey: [CK_HOSTEL_ROOM, rq],
      queryFn: () => HostelRoom.list(rq),
      initialData: hostelRoomData
    })
}

export { hostelRoomConfig }
