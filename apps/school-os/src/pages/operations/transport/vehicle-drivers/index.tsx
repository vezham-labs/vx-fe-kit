import {
  useVehicleDrivers,
  vehicleDriversConfig
} from '../../../../store/useOperations/useTransport/useVehicleDrivers'
import OperationsTablePage from '../../_shared'

export default function VehicleDriversOperationsPage() {
  const { data } = useVehicleDrivers.list({})

  return (
    <OperationsTablePage config={{ ...vehicleDriversConfig, rows: data }} />
  )
}
