import OperationsTablePage from '@pages/operations/_shared'
import {
  hostelListConfig,
  useHostelList
} from '@store/useOperations/useHostel/useHostelList'

export default function HostelListOperationsPage() {
  const { data } = useHostelList.list({})

  return <OperationsTablePage config={{ ...hostelListConfig, rows: data }} />
}
