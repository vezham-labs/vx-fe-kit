import OperationsTablePage from '@pages/operations/_shared'
import {
  feesTypeConfig,
  useFeesType
} from '@store/useOperations/useFees/useFeesType'

export default function FeesTypeOperationsPage() {
  const { data } = useFeesType.list({})

  return <OperationsTablePage config={{ ...feesTypeConfig, rows: data }} />
}
