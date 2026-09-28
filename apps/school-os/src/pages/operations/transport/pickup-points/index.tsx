import OperationsTablePage from '@pages/operations/_shared'
import {
  pickupPointsConfig,
  usePickupPoints
} from '@store/useOperations/useTransport/usePickupPoints'

export default function PickupPointsOperationsPage() {
  const { data } = usePickupPoints.list({})

  return <OperationsTablePage config={{ ...pickupPointsConfig, rows: data }} />
}
