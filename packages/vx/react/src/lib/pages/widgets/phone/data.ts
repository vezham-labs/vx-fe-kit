import { Call } from './types'

export const recentCalls: Call[] = [
  {
    name: 'John Doe',
    time: '12:30 PM',
    type: 'incoming',
    avatar: 'https://i.pravatar.cc/150?u=john'
  },
  {
    name: 'Jane Smith',
    time: 'Yesterday',
    type: 'outgoing',
    avatar: 'https://i.pravatar.cc/150?u=jane'
  },
  {
    name: 'Mike Johnson',
    time: 'Yesterday',
    type: 'missed',
    avatar: 'https://i.pravatar.cc/150?u=mike'
  },
  {
    name: 'Sarah Wilson',
    time: '2 days ago',
    type: 'incoming',
    avatar: 'https://i.pravatar.cc/150?u=sarah'
  }
]
