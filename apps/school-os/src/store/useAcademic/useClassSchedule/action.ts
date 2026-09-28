import { classScheduleData } from './data'
import type { ClassScheduleResponse, RQClassSchedule } from './types'

const ClassSchedule = {
  list: async (_rq: RQClassSchedule): Promise<ClassScheduleResponse> => {
    return Promise.resolve(classScheduleData)
  }
}

export { ClassSchedule }
