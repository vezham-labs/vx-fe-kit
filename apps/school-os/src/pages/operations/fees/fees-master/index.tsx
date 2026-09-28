import {
  feesMasterConfig,
  useFeesMaster
} from '../../../../store/useOperations/useFees/useFeesMaster'
import OperationsTablePage from '../../_shared'

export default function FeesMasterOperationsPage() {
  const { data } = useFeesMaster.list({})

  return <OperationsTablePage config={{ ...feesMasterConfig, rows: data }} />
}
