import OperationsTablePage from '@pages/operations/_shared'
import {
  collectFeesConfig,
  useCollectFees
} from '@store/useOperations/useFees/useCollectFees'

export default function CollectFeesOperationsPage() {
  const { data } = useCollectFees.list({})

  return <OperationsTablePage config={{ ...collectFeesConfig, rows: data }} />
}
