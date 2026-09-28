import OperationsTablePage from '@pages/operations/_shared'
import {
  useVehicleDrivers,
  vehicleDriversConfig
} from '@store/useOperations/useTransport/useVehicleDrivers'

export default function VehicleDriversOperationsPage() {
  const { data } = useVehicleDrivers.list({})

  return (
    <OperationsTablePage config={{ ...vehicleDriversConfig, rows: data }} />
  )
}
