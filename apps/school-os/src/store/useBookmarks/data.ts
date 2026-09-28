import type { BookmarkItem, BookmarksResponse, FavoriteItem } from './types'

export const sampleFavorites: FavoriteItem[] = [
  {
    id: '1',
    name: 'HeroUI v3',
    url: 'https://v3.heroui.com',
    backgroundImage:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/robot1.jpeg'
  },
  {
    id: '2',
    name: 'Tailwind CSS',
    url: 'https://tailwindcss.com',
    backgroundImage:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/avocado.jpeg'
  },
  {
    id: '3',
    name: 'Miro Boards',
    url: 'https://miro.com',
    backgroundImage:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/oranges.jpeg'
  },
  {
    id: '4',
    name: 'Figma',
    url: 'https://figma.com',
    backgroundImage:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/neo1.jpeg'
  },
  {
    id: '5',
    name: 'GitHub',
    url: 'https://github.com',
    avatar:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg'
  },
  {
    id: '6',
    name: 'Gemini',
    url: 'https://gemini.google.com',
    avatar:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg'
  },
  {
    id: '7',
    name: 'Vezham School',
    url: 'http://school.vezham.local:3001',
    avatar:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg'
  },
  {
    id: '8',
    name: 'HeroUI Pro',
    url: 'https://heroui.pro',
    avatar:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/red.jpg'
  }
]

export const sampleBookmarks: BookmarkItem[] = [
  {
    id: 'b1',
    name: 'HeroUI v3 Docs',
    url: 'https://v3.heroui.com/docs',
    avatar:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg',
    folder: 'Development'
  },
  {
    id: 'b2',
    name: 'Tailwind Installation',
    url: 'https://tailwindcss.com/docs/installation',
    avatar:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg',
    folder: 'Development'
  },
  {
    id: 'b3',
    name: 'Miro Demo Team',
    url: 'https://miro.com/app/board/',
    avatar:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg',
    folder: 'Design'
  },
  {
    id: 'b4',
    name: 'Figma Design System Figma Design System Figma Design System',
    url: 'https://figma.com/design/7otXAQPcV',
    avatar:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg',
    folder: 'Design'
  },
  {
    id: 'b5',
    name: 'Vezham School Portal',
    url: 'http://school.vezham.local:3001',
    avatar:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/red.jpg',
    folder: 'Education'
  },
  {
    id: 'b6',
    name: 'Karthik Stay',
    url: '#',
    avatar:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/black.jpg'
  },
  {
    id: 'b4',
    name: 'Figma Design System',
    url: 'https://figma.com/design/7otXAQPcV',
    avatar:
      'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg',
    folder: 'Design'
  }
]

export const bookmarksData: BookmarksResponse = {
  favorites: sampleFavorites,
  bookmarks: sampleBookmarks
}
