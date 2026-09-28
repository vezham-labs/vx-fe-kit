import { homeworkData } from './data'
import type { HomeworkResponse, RQHomework } from './types'

const Homeworks = {
  list: async (_rq: RQHomework): Promise<HomeworkResponse> => {
    return Promise.resolve(homeworkData)
  }
}

export { Homeworks }
