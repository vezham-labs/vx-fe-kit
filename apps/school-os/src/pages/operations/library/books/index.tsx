import OperationsTablePage from '@pages/operations/_shared'
import { booksConfig, useBooks } from '@store/useOperations/useLibrary/useBooks'

export default function BooksOperationsPage() {
  const { data } = useBooks.list({})

  return <OperationsTablePage config={{ ...booksConfig, rows: data }} />
}
