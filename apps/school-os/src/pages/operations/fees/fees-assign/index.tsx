import {
  feesAssignConfig,
  useFeesAssign
} from '../../../../store/useOperations/useFees/useFeesAssign'
import OperationsTablePage from '../../_shared'

export default function FeesAssignOperationsPage() {
  const { data } = useFeesAssign.list({})

  return <OperationsTablePage config={{ ...feesAssignConfig, rows: data }} />
}
