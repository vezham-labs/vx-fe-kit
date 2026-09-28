import { vehicleDriversData } from './data'
import type { RQVehicleDrivers, VehicleDriversResponse } from './types'

const VehicleDrivers = {
  list: async (_rq: RQVehicleDrivers): Promise<VehicleDriversResponse> => {
    return Promise.resolve(vehicleDriversData)
  }
}

export { VehicleDrivers }
