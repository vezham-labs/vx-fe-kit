import {
  feesGroupConfig,
  useFeesGroup
} from '../../../../store/useOperations/useFees/useFeesGroup'
import OperationsTablePage from '../../_shared'

export default function FeesGroupOperationsPage() {
  const { data } = useFeesGroup.list({})

  return <OperationsTablePage config={{ ...feesGroupConfig, rows: data }} />
}
