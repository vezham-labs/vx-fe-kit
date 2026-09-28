import {
  assignVehicleConfig,
  useAssign
} from '../../../../store/useOperations/useTransport/useAssign'
import OperationsTablePage from '../../_shared'

export default function AssignVehicleOperationsPage() {
  const { data } = useAssign.list({})

  return <OperationsTablePage config={{ ...assignVehicleConfig, rows: data }} />
}
