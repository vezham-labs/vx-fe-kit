import { useNavigate, useSearch } from '@tanstack/react-router'
import { useId, useState } from 'react'

import {
  AltArrowLeft,
  Bell,
  Settings,
  Sun,
  UserRounded
} from '@vezham/icons-react'
import {
  Avatar,
  Button,
  Drawer,
  Input,
  Label,
  ListBox,
  Select,
  Surface,
  Switch,
  TextField
} from '@vezham/react-v3'

import { AppIcon } from '../../components/app-icon'
import { TileContent } from '../../components/panel/footer/control-center'
import { AppearanceProvider } from '../../components/panel/footer/control-center/appearance'
import { resolveTiles } from '../../components/panel/footer/control-center/configured'
import { useTileEditor } from '../../components/panel/footer/control-center/editor'
import { PreviewProvider } from '../../components/panel/footer/control-center/preview'
import type { ControlCenterConfig } from '../../components/panel/footer/control-center/types'
import { useWidgetTiles } from '../../components/panel/footer/notification-center/widget-tiles'
import { ShortcutButton } from '../../components/shortcut-key'
import {
  useSidebarShortcut,
  useWorkspaceNavigation
} from '../../components/workspace-navigation'
import { useUser } from '../../store/users/useUserStore'
import type { SettingsSection } from './navigation'
import { TileGallery } from './tile-gallery'

const sections = [
  { title: 'General', icon: Settings, keywords: 'language' },
  {
    title: 'Appearance',
    icon: Sun,
    keywords: 'theme light dark system'
  },
  {
    title: 'Notifications',
    icon: Bell,
    keywords: 'sounds badges'
  },
  {
    title: 'Account',
    icon: UserRounded,
    keywords: 'profile name email'
  },
  {
    title: 'Edit Widgets',
    icon: Settings,
    keywords: 'notification center tiles'
  },
  { title: 'Edit Controls', icon: Settings, keywords: 'control center tiles' }
] as const

export const validateSearch = (
  search: Record<string, unknown>
): { section: SettingsSection } => ({
  section: sections.some(section => section.title === search.section)
    ? (search.section as SettingsSection)
    : 'General'
})

export const SettingsRoute = ({
  controlCenter
}: {
  controlCenter?: ControlCenterConfig
}) => {
  const navigate = useNavigate()
  const search = useSearch({ strict: false })
  const { section } = validateSearch(search)
  return (
    <SettingsPage
      section={section}
      onSectionChange={next =>
        navigate({ to: '/settings', search: { section: next } })
      }
      controlCenter={controlCenter}
      onBack={() => navigate({ to: '/' })}
    />
  )
}

