import { classRoutineData } from './data'
import type { ClassRoutineResponse, RQClassRoutine } from './types'

const ClassRoutine = {
  list: async (_rq: RQClassRoutine): Promise<ClassRoutineResponse> => {
    return Promise.resolve(classRoutineData)
  }
}

export { ClassRoutine }
