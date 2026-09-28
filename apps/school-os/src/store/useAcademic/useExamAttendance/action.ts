import { initialRows as examAttendanceData } from './data'
import type { ExamAttendanceResponse, RQExamAttendance } from './types'

const ExamAttendances = {
  list: async (_rq: RQExamAttendance): Promise<ExamAttendanceResponse> => {
    return Promise.resolve(examAttendanceData)
  }
}

export { ExamAttendances }
