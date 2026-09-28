import {
  returnBooksConfig,
  useReturn
} from '../../../../store/useOperations/useLibrary/useReturn'
import OperationsTablePage from '../../_shared'

export default function ReturnBooksOperationsPage() {
  const { data } = useReturn.list({})

  return <OperationsTablePage config={{ ...returnBooksConfig, rows: data }} />
}
