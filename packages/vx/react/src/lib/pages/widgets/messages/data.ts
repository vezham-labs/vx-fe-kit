import type { Message } from './types'

export const messages: Message[] = [
  {
    id: 1,
    name: 'John Doe',
    message: 'Hey, how are you?',
    time: '12:30 PM',
    unread: true,
    avatar: 'https://i.pravatar.cc/150?u=john'
  },
  {
    id: 2,
    name: 'Jane Smith',
    message: "Don't forget about tomorrow's meeting!",
    time: '11:20 AM',
    unread: false,
    avatar: 'https://i.pravatar.cc/150?u=jane'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    message: 'Thanks for your help!',
    time: 'Yesterday',
    unread: false,
    avatar: 'https://i.pravatar.cc/150?u=mike'
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    message: 'The documents are ready',
    time: 'Yesterday',
    unread: true,
    avatar: 'https://i.pravatar.cc/150?u=sarah'
  }
]
