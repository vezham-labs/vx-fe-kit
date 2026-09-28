import {
  booksConfig,
  useBooks
} from '../../../../store/useOperations/useLibrary/useBooks'
import OperationsTablePage from '../../_shared'

export default function BooksOperationsPage() {
  const { data } = useBooks.list({})

  return <OperationsTablePage config={{ ...booksConfig, rows: data }} />
}
