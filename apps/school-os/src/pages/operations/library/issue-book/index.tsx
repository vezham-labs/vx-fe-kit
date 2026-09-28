import {
  issueBookConfig,
  useIssueBooks
} from '../../../../store/useOperations/useLibrary/useIssueBooks'
import OperationsTablePage from '../../_shared'

export default function IssueBookOperationsPage() {
  const { data } = useIssueBooks.list({})

  return <OperationsTablePage config={{ ...issueBookConfig, rows: data }} />
}
