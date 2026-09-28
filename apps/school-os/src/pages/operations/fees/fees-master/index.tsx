import OperationsTablePage from '@pages/operations/_shared'
import {
  feesMasterConfig,
  useFeesMaster
} from '@store/useOperations/useFees/useFeesMaster'

export default function FeesMasterOperationsPage() {
  const { data } = useFeesMaster.list({})

  return <OperationsTablePage config={{ ...feesMasterConfig, rows: data }} />
}
