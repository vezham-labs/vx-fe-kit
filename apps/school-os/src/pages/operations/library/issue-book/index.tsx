import OperationsTablePage from '@pages/operations/_shared'
import {
  issueBookConfig,
  useIssueBooks
} from '@store/useOperations/useLibrary/useIssueBooks'

export default function IssueBookOperationsPage() {
  const { data } = useIssueBooks.list({})

  return <OperationsTablePage config={{ ...issueBookConfig, rows: data }} />
}
