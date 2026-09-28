import { useSports } from '../../../store/useOperations/useSports'
import OperationsTablePage from '../_shared'
import { sportsConfig } from './data'

export default function SportsOperationsPage() {
  const { data } = useSports.list({})

  return <OperationsTablePage config={{ ...sportsConfig, rows: data }} />
}
