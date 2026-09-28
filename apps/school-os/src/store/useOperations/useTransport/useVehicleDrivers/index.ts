import { useQuery } from '@tanstack/react-query'

import { VehicleDrivers } from './action'
import { vehicleDriversConfig, vehicleDriversData } from './data'
import type { RQVehicleDrivers } from './types'

export * from './data'
export * from './types'

export const CK_VEHICLE_DRIVERS = 'vehicle-drivers'

export const useVehicleDrivers = {
  list: (rq: RQVehicleDrivers = {}) =>
    useQuery({
      queryKey: [CK_VEHICLE_DRIVERS, rq],
      queryFn: () => VehicleDrivers.list(rq),
      initialData: vehicleDriversData
    })
}

export { vehicleDriversConfig }
