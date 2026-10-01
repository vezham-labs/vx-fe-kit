import type { ReactNode, RefObject } from 'react'

import {
  Button,
  Dropdown,
  InputGroup,
  Label,
  Popover,
  Tabs,
  TextField,
  Tooltip
} from '@vezham/react-v3'

import { AppIcon } from '../../components/app-icon'
import { ShortcutButton } from '../../components/shortcut-key'
import type { AppNavigationItem } from '../../navigation'

export type SectionAction = {
  key: string
  label: string
  icon: string
  onAction?: () => void
  children?: SectionAction[]
}

export type SectionSearch = {
  value: string
  onChange: (value: string) => void
  label?: string
  placeholder?: string
}

type ToolbarSearch = SectionSearch & {
  inputRef: RefObject<HTMLInputElement | null>
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}

type Props = {
  title: string
  tabs: AppNavigationItem[]
  navigationControls: ReactNode
  toolbar?: ReactNode
  search?: ToolbarSearch
  menuActions: SectionAction[]
  primaryAction?: SectionAction
  onSync: () => void
  sync?: boolean
  isMenuOpen: boolean
  onMenuOpenChange: (isOpen: boolean) => void
}

const iconButtonClassName = 'h-9 w-9 min-w-9 p-0'

const SectionActionLabel = ({ action }: { action: SectionAction }) => (
  <Label className="flex items-center gap-2">
    <AppIcon icon={action.icon} size={16} aria-hidden="true" />
    {action.label}
  </Label>
)

const renderMenuItems = (actions: SectionAction[]): ReactNode =>
  actions.map(action =>
    action.children?.length ? (
      <Dropdown.SubmenuTrigger key={action.key}>
        <Dropdown.Item id={action.key} textValue={action.label}>
          <SectionActionLabel action={action} />
          <Dropdown.SubmenuIndicator />
        </Dropdown.Item>
        <Dropdown.Popover>
          <Dropdown.Menu>{renderMenuItems(action.children)}</Dropdown.Menu>
        </Dropdown.Popover>
      </Dropdown.SubmenuTrigger>
    ) : (
      <Dropdown.Item
        key={action.key}
        id={action.key}
        textValue={action.label}
        onPress={action.onAction}>
        <SectionActionLabel action={action} />
      </Dropdown.Item>
    )
  )

const SectionSearchField = ({ search }: { search: ToolbarSearch }) => {
  const label = search.label ?? 'Search content'

  const input = (isDesktop: boolean) => (
    <TextField
      aria-label={label}
      className={isDesktop ? 'hidden w-56 md:block' : 'w-56'}>
      <InputGroup>
        <InputGroup.Prefix>
          <AppIcon
            icon="vx:search"
            size={16}
            className="text-muted-foreground"
            aria-hidden="true"
          />
        </InputGroup.Prefix>
        <InputGroup.Input
          ref={isDesktop ? search.inputRef : undefined}
          type="search"
          placeholder={search.placeholder ?? 'Search'}
          value={search.value}
          onChange={event => search.onChange(event.target.value)}
        />
      </InputGroup>
    </TextField>
  )

  return (
    <>
      {input(true)}
      <Popover isOpen={search.isOpen} onOpenChange={search.onOpenChange}>
        <ShortcutButton
          label="Search"
          shortcut="Mod K"
          aria-keyshortcuts="Meta+K Control+K"
          className={`${iconButtonClassName} md:hidden`}>
          <AppIcon icon="vx:search" size={18} aria-hidden="true" />
        </ShortcutButton>
        <Popover.Content>
          <Popover.Dialog aria-label={label}>
            <Popover.Heading className="sr-only">{label}</Popover.Heading>
            {input(false)}
          </Popover.Dialog>
        </Popover.Content>
      </Popover>
    </>
  )
}

const SectionToolbar = ({
  title,
  tabs,
  navigationControls,
  toolbar,
  search,
  menuActions,
  primaryAction,
  onSync,
  sync = true,
  isMenuOpen,
  onMenuOpenChange
}: Props) => (
  <header className="bg-background sticky top-0 z-30 shrink-0 px-3 py-2 sm:px-4">
    <div className="grid min-h-12 grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 sm:flex sm:justify-between">
      <div className="contents sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:gap-1">
        <div className="col-start-1 row-start-1 flex min-w-0 items-center gap-1">
          {navigationControls}
        </div>
        {tabs.length > 0 && (
          <Tabs.ListContainer className="scrollbar-hide col-span-2 row-start-2 mt-2 w-fit max-w-full min-w-0 justify-self-center overflow-x-auto rounded-full sm:mt-0 sm:max-w-fit sm:flex-1">
            <Tabs.List
              aria-label={`${title} tabs`}
              className="flex min-w-max flex-nowrap *:whitespace-nowrap">
              {tabs.map(tab => (
                <Tabs.Tab
                  key={tab.key}
                  id={tab.key}
                  className="whitespace-nowrap">
                  {tab.title}
                  <Tabs.Indicator />
                </Tabs.Tab>
              ))}
            </Tabs.List>
          </Tabs.ListContainer>
        )}
      </div>
      <div
        role="group"
        aria-label="Toolbar actions"
        className="col-start-2 row-start-1 flex shrink-0 items-center gap-1 sm:gap-2">
        {search && <SectionSearchField search={search} />}
        {toolbar}
        {sync && (
          <ShortcutButton
            label="Sync"
            shortcut="⌘ R"
            aria-keyshortcuts="Meta+R"
            className={iconButtonClassName}
            onPress={onSync}>
            <AppIcon icon="vx:refresh" size={18} aria-hidden="true" />
          </ShortcutButton>
        )}
        {menuActions.length > 0 && (
          <Dropdown isOpen={isMenuOpen} onOpenChange={onMenuOpenChange}>
            <Tooltip delay={0}>
              <Button
                isIconOnly
                variant="ghost"
                aria-label="More"
                onPress={() => onMenuOpenChange(true)}
                className={iconButtonClassName}>
                <AppIcon icon="vx:menu-vertical" size={18} aria-hidden="true" />
              </Button>
              <Tooltip.Content>More</Tooltip.Content>
            </Tooltip>
            <Dropdown.Popover>
              <Dropdown.Menu>{renderMenuItems(menuActions)}</Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>
        )}
        {primaryAction && (
          <Button
            variant="primary"
            aria-label={primaryAction.label}
            className="h-9 min-w-9 px-0 md:px-3"
            onPress={primaryAction.onAction}>
            <AppIcon icon={primaryAction.icon} size={18} aria-hidden="true" />
            <Label className="hidden !text-inherit md:inline">
              {primaryAction.label}
            </Label>
          </Button>
        )}
      </div>
    </div>
  </header>
)

export { SectionToolbar }
