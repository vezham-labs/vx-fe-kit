import {
  collectFeesConfig,
  useCollectFees
} from '../../../../store/useOperations/useFees/useCollectFees'
import OperationsTablePage from '../../_shared'

export default function CollectFeesOperationsPage() {
  const { data } = useCollectFees.list({})

  return <OperationsTablePage config={{ ...collectFeesConfig, rows: data }} />
}
