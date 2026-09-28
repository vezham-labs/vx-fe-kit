import { type FolderFormState } from './types'

const DEFAULT_FOLDER_COLOR = '#007aff'
const DEFAULT_FOLDER_ICON = 'solar:list-bold'
const DEFAULT_FOLDER_EMOJI = '😀'

const folderColors = [
  '#ff3b30',
  '#ff9500',
  '#ffcc00',
  '#34c759',
  '#32ade6',
  '#007aff',
  '#5856d6',
  '#ff2d55',
  '#af52de',
  '#8e7d61',
  '#5d6b78',
  '#d7a59d'
]

const folderIconOptions = [
  'solar:list-bold',
  'solar:bookmark-bold',
  'solar:key-bold',
  'solar:gift-bold',
  'solar:cup-star-bold',
  'solar:square-academic-cap-bold',
  'solar:backpack-bold',
  'solar:notebook-bookmark-bold',
  'solar:document-bold',
  'solar:book-bookmark-bold',
  'solar:card-bold',
  'solar:cart-large-bold',
  'solar:home-bold',
  'solar:buildings-3-bold',
  'solar:banknote-bold',
  'solar:gamepad-bold',
  'solar:headphones-round-bold',
  'solar:leaf-bold',
  'solar:users-group-rounded-bold',
  'solar:heart-bold',
  'solar:star-bold',
  'solar:moon-bold',
  'solar:sun-2-bold',
  'solar:flag-bold'
]

const emojiOptions = [
  '😀',
  '😐',
  '❤️',
  '😂',
  '😍',
  '😌',
  '👌',
  '😊',
  '😚',
  '😭',
  '😩',
  '💕',
  '😔',
  '😉',
  '😁',
  '😳',
  '👍',
  '✌️',
  '😏',
  '😴',
  '🙋',
  '🙈',
  '😎',
  '🎵',
  '👀',
  '😪',
  '😜',
  '😋',
  '👏',
  '💡',
  '📚',
  '🎓',
  '🏫',
  '📝',
  '⭐',
  '🏁'
].map(emoji => ({ emoji, id: emoji, label: emoji }))

const createDefaultFolderForm = (): FolderFormState => ({
  name: '',
  color: DEFAULT_FOLDER_COLOR,
  visualType: 'icon',
  emoji: DEFAULT_FOLDER_EMOJI,
  icon: DEFAULT_FOLDER_ICON
})

export {
  DEFAULT_FOLDER_COLOR,
  DEFAULT_FOLDER_EMOJI,
  DEFAULT_FOLDER_ICON,
  createDefaultFolderForm,
  emojiOptions,
  folderColors,
  folderIconOptions
}
