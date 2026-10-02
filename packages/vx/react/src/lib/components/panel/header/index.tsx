import { useCallback, useState } from 'react'

import {
  AltArrowDown as AltArrowDownIcon,
  Magnifier as MagnifierIcon,
  SidebarMinimalistic as SidebarMinimalisticIcon
} from '@vezham/icons-react'
import {
  Avatar,
  Button,
  Dropdown,
  Label,
  Separator,
  Surface,
  Tooltip
} from '@vezham/react-v3'

import { AppIcon } from '../../app-icon'
import { useAppMenu } from '../../app-menu'
import { useCommand } from '../../command'
import { ShortcutKey, ShortcutTooltipLabel } from '../../shortcut-key'
import { BookmarksTrigger } from './bookmarks'
import { DiscTrigger } from './disc'
import { HeaderActionsProps } from './types'

const Header = ({
  users,
  showSearch = false,
  showBookamarks = false,
  showDisk = false,
  onAvatarClick,
  onSearchClick,
  isDockHidden = false,
  onToggleDock,
  extraActions,
  className,
  compact = false,
  hideSeparator = false
}: HeaderActionsProps) => {
  const [open, setOpen] = useState(false)

  const { openCommand } = useCommand()

  const handleSearch = useCallback(() => {
    onSearchClick?.()
    openCommand()
  }, [onSearchClick, openCommand])

  const handleMenuSearch = useCallback(() => {
    handleSearch()
    setOpen(false)
  }, [handleSearch])

  if (compact) {
    return (
      <Surface
        variant="transparent"
        className={`flex items-center ${className ?? ''}`}
        data-vx="header">
        <div
          role="group"
          aria-label="Application controls"
          data-hovered={open || undefined}
          className="button button--ghost flex h-12 items-center gap-2 px-2 transition-transform duration-300">
          <button
            type="button"
            aria-label="Application"
            className="flex h-full items-center bg-transparent p-0"
            onClick={() => onAvatarClick?.(users)}>
            <HeaderAvatar user={users} />
          </button>

          <Dropdown isOpen={open} onOpenChange={setOpen}>
            <Button
              variant="ghost"
              isIconOnly
              aria-label="Open application menu"
              className="h-full min-w-0 p-0">
              <span className="sr-only">Application menu</span>
              <AltArrowDownIcon
                size={12}
                className="text-muted-foreground"
                aria-hidden="true"
              />
            </Button>

            <HeaderApplicationMenuContent
              onClose={() => setOpen(false)}
              onSearch={handleMenuSearch}
              isDockHidden={isDockHidden}
              onToggleDock={onToggleDock}
            />
          </Dropdown>
        </div>

        <Tooltip delay={0}>
          <Tooltip.Trigger>
            <Button
              aria-label={isDockHidden ? 'Show Dock' : 'Hide Dock'}
              aria-keyshortcuts="Meta+S"
              isIconOnly
              size="sm"
              variant="ghost"
              className="text-muted hover:text-foreground"
              onPress={onToggleDock}>
              <SidebarMinimalisticIcon
                size={16}
                className="size-4"
                aria-hidden="true"
              />
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content placement="right">
            <ShortcutTooltipLabel
              label={isDockHidden ? 'Show Dock' : 'Hide Dock'}
              shortcut="⌘ S"
            />
          </Tooltip.Content>
        </Tooltip>

        <Tooltip delay={0}>
          <Tooltip.Trigger>
            <Button
              aria-label="Open command palette"
              isIconOnly
              size="sm"
              variant="ghost"
              className="text-muted hover:text-foreground"
              onPress={handleSearch}>
              <MagnifierIcon size={16} className="size-4" aria-hidden="true" />
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content placement="right">
            <ShortcutTooltipLabel label="Search" shortcut="Mod K" />
          </Tooltip.Content>
        </Tooltip>
      </Surface>
    )
  }

  return (
    <>
      <Surface
        variant="transparent"
        className={`flex flex-row items-center gap-3 md:flex-col md:gap-6 ${className ?? ''}`}
        data-vx="header">
        <Dropdown isOpen={open} onOpenChange={setOpen}>
          <Button
            variant="ghost"
            className="flex h-12 items-center gap-2 px-2 transition-transform duration-300"
            aria-label="Open application menu"
            onPress={() => onAvatarClick?.(users)}>
            <HeaderAvatar user={users} />
            <span className="sr-only">Application menu</span>
            <AltArrowDownIcon
              size={12}
              className="text-muted-foreground"
              aria-hidden="true"
            />
          </Button>

          <HeaderApplicationMenuContent
            onClose={() => setOpen(false)}
            onSearch={handleMenuSearch}
            isDockHidden={isDockHidden}
            onToggleDock={onToggleDock}
          />
        </Dropdown>

        {showSearch && (
          <Tooltip delay={0}>
            <Tooltip.Trigger className="mt-2 md:mt-0">
              <button
                type="button"
                aria-label="Open command palette"
                className="inline-flex bg-transparent p-0"
                onClick={handleSearch}>
                <MagnifierIcon
                  className="text-muted cursor-pointer"
                  size={24}
                  aria-hidden="true"
                />
              </button>
            </Tooltip.Trigger>

            <Tooltip.Content placement="right">
              <ShortcutTooltipLabel label="Search" shortcut="Mod K" />
            </Tooltip.Content>
          </Tooltip>
        )}
        {showBookamarks && <BookmarksTrigger />}
        {showDisk && <DiscTrigger />}
        {extraActions}
      </Surface>

      {!hideSeparator && <Separator className="hidden md:block" />}
    </>
  )
}

