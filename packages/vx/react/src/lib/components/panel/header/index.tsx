import { useCallback, useState } from 'react'

import {
  AltArrowDown as AltArrowDownIcon,
  AltArrowRight as AltArrowRightIcon,
  Magnifier as MagnifierIcon,
  SidebarMinimalistic as SidebarMinimalisticIcon
} from '@vezham/icons-react'
import {
  Avatar,
  Button,
  Popover,
  Separator,
  Surface,
  Tooltip
} from '@vezham/react-v3'

import { AppIcon } from '../../app-icon'
import { useCommand } from '../../command'
import { ShortcutKey } from '../../shortcut-key'
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
  onOpenNavigation,
  onCollapseNavigation,
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

  const handlePopoverSearch = useCallback(() => {
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

          <Popover isOpen={open} onOpenChange={setOpen}>
            <Popover.Trigger>
              <button
                type="button"
                aria-label="Open application menu"
                className="flex h-full items-center justify-center bg-transparent p-0">
                <AltArrowDownIcon
                  size={12}
                  className="text-muted-foreground"
                  aria-hidden="true"
                />
              </button>
            </Popover.Trigger>

            <HeaderApplicationMenuContent
              compact={true}
              onClose={() => setOpen(false)}
              onSearch={handlePopoverSearch}
              onCollapseNavigation={onCollapseNavigation}
            />
          </Popover>
        </div>

        <Tooltip delay={0}>
          <Tooltip.Trigger>
            <Button
              aria-label="Expand workspace navigation"
              isIconOnly
              size="sm"
              variant="ghost"
              className="text-muted hover:text-foreground"
              onPress={onOpenNavigation}>
              <SidebarMinimalisticIcon
                size={16}
                className="size-4"
                aria-hidden="true"
              />
            </Button>
          </Tooltip.Trigger>
          <Tooltip.Content placement="right">Expand navigation</Tooltip.Content>
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
          <Tooltip.Content placement="right">Search (Ctrl/⌘ K)</Tooltip.Content>
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
        <Popover isOpen={open} onOpenChange={setOpen}>
          <Popover.Trigger>
            <Button
              variant="ghost"
              className="flex h-12 items-center gap-2 px-2 transition-transform duration-300"
              onPress={() => {
                setOpen(!open)
                onAvatarClick?.(users)
              }}>
              <HeaderAvatar user={users} />
              <AltArrowDownIcon
                size={12}
                className="text-muted-foreground"
                aria-hidden="true"
              />
            </Button>
          </Popover.Trigger>

          <HeaderApplicationMenuContent
            compact={false}
            onClose={() => setOpen(false)}
            onSearch={handlePopoverSearch}
            onCollapseNavigation={onCollapseNavigation}
          />
        </Popover>

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
              Search (Ctrl/⌘ K)
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
  compact,
  onClose,
  onSearch,
  onCollapseNavigation
}: {
  compact: boolean
  onClose: () => void
  onSearch: () => void
  onCollapseNavigation?: () => void
}) => {
  const [submenu, setSubmenu] = useState<string | null>(null)

  return (
    <Popover.Content className="rounded-xl p-2" placement="bottom">
      {compact ? (
        <Button
          variant="ghost"
          className="hover:bg-background w-full rounded-md px-3 py-2 text-left text-sm"
          onPress={onClose}>
          Back to home
        </Button>
      ) : (
        <div className="flex items-center">
          <Button
            variant="ghost"
            className="hover:bg-background w-full rounded-md px-3 py-2 text-left text-sm"
            onPress={onClose}>
            Back to home
          </Button>
          {onCollapseNavigation && (
            <Button
              aria-label="Collapse Home navigation"
              isIconOnly
              variant="ghost"
              className="shrink-0"
              onPress={() => {
                onClose()
                onCollapseNavigation()
              }}>
              <SidebarMinimalisticIcon size={20} aria-hidden="true" />
            </Button>
          )}
        </div>
      )}
      <Separator className="my-2" />
      <MenuItem
        ariaLabel="Open command palette"
        icon="vx:search"
        shortcut="⌘ K"
        onClick={onSearch}
      />
      <Separator className="my-2" />
      <Popover isOpen={submenu === 'file'}>
        <Popover.Trigger
          className="w-full"
          onMouseOver={() => setSubmenu('file')}
          onMouseLeave={() => setSubmenu(null)}>
          <div>
            <MenuItem label="File" hasSub />
          </div>
        </Popover.Trigger>
        <Popover.Content
          placement="right top"
          className="ml-2 p-2"
          onMouseOver={() => setSubmenu('file')}
          onMouseLeave={() => setSubmenu(null)}>
          <MenuItem label="New" hasSub />
          <Separator className="my-2" />
          <MenuItem icon="vx:gallery" label="Place image..." shortcut="⇧ ⌘ K" />
          <Separator className="my-2" />
          <MenuItem label="Save local copy..." />
          <MenuItem label="Save to version history..." shortcut="⌥ ⌘ S" />
          <MenuItem label="Show version history" />
          <Separator className="my-2" />
          <MenuItem label="Export..." shortcut="⇧ ⌘ E" />
          <MenuItem label="Export frames to PDF..." />
          <Separator className="my-2" />
          <MenuItem label="Create branch..." />
        </Popover.Content>
      </Popover>
      <MenuItem label="Edit" hasSub />
      <MenuItem label="View" hasSub />
    </Popover.Content>
  )
}

interface Props {
  ariaLabel?: string
  icon?: string
  label?: string
  shortcut?: string
  hasSub?: boolean
  onClick?: () => void
}

const MenuItem = ({
  ariaLabel,
  icon,
  label,
  shortcut,
  hasSub,
  onClick
}: Props) => {
  return (
    <div
      aria-label={ariaLabel ?? label}
      className="hover:bg-background flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-sm"
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={event => {
        if (!onClick || (event.key !== 'Enter' && event.key !== ' ')) {
          return
        }

        event.preventDefault()
        onClick()
      }}>
      <div className="flex items-center gap-2">
        {icon && (
          <AppIcon
            icon={icon}
            size={18}
            className="text-muted-foreground"
            aria-hidden="true"
          />
        )}
        <span>{label}</span>
      </div>
      <div className="text-muted-foreground flex items-center gap-2">
        {shortcut && <ShortcutKey shortcut={shortcut} />}
        {hasSub && <AltArrowRightIcon size={16} aria-hidden="true" />}
      </div>
    </div>
  )
}

export { Header }
