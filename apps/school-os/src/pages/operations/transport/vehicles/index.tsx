import {
  useVehicles,
  vehiclesConfig
} from '../../../../store/useOperations/useTransport/useVehicles'
import OperationsTablePage from '../../_shared'

export default function VehiclesOperationsPage() {
  const { data } = useVehicles.list({})

  return <OperationsTablePage config={{ ...vehiclesConfig, rows: data }} />
}
