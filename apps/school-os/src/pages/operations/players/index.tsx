import OperationsTablePage from '@pages/operations/_shared'
import { usePlayers } from '@store/useOperations/usePlayers'

import { playersConfig } from './data'

export default function PlayersOperationsPage() {
  const { data } = usePlayers.list({})

  return <OperationsTablePage config={{ ...playersConfig, rows: data }} />
}
