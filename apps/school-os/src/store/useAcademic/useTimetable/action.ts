import { timetableEvents } from './data'
import type { RQTimetable, TimetableResponse } from './types'

const Timetables = {
  list: async (_rq: RQTimetable): Promise<TimetableResponse> => {
    return Promise.resolve(timetableEvents)
  }
}

export { Timetables }
