import {
  hostelListConfig,
  useHostelList
} from '../../../../store/useOperations/useHostel/useHostelList'
import OperationsTablePage from '../../_shared'

export default function HostelListOperationsPage() {
  const { data } = useHostelList.list({})

  return <OperationsTablePage config={{ ...hostelListConfig, rows: data }} />
}