const HeaderAvatar = ({ user }: { user: HeaderActionsProps['users'] }) => (
  <Avatar className="h-6 w-6">
    {user.avatar && <Avatar.Image src={user.avatar} alt={user.name} />}
    <Avatar.Fallback>{user.name?.[0]?.toUpperCase()}</Avatar.Fallback>
  </Avatar>
)

const HeaderApplicationMenuContent = ({
  onClose,
  onSearch,
  isDockHidden,
  onToggleDock
}: {
  onClose: () => void
  onSearch: () => void
  isDockHidden: boolean
  onToggleDock?: () => void
}) => {
  const appMenu = useAppMenu()
  return (
    <Dropdown.Popover>
      <Dropdown.Menu aria-label="Application menu">
        <Dropdown.Item id="home" textValue="Back to home" onPress={onClose}>
          <Label>Back to home</Label>
        </Dropdown.Item>
        {onToggleDock && (
          <Dropdown.Item
            id="toggle-dock"
            textValue={isDockHidden ? 'Show Dock' : 'Hide Dock'}
            aria-keyshortcuts="Meta+S"
            onPress={() => {
              onClose()
              onToggleDock()
            }}>
            <SidebarMinimalisticIcon size={18} aria-hidden="true" />
            <Label>{isDockHidden ? 'Show Dock' : 'Hide Dock'}</Label>
            <ShortcutKey className="ms-auto" shortcut="⌘ S" />
          </Dropdown.Item>
        )}
        <Separator />
        <Dropdown.Item
          id="search"
          textValue="Search"
          aria-label="Open command palette"
          onPress={onSearch}>
          <AppIcon icon="vx:search" size={18} aria-hidden="true" />
          <Label>Search</Label>
          <ShortcutKey className="ms-auto" shortcut="Mod K" />
        </Dropdown.Item>
        <Separator />
        {appMenu?.items.map(menu => (
          <Dropdown.SubmenuTrigger key={menu.key}>
            <Dropdown.Item id={menu.key} textValue={menu.label}>
              {menu.icon && (
                <AppIcon icon={menu.icon} size={18} aria-hidden="true" />
              )}
              <Label>{menu.label}</Label>
              <Dropdown.SubmenuIndicator />
            </Dropdown.Item>
            <Dropdown.Popover placement="right top">
              <Dropdown.Menu aria-label={menu.label}>
                {menu.groups.flatMap((group, index) => [
                  ...(index
                    ? [<Separator key={`${menu.key}-separator-${index}`} />]
                    : []),
                  ...group.map(action => (
                    <Dropdown.Item
                      key={action.key}
                      id={action.key}
                      textValue={action.label}
                      onPress={() => {
                        onClose()
                        appMenu.onAction(action)
                      }}>
                      {action.icon && (
                        <AppIcon
                          icon={action.icon}
                          size={18}
                          aria-hidden="true"
                        />
                      )}
                      <Label>{action.label}</Label>
                      {action.shortcut && (
                        <ShortcutKey
                          className="ms-auto"
                          shortcut={action.shortcut}
                        />
                      )}
                    </Dropdown.Item>
                  ))
                ])}
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown.SubmenuTrigger>
        ))}
      </Dropdown.Menu>
    </Dropdown.Popover>
  )
}

export { Header }
