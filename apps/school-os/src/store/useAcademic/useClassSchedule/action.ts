import { classScheduleData } from './data'
import type { ClassScheduleResponse, RQClassSchedule } from './types'

const ClassSchedule = {
  list: async (_rq: RQClassSchedule): Promise<ClassScheduleResponse> => {
    void _rq

    return Promise.resolve(classScheduleData)
  }
}

export { ClassSchedule }
