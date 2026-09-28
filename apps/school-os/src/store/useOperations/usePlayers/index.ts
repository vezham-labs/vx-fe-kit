import { useQuery } from '@tanstack/react-query'

import { Players } from './action'
import { playersData } from './data'
import type { RQPlayers } from './types'

export * from './data'
export * from './types'

export const CK_PLAYERS = 'players'

export const usePlayers = {
  list: (rq: RQPlayers = {}) =>
    useQuery({
      queryKey: [CK_PLAYERS, rq],
      queryFn: () => Players.list(rq),
      initialData: playersData
    })
}
