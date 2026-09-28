import OperationsTablePage from '@pages/operations/_shared'
import {
  roomTypeConfig,
  useRoomType
} from '@store/useOperations/useHostel/useRoomType'

export default function RoomTypeOperationsPage() {
  const { data } = useRoomType.list({})

  return <OperationsTablePage config={{ ...roomTypeConfig, rows: data }} />
}
