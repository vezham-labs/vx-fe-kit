import type { Email } from './types'

export const emails: Email[] = [
  {
    id: 1,
    sender: 'Alice Johnson',
    subject: 'Team Meeting Notes',
    preview: "Here are the key points from today's meeting...",
    time: '11:30 AM',
    unread: true,
    avatar: 'https://i.pravatar.cc/150?u=alice',
    hasAttachment: true
  },
  {
    id: 2,
    sender: 'Product Updates',
    subject: 'New Features Released',
    preview: "We're excited to announce our latest features...",
    time: '10:15 AM',
    unread: true,
    avatar: 'https://i.pravatar.cc/150?u=product',
    hasAttachment: false
  },
  {
    id: 3,
    sender: 'Bob Smith',
    subject: 'Project Timeline',
    preview: 'Please review the updated project timeline...',
    time: 'Yesterday',
    unread: false,
    avatar: 'https://i.pravatar.cc/150?u=bob',
    hasAttachment: true
  },
  {
    id: 4,
    sender: 'Newsletter',
    subject: 'Weekly Tech Digest',
    preview: 'Top stories in tech this week: AI advances...',
    time: 'Yesterday',
    unread: false,
    avatar: 'https://i.pravatar.cc/150?u=news',
    hasAttachment: false
  },
  {
    id: 5,
    sender: 'Calendar',
    subject: 'Event Reminder',
    preview: 'Your meeting with the design team is in 1 hour',
    time: '2 days ago',
    unread: false,
    avatar: 'https://i.pravatar.cc/150?u=calendar',
    hasAttachment: false
  }
]

export const listItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1
    }
  })
}
