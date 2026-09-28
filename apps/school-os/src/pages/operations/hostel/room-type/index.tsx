import {
  roomTypeConfig,
  useRoomType
} from '../../../../store/useOperations/useHostel/useRoomType'
import OperationsTablePage from '../../_shared'

export default function RoomTypeOperationsPage() {
  const { data } = useRoomType.list({})

  return <OperationsTablePage config={{ ...roomTypeConfig, rows: data }} />
}
