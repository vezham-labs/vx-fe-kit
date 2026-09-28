import Account from '@components/panel/footer/preferences/user-settings/account'
import ContentSocial from '@components/panel/footer/preferences/user-settings/content-social'
import Privacy from '@components/panel/footer/preferences/user-settings/data-privacy'
import FamilyCenter from '@components/panel/footer/preferences/user-settings/family-center'
import Profiles from '@components/panel/footer/preferences/user-settings/profiles'

export type SidebarItem = {
  id: string
  label: string
  icon?: string
  href?: string
  component?: React.ComponentType
  children?: SidebarItem[]
}

export type SidebarSection = {
  title: string
  items: SidebarItem[]
}

export type User = {
  name?: string
  avatarUrl?: string
}

export const settingsSidebar: SidebarSection[] = [
  {
    title: '',
    items: [
      {
        id: 'profiles',
        label: 'Mia Chan',
        component: Profiles
      }
    ]
  },

  {
    title: 'USER SETTINGS',
    items: [
      {
        id: 'account',
        label: 'My Account',
        icon: 'solar:user-linear',
        component: Account
      },
      {
        id: 'content-social',
        label: 'Content & Social',
        icon: 'solar:share-linear',
        component: ContentSocial
      },
      {
        id: 'privacy',
        label: 'Data & Privacy',
        icon: 'solar:shield-check-linear',
        component: Privacy,
        children: [
          {
            id: 'privacy-data',
            label: 'How Discord Uses Your Data'
          },
          {
            id: 'privacy-request',
            label: 'Request your Data'
          }
        ]
      },
      {
        id: 'family-center',
        label: 'Family Center',
        icon: 'solar:devices-linear',
        component: FamilyCenter
      },
      {
        id: 'authorized-apps',
        label: 'Authorized Apps',
        icon: 'solar:devices-linear'
      },
      {
        id: 'devices',
        label: 'Devices',
        icon: 'solar:devices-linear'
      },
      {
        id: 'connections',
        label: 'Connections',
        icon: 'solar:devices-linear'
      },
      {
        id: 'notifications',
        label: 'Notifications',
        icon: 'solar:devices-linear',
        children: [
          {
            id: 'notifications-overview',
            label: 'Overview'
          },
          {
            id: 'notifications-sounds',
            label: 'Sounds'
          },
          {
            id: 'notifications-badges',
            label: 'Badges'
          },
          {
            id: 'notifications-email',
            label: 'Email'
          },
          {
            id: 'notifications-advanced',
            label: 'Advanced'
          }
        ]
      }
    ]
  },

  {
    title: 'BILLING SETTINGS',
    items: [
      {
        id: 'nitro',
        label: 'Nitro',
        icon: 'solar:star-linear'
      },
      {
        id: 'server-boost',
        label: 'Server Boost',
        icon: 'solar:card-linear'
      },
      {
        id: 'subscriptions',
        label: 'Subscriptions',
        icon: 'solar:card-linear'
      },
      {
        id: 'gift-inventory',
        label: 'Gift Inventory',
        icon: 'solar:card-linear'
      },
      {
        id: 'billing',
        label: 'Billing',
        icon: 'solar:wallet-linear',
        children: [
          {
            id: 'billing-payment-methods',
            label: 'Payment Methods'
          },
          {
            id: 'billing-transaction-history',
            label: 'Transaction History'
          }
        ]
      }
    ]
  },

  {
    title: 'APP SETTINGS',
    items: [
      {
        id: 'appearance',
        label: 'Appearance',
        icon: 'solar:palette-linear',
        children: [
          {
            id: 'appearance-theme',
            label: 'Theme'
          },
          {
            id: 'appearance-in-appicon',
            label: 'In-app Icon'
          },
          {
            id: 'appearance-ui-density',
            label: 'UI Density'
          },
          {
            id: 'appearance-message-spacing',
            label: 'Message Spacing'
          },
          {
            id: 'appearance-scaling',
            label: 'Scaling'
          }
        ]
      },
      {
        id: 'accessibility',
        label: 'Accessibility',
        icon: 'solar:videocamera-linear',
        children: [
          {
            id: 'accessibility-colors',
            label: 'Colors & Saturation'
          },
          {
            id: 'accessibility-profile',
            label: 'Profile Colors'
          },
          {
            id: 'accessibility-contrast',
            label: 'Contrast'
          },
          {
            id: 'accessibility-reducedmotion',
            label: 'Reduced Motion'
          },
          {
            id: 'accessibility-chatinput',
            label: 'Chat Input'
          },
          {
            id: 'accessbility-textspeech',
            label: 'Text Speech'
          }
        ]
      },
      {
        id: 'voice-video',
        label: 'Voice & Video',
        icon: 'solar:videocamera-linear',
        children: [
          {
            id: 'voicevideo-camera',
            label: 'Camera'
          },
          {
            id: 'voicevideo-streaming',
            label: 'Streaming'
          },
          {
            id: 'voicevideo-sounds',
            label: 'Sounds'
          },
          {
            id: 'voicevideo-soundboard',
            label: 'Soundboard'
          },
          {
            id: 'voicevideo-advanced',
            label: 'Advanced'
          }
        ]
      },
      {
        id: 'chat',
        label: 'Chat',
        icon: 'solar:chat-round-dots-linear',
        children: [
          {
            id: 'chat-media',
            label: 'Media'
          },
          {
            id: 'chat-embeds',
            label: 'Embeds and Link Previews'
          },
          {
            id: 'chat-emoji',
            label: 'Emoji'
          },
          {
            id: 'chat-stickers',
            label: 'Stickers'
          },
          {
            id: 'chat-textbox',
            label: 'Text box'
          },
          {
            id: 'chat-threads',
            label: 'Threads'
          }
        ]
      },
      {
        id: 'keybinds',
        label: 'Keybinds',
        icon: 'solar:settings-linear'
      },
      {
        id: 'language-time',
        label: 'Language & Time',
        icon: 'solar:settings-linear'
      },
      {
        id: 'streamer-mode',
        label: 'Streamer Mode',
        icon: 'solar:settings-linear'
      },
      {
        id: 'advanced',
        label: '... Advanced',
        icon: 'solar:settings-linear'
      }
    ]
  },

  {
    title: 'ACTIVITY SETTINGS',
    items: [
      {
        id: 'activity',
        label: 'Activity Privacy',
        icon: 'solar:palette-linear',
        children: [
          {
            id: 'activity-sharing',
            label: 'Activity Sharing'
          },
          {
            id: 'activity-servers',
            label: 'Servers I Share With'
          },
          {
            id: 'activity-games',
            label: 'Who Can Join My Games'
          }
        ]
      }
    ]
  },

  {
    title: '',
    items: [
      {
        id: 'logout',
        label: 'Log Out',
        icon: 'solar:palette-linear'
      }
    ]
  }
]
