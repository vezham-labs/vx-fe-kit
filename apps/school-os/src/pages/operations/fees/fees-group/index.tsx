import OperationsTablePage from '@pages/operations/_shared'
import {
  feesGroupConfig,
  useFeesGroup
} from '@store/useOperations/useFees/useFeesGroup'

export default function FeesGroupOperationsPage() {
  const { data } = useFeesGroup.list({})

  return <OperationsTablePage config={{ ...feesGroupConfig, rows: data }} />
}
