import { usePlayers } from '../../../store/useOperations/usePlayers'
import OperationsTablePage from '../_shared'
import { playersConfig } from './data'

export default function PlayersOperationsPage() {
  const { data } = usePlayers.list({})

  return <OperationsTablePage config={{ ...playersConfig, rows: data }} />
}
