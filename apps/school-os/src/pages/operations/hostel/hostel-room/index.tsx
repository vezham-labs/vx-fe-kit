import {
  hostelRoomConfig,
  useHostelRoom
} from '../../../../store/useOperations/useHostel/useHostelRoom'
import OperationsTablePage from '../../_shared'

export default function HostelRoomOperationsPage() {
  const { data } = useHostelRoom.list({})

  return <OperationsTablePage config={{ ...hostelRoomConfig, rows: data }} />
}
