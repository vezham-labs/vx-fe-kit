import { allClassesData } from './data'
import type { AllClassesResponse, RQAllClasses } from './types'

const AllClasses = {
  list: async (_rq: RQAllClasses): Promise<AllClassesResponse> => {
    return Promise.resolve(allClassesData)
  }
}

export { AllClasses }