export const SettingsPage = ({
  onBack,
  section = 'General',
  onSectionChange,
  controlCenter
}: {
  onBack?: () => void
  section?: SettingsSection
  onSectionChange?: (section: SettingsSection) => void
  controlCenter?: ControlCenterConfig
}) => {
  const [localActive, setActive] = useState<SettingsSection>(section)
  const active = onSectionChange ? section : localActive
  const widgets = useWidgetTiles()
  const controls = useTileEditor(
    controlCenter ? resolveTiles(controlCenter, () => undefined) : []
  )
  const [query, setQuery] = useState('')
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const sidebarId = useId()
  const { isNavigationCollapsed, toggleNavigation } = useWorkspaceNavigation()
  const toggleSidebar = () => {
    if (window.matchMedia('(min-width: 768px)').matches) toggleNavigation()
    else setIsDrawerOpen(open => !open)
  }
  useSidebarShortcut(
    toggleSidebar,
    active !== 'Edit Widgets' && active !== 'Edit Controls'
  )
  const [language, setLanguage] = useState(() =>
    typeof document === 'undefined'
      ? 'en'
      : document.documentElement.lang || 'en'
  )
  const { user, updateUser } = useUser()
  const visibleSections = sections.filter(section =>
    `${section.title} ${section.keywords}`
      .toLowerCase()
      .includes(query.toLowerCase().trim())
  )
  const openSection = (section: (typeof sections)[number]['title']) => {
    setActive(section)
    onSectionChange?.(section)
    setIsDrawerOpen(false)
  }
  const [name, setName] = useState(user?.firstName ?? '')
  const [lastName, setLastName] = useState(user?.lastName ?? '')
  const [email, setEmail] = useState(user?.email ?? '')
  const [saved, setSaved] = useState(false)
  const [mode, setMode] = useState(() =>
    typeof document === 'undefined'
      ? 'light'
      : (document.documentElement.getAttribute('data-theme-mode') ??
        (document.documentElement.classList.contains('dark')
          ? 'dark'
          : 'light'))
  )
  const [notifications, setNotifications] = useState(() => {
    const defaults = { sounds: true, badges: true }
    if (typeof window === 'undefined') return defaults
    try {
      const value = JSON.parse(
        localStorage.getItem('demo:notification-settings') ?? 'null'
      )
      if (
        value &&
        typeof value.sounds === 'boolean' &&
        typeof value.badges === 'boolean'
      ) {
        return {
          sounds: value.sounds as boolean,
          badges: value.badges as boolean
        }
      }
    } catch {
      // vx-bot/NOTE: Ignore invalid demo preferences and use the defaults.
    }
    return defaults
  })

  if (active === 'Edit Widgets') {
    return (
      <TileGallery
        key="widgets"
        title="Edit Widgets"
        kind="widgets"
        editor={widgets.editor}
        tiles={widgets.orderedTiles.map(tile => ({
          ...tile,
          shape: tile.size,
          category: `${tile.size[0].toUpperCase()}${tile.size.slice(1)}`
        }))}
        onDone={() => openSection('General')}
      />
    )
  }
  if (active === 'Edit Controls') {
    const categoryFor = (id: string) => {
      const type = controlCenter?.tiles.find(tile => tile.id === id)?.type ?? ''
      if (type.includes('appearance') || type.includes('theme'))
        return 'Appearance'
      if (
        [
          'preview-wifi',
          'preview-bluetooth',
          'preview-airdrop',
          'preview-mirroring'
        ].includes(type)
      )
        return 'Connectivity'
      if (type === 'preview-display') return 'Display & Brightness'
      if (type === 'preview-media' || type === 'preview-sound')
        return 'Sound & Media'
      return 'General'
    }
    return (
      <AppearanceProvider>
        <PreviewProvider enabled>
          <TileGallery
            key="controls"
            title="Edit Controls"
            kind="controls"
            editor={controls.editor}
            tiles={controls.orderedTiles.map(tile => ({
              id: tile.id,
              label:
                controls.editor.items.find(item => item.id === tile.id)
                  ?.label ?? tile.id,
              shape: tile.span,
              category: categoryFor(tile.id),
              preview: (
                <TileContent
                  entry={tile}
                  context={{}}
                  onOpen={() => undefined}
                />
              )
            }))}
            onDone={() => openSection('General')}
          />
        </PreviewProvider>
      </AppearanceProvider>
    )
  }

  const sidebar = (
    <div className="px-4 py-2">
      {onBack && (
        <Button
          variant="ghost"
          className="mb-4 w-full justify-start gap-3 px-3 text-sm"
          onPress={onBack}>
          <AltArrowLeft size={18} />
          Back to app
        </Button>
      )}
      <h1 className="mb-4 px-3 text-lg font-semibold">Settings</h1>
      <TextField
        aria-label="Search settings"
        value={query}
        onChange={setQuery}
        className="mx-3 mb-4">
        <Input
          placeholder="Search settings"
          type="search"
          variant="secondary"
        />
      </TextField>
      <Button
        variant="ghost"
        className="mb-4 h-auto w-full justify-start gap-3 rounded-lg px-3 py-2 text-left"
        onPress={() => openSection('Account')}
        aria-label="Account profile">
        <Avatar className="size-11 shrink-0">
          <Avatar.Image src={user?.avatar ?? undefined} />
          <Avatar.Fallback>
            {user?.firstName?.slice(0, 1) || 'U'}
          </Avatar.Fallback>
        </Avatar>
        <span className="min-w-0">
          <span className="block truncate font-semibold">
            {[user?.firstName, user?.lastName].filter(Boolean).join(' ') ||
              'Your account'}
          </span>
          <span className="text-muted block text-xs font-normal">
            Account settings
          </span>
        </span>
      </Button>
      <p className="text-muted mb-2 px-3 text-xs font-medium">App settings</p>
      <nav aria-label="Settings sections" className="space-y-1">
        {visibleSections.map(({ title, icon: Icon }) => (
          <Button
            key={title}
            variant="ghost"
            className={`h-auto min-h-0 w-full justify-start gap-3 rounded-full px-3 py-2 text-sm leading-5 ${active === title ? 'bg-surface-secondary text-foreground font-bold' : 'text-muted hover:bg-surface-secondary font-normal'}`}
            aria-current={active === title ? 'page' : undefined}
            onPress={() => openSection(title)}>
            <Icon size={18} className="shrink-0" aria-hidden="true" />
            {title}
          </Button>
        ))}
        {visibleSections.length === 0 && (
          <p role="status" className="text-muted p-2 text-sm">
            No settings found.
          </p>
        )}
      </nav>
    </div>
  )
  return (
    <div className="h-full min-h-0 w-full">
      <div className="bg-background flex h-full min-h-0 overflow-hidden">
        {!isNavigationCollapsed && (
          <aside
            id={sidebarId}
            className="hidden h-full w-56 shrink-0 overflow-y-auto md:ml-24 md:block">
            {sidebar}
          </aside>
        )}

        <section
          aria-label={`${active} settings`}
          className="h-full min-w-0 flex-1 overflow-y-auto p-5 md:px-10 md:py-8">
          <div className="mx-auto w-full max-w-3xl">
            <div className="mb-6 flex items-center gap-3">
              <ShortcutButton
                label={isNavigationCollapsed ? 'Show Sidebar' : 'Hide Sidebar'}
                shortcut="⌘ S"
                aria-keyshortcuts="Meta+S"
                aria-controls={sidebarId}
                aria-expanded={!isNavigationCollapsed}
                className="hidden md:inline-flex"
                onPress={toggleNavigation}>
                <AppIcon icon="vx:sidebar" size={18} aria-hidden="true" />
              </ShortcutButton>
              <Button
                variant="ghost"
                size="sm"
                isIconOnly
                aria-label="Show Sidebar"
                aria-expanded={isDrawerOpen}
                className="md:hidden"
                onPress={() => setIsDrawerOpen(true)}>
                <AppIcon icon="vx:sidebar" size={18} aria-hidden="true" />
              </Button>
              <h2 className="text-xl font-semibold">{active}</h2>
            </div>
            {active === 'Account' && (
              <form
                className="border-border bg-surface space-y-4 rounded-xl border p-5"
                onSubmit={event => {
                  event.preventDefault()
                  updateUser({ firstName: name, lastName, email })
                  setSaved(true)
                }}
                onChange={() => setSaved(false)}>
                <p className="text-muted text-sm">
                  Profile changes apply to this demo session.
                </p>
                <TextField
                  name="firstName"
                  value={name}
                  onChange={setName}
                  isRequired>
                  <Label>First name</Label>
                  <Input variant="secondary" />
                </TextField>
                <TextField
                  name="lastName"
                  value={lastName}
                  onChange={setLastName}>
                  <Label>Last name</Label>
                  <Input variant="secondary" />
                </TextField>
                <TextField
                  name="email"
                  type="email"
                  value={email}
                  onChange={setEmail}
                  isRequired>
                  <Label>Email</Label>
                  <Input variant="secondary" />
                </TextField>
                <Button type="submit">Save changes</Button>
                <p role="status" className="text-muted text-sm">
                  {saved ? 'Changes saved.' : ''}
                </p>
              </form>
            )}
            {active === 'Appearance' && (
              <div className="border-border bg-surface rounded-xl border p-5">
                <p className="mb-1 text-sm font-medium">Appearance</p>
                <p className="text-muted mb-5 text-xs">
                  Choose a light, dark, or automatic appearance.
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {['light', 'dark', 'auto'].map(value => (
                    <Button
                      key={value}
                      variant="ghost"
                      aria-pressed={mode === value}
                      className={`h-auto flex-col gap-2 rounded-lg p-2 ${mode === value ? 'ring-accent ring-2' : ''}`}
                      onPress={() => {
                        setMode(value)
                        document.documentElement.setAttribute(
                          'data-theme-mode',
                          value
                        )
                        document.documentElement.classList.toggle(
                          'dark',
                          value === 'dark' ||
                            (value === 'auto' &&
                              matchMedia('(prefers-color-scheme: dark)')
                                .matches)
                        )
                      }}>
                      <span
                        aria-hidden="true"
                        className={`border-border relative block h-16 w-full overflow-hidden rounded-md border ${value === 'dark' ? 'bg-foreground' : 'bg-surface-secondary'}`}>
                        <span className="bg-muted/30 absolute inset-y-0 left-0 w-1/3" />
                        <span
                          className={`absolute inset-y-3 right-2 left-[40%] rounded-sm ${value === 'dark' ? 'bg-background/30' : 'bg-surface'}`}
                        />
                        {value === 'auto' && (
                          <span className="bg-foreground/70 absolute inset-y-0 right-0 w-1/2" />
                        )}
                      </span>
                      <span className="text-xs capitalize">
                        {value === 'auto' ? 'System' : value}
                      </span>
                    </Button>
                  ))}
                </div>
              </div>
            )}
            {active === 'General' && (
              <Surface className="border-border flex flex-wrap items-center justify-between gap-4 rounded-xl border p-4 shadow-none">
                <div>
                  <p className="text-sm font-medium">Language</p>
                  <p className="text-muted mt-1 text-xs">
                    Language for the app interface
                  </p>
                </div>
                <Select
                  aria-label="Language"
                  className="w-40"
                  value={language}
                  onChange={value => {
                    if (typeof value === 'string') {
                      setLanguage(value)
                      document.documentElement.lang = value
                    }
                  }}
                  variant="secondary">
                  <Select.Trigger>
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      {[
                        { id: 'en', label: 'English' },
                        { id: 'zh', label: '中文' }
                      ].map(option => (
                        <ListBox.Item
                          key={option.id}
                          id={option.id}
                          textValue={option.label}>
                          {option.label}
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                      ))}
                    </ListBox>
                  </Select.Popover>
                </Select>
              </Surface>
            )}
            {active === 'Notifications' && (
              <div className="space-y-4">
                <p className="text-muted text-sm">
                  Demo preferences are saved on this device. Notification
                  delivery is simulated.
                </p>
                {(['sounds', 'badges'] as const).map(key => (
                  <Switch
                    key={key}
                    className="border-border bg-surface w-full rounded-xl border p-4"
                    isSelected={notifications[key]}
                    onChange={selected => {
                      const next = { ...notifications, [key]: selected }
                      setNotifications(next)
                      localStorage.setItem(
                        'demo:notification-settings',
                        JSON.stringify(next)
                      )
                    }}>
                    <Switch.Content className="flex w-full flex-row-reverse justify-between gap-3 text-sm">
                      <Switch.Control>
                        <Switch.Thumb />
                      </Switch.Control>
                      {key === 'sounds'
                        ? 'Notification sounds'
                        : 'Notification badges'}
                    </Switch.Content>
                  </Switch>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
      <Drawer.Backdrop isOpen={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <Drawer.Content placement="left">
          <Drawer.Dialog className="bg-background w-[min(20rem,calc(100vw-2rem))]">
            <Drawer.Header>
              <Drawer.Heading>Settings</Drawer.Heading>
              <Drawer.CloseTrigger aria-label="Hide Sidebar" />
            </Drawer.Header>
            <Drawer.Body className="p-0">{sidebar}</Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </div>
  )
}

export { SettingsNavigationContext } from './navigation'
export type { SettingsSection } from './navigation'
