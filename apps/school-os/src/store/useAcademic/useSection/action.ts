import { sectionData } from './data'
import type { RQSection, SectionResponse } from './types'

const Sections = {
  list: async (_rq: RQSection): Promise<SectionResponse> => {
    return Promise.resolve(sectionData)
  }
}

export { Sections }
