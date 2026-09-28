import { subjectData } from './data'
import type { RQSubject, SubjectResponse } from './types'

const Subjects = {
  list: async (_rq: RQSubject): Promise<SubjectResponse> => {
    return Promise.resolve(subjectData)
  }
}

export { Subjects }
