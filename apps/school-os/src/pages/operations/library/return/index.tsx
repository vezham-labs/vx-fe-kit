import OperationsTablePage from '@pages/operations/_shared'
import {
  returnBooksConfig,
  useReturn
} from '@store/useOperations/useLibrary/useReturn'

export default function ReturnBooksOperationsPage() {
  const { data } = useReturn.list({})

  return <OperationsTablePage config={{ ...returnBooksConfig, rows: data }} />
}
