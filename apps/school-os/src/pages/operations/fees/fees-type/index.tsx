import {
  feesTypeConfig,
  useFeesType
} from '../../../../store/useOperations/useFees/useFeesType'
import OperationsTablePage from '../../_shared'

export default function FeesTypeOperationsPage() {
  const { data } = useFeesType.list({})

  return <OperationsTablePage config={{ ...feesTypeConfig, rows: data }} />
}
