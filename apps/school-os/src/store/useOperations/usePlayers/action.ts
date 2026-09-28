import { playersData } from './data'
import type { PlayersResponse, RQPlayers } from './types'

const Players = {
  list: async (_rq: RQPlayers): Promise<PlayersResponse> => {
    return Promise.resolve(playersData)
  }
}

export { Players }
