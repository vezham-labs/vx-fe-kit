import { classroomData } from './data'
import type { ClassroomResponse, RQClassroom } from './types'

const Classrooms = {
  list: async (_rq: RQClassroom): Promise<ClassroomResponse> => {
    return Promise.resolve(classroomData)
  }
}

export { Classrooms }
