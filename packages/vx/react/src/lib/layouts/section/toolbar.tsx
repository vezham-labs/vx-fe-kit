import {
  type ReactNode,
  type RefObject,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react'

import {
  Button,
  Dropdown,
  InputGroup,
  Label,
  Popover,
  Separator,
  Tabs,
  TextField,
  Tooltip,
  useMediaQuery
} from '@vezham/react-v3'

import { AppIcon } from '../../components/app-icon'
import { useResponsiveToolbarAction } from '../../components/responsive-toolbar-action'
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

export type SectionViewMode = 'grid' | 'list'

export type SectionFilterKey =
  | 'uploaded'
  | 'generated'
  | 'images'
  | 'documents'
  | 'spreadsheets'
  | 'presentations'
  | 'pdfs'

export type SectionViewAction = {
  key: 'filter' | SectionViewMode
  label: string
  icon: string
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
  isNavigationCollapsed?: boolean
  toolbar?: ReactNode
  search?: ToolbarSearch
  menuActions: SectionAction[]
  primaryAction?: SectionAction
  onSync: () => void
  sync?: boolean
  view?: SectionViewAction[]
  selectedFilters: SectionFilterKey[]
  onSelectedFiltersChange: (filters: SectionFilterKey[]) => void
  viewMode: SectionViewMode
  onViewModeChange: (viewMode: SectionViewMode) => void
  isMenuOpen: boolean
  onMenuOpenChange: (isOpen: boolean) => void
}

const iconButtonClassName = 'h-9 w-9 min-w-9 p-0'
const EMPTY_VIEW_ACTIONS: SectionViewAction[] = []

type FilterOption = Readonly<{
  key: SectionFilterKey
  label: string
  icon: string
}>

const sourceFilterOptions: readonly FilterOption[] = [
  { key: 'uploaded', label: 'Uploaded', icon: 'vx:upload' },
  { key: 'generated', label: 'Generated', icon: 'vx:pencil' }
]

const fileTypeFilterOptions: readonly FilterOption[] = [
  { key: 'images', label: 'Images', icon: 'vx:gallery' },
  { key: 'documents', label: 'Documents', icon: 'vx:document' },
  {
    key: 'spreadsheets',
    label: 'Spreadsheets',
    icon: 'vx:file-spreadsheet'
  },
  { key: 'presentations', label: 'Presentations', icon: 'vx:document' },
  { key: 'pdfs', label: 'PDFs', icon: 'vx:file-text' }
]

const filterOptions: readonly FilterOption[] = [
  ...sourceFilterOptions,
  ...fileTypeFilterOptions
]

const getActiveFilters = (selectedFilters: readonly SectionFilterKey[]) =>
  selectedFilters.flatMap(filter => {
    const option = filterOptions.find(option => option.key === filter)
    return option ? [option] : []
  })

const isViewModeAction = (
  action: SectionViewAction
): action is SectionViewAction & { key: SectionViewMode } =>
  action.key === 'grid' || action.key === 'list'

const FilterMenuItem = ({
  option,
  isSelected,
  onToggle
}: {
  option: FilterOption
  isSelected: boolean
  onToggle: (filter: SectionFilterKey) => void
}) => (
  <Dropdown.Item
    id={option.key}
    textValue={option.label}
    shouldCloseOnSelect={false}
    onPress={() => onToggle(option.key)}>
    <Label className="flex items-center gap-3">
      <AppIcon icon={option.icon} size={18} aria-hidden="true" />
      {option.label}
    </Label>
    {isSelected && (
      <AppIcon
        icon="vx:check"
        size={18}
        className="ml-auto shrink-0"
        aria-hidden="true"
      />
    )}
  </Dropdown.Item>
)

const FilterMenu = ({
  selectedFilters,
  onToggle
}: {
  selectedFilters: SectionFilterKey[]
  onToggle: (filter: SectionFilterKey) => void
}) => (
  <Dropdown.Menu aria-label="Filter options">
    <Label className="text-muted-foreground px-3 pt-2">Source</Label>
    <Dropdown.Section aria-label="Source">
      {sourceFilterOptions.map(option => (
        <FilterMenuItem
          key={option.key}
          option={option}
          isSelected={selectedFilters.includes(option.key)}
          onToggle={onToggle}
        />
      ))}
    </Dropdown.Section>
    <Separator className="my-1" />
    <Label className="text-muted-foreground px-3 pt-1">File type</Label>
    <Dropdown.Section aria-label="File type">
      {fileTypeFilterOptions.map(option => (
        <FilterMenuItem
          key={option.key}
          option={option}
          isSelected={selectedFilters.includes(option.key)}
          onToggle={onToggle}
        />
      ))}
    </Dropdown.Section>
  </Dropdown.Menu>
)

const SectionActiveFilters = ({
  selectedFilters,
  onSelectedFiltersChange
}: {
  selectedFilters: SectionFilterKey[]
  onSelectedFiltersChange: (filters: SectionFilterKey[]) => void
}) => {
  const activeFilters = getActiveFilters(selectedFilters)

  if (activeFilters.length === 0) return null

  return (
    <div
      role="group"
      aria-label="Active filters"
      className="hidden min-w-0 flex-wrap items-center gap-2 md:flex">
      {activeFilters.map(filter => (
        <Button
          key={filter.key}
          variant="secondary"
          aria-label={`Remove ${filter.label} filter`}
          className="h-8 shrink-0 gap-1.5 rounded-full px-3"
          onPress={() =>
            onSelectedFiltersChange(
              selectedFilters.filter(selected => selected !== filter.key)
            )
          }>
          <Label>{filter.label}</Label>
          <AppIcon icon="vx:close" size={14} aria-hidden="true" />
        </Button>
      ))}
    </div>
  )
}

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

const MobileToolbarMore = ({
  filterAction,
  menuActions,
  onSync,
  onToggleFilter,
  onViewModeChange,
  selectedFilters,
  sync,
  viewModeActions
}: {
  filterAction?: SectionViewAction
  menuActions: SectionAction[]
  onSync: () => void
  onToggleFilter: (filter: SectionFilterKey) => void
  onViewModeChange: (viewMode: SectionViewMode) => void
  selectedFilters: SectionFilterKey[]
  sync: boolean
  viewModeActions: SectionViewAction[]
}) => (
  <Dropdown>
    <Tooltip delay={0}>
      <Button
        isIconOnly
        variant="ghost"
        aria-label="More"
        className={iconButtonClassName}>
        <AppIcon icon="vx:menu-vertical" size={18} aria-hidden="true" />
      </Button>
      <Tooltip.Content>More</Tooltip.Content>
    </Tooltip>
    <Dropdown.Popover>
      <Dropdown.Menu aria-label="More">
        {sync && (
          <Dropdown.Item id="sync" textValue="Sync" onPress={onSync}>
            <SectionActionLabel
              action={{ key: 'sync', label: 'Sync', icon: 'vx:refresh' }}
            />
          </Dropdown.Item>
        )}
        {filterAction && (
          <Dropdown.SubmenuTrigger>
            <Dropdown.Item id="filter" textValue={filterAction.label}>
              <SectionActionLabel action={filterAction} />
              <Dropdown.SubmenuIndicator />
            </Dropdown.Item>
            <Dropdown.Popover>
              <FilterMenu
                selectedFilters={selectedFilters}
                onToggle={onToggleFilter}
              />
            </Dropdown.Popover>
          </Dropdown.SubmenuTrigger>
        )}
        {viewModeActions.map(action => (
          <Dropdown.Item
            key={action.key}
            id={action.key}
            textValue={action.label}
            onPress={() => onViewModeChange(action.key)}>
            <SectionActionLabel action={action} />
          </Dropdown.Item>
        ))}
        {menuActions.length > 0 && viewModeActions.length > 0 && <Separator />}
        {renderMenuItems(menuActions)}
      </Dropdown.Menu>
    </Dropdown.Popover>
  </Dropdown>
)

const SectionSearchField = ({ search }: { search: ToolbarSearch }) => {
  const label = search.label ?? 'Search content'

  const input = (isDesktop: boolean) => (
    <TextField
      aria-label={label}
      className={isDesktop ? 'hidden w-56 lg:block' : 'w-56'}>
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
          className={`${iconButtonClassName} hidden md:flex lg:hidden`}>
          <AppIcon icon="vx:search" size={18} aria-hidden="true" />
        </ShortcutButton>
        <Popover.Content className="hidden md:block">
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
  isNavigationCollapsed = false,
  toolbar,
  search,
  menuActions,
  primaryAction,
  onSync,
  sync = true,
  view = EMPTY_VIEW_ACTIONS,
  selectedFilters,
  onSelectedFiltersChange,
  viewMode,
  onViewModeChange,
  isMenuOpen,
  onMenuOpenChange
}: Props) => {
  const isMobile = useMediaQuery('(max-width: 767px)')
  const { setAction: setResponsiveToolbarAction } = useResponsiveToolbarAction()
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false)
  const filterAction = useMemo(
    () => view.find(action => action.key === 'filter'),
    [view]
  )
  const viewModeActions = useMemo(() => view.filter(isViewModeAction), [view])
  const activeFilters = getActiveFilters(selectedFilters)
  const toggleFilter = useCallback(
    (filter: SectionFilterKey) => {
      onSelectedFiltersChange(
        selectedFilters.includes(filter)
          ? selectedFilters.filter(selected => selected !== filter)
          : [...selectedFilters, filter]
      )
    },
    [onSelectedFiltersChange, selectedFilters]
  )
  const hasFilters = activeFilters.length > 0
  const mobileToolbarAction = useMemo(
    () =>
      isMobile ? (
        <MobileToolbarMore
          filterAction={filterAction}
          menuActions={menuActions}
          onSync={onSync}
          onToggleFilter={toggleFilter}
          onViewModeChange={onViewModeChange}
          selectedFilters={selectedFilters}
          sync={sync}
          viewModeActions={viewModeActions}
        />
      ) : null,
    [
      filterAction,
      isMobile,
      menuActions,
      onSync,
      onViewModeChange,
      selectedFilters,
      sync,
      toggleFilter,
      viewModeActions
    ]
  )

  useEffect(() => {
    setResponsiveToolbarAction(mobileToolbarAction)
    return () => setResponsiveToolbarAction(null)
  }, [mobileToolbarAction, setResponsiveToolbarAction])

  useEffect(() => {
    if (!isMobile) return

    setIsFilterMenuOpen(false)
    onMenuOpenChange(false)
  }, [isMobile, onMenuOpenChange])

  return (
    <header
      className={`bg-background sticky top-0 z-30 shrink-0 px-3 py-0 md:px-4 md:py-2 ${
        isNavigationCollapsed ? 'md:pl-30' : ''
      }`}>
      <div className="grid min-h-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 md:flex md:min-h-12 md:justify-between">
        <div className="contents sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:gap-1">
          <div className="col-start-1 row-start-1 hidden min-w-0 items-center gap-1 md:flex">
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
          className="scrollbar-hide col-start-2 row-start-1 hidden max-w-[calc(100vw-2rem)] min-w-0 items-center gap-2 overflow-x-auto md:flex">
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
          {filterAction && (
            <Dropdown
              isOpen={!isMobile && isFilterMenuOpen}
              onOpenChange={setIsFilterMenuOpen}>
              <Tooltip delay={0}>
                <Button
                  isIconOnly
                  variant={hasFilters ? 'secondary' : 'ghost'}
                  aria-label={filterAction.label}
                  aria-pressed={hasFilters}
                  className={`${iconButtonClassName} shrink-0 rounded-full`}>
                  <AppIcon
                    icon={filterAction.icon}
                    size={18}
                    aria-hidden="true"
                  />
                </Button>
                <Tooltip.Content>{filterAction.label}</Tooltip.Content>
              </Tooltip>
              <Dropdown.Popover className="hidden md:block">
                <FilterMenu
                  selectedFilters={selectedFilters}
                  onToggle={toggleFilter}
                />
              </Dropdown.Popover>
            </Dropdown>
          )}
          {viewModeActions.length > 0 && (
            <>
              {filterAction && (
                <Separator orientation="vertical" className="h-8" />
              )}
              <div
                role="group"
                aria-label="View options"
                className="flex items-center gap-1">
                {viewModeActions.map(action => (
                  <Tooltip key={action.key} delay={0}>
                    <Tooltip.Trigger>
                      <Button
                        isIconOnly
                        aria-label={action.label}
                        aria-pressed={viewMode === action.key}
                        variant={
                          viewMode === action.key ? 'secondary' : 'ghost'
                        }
                        className={iconButtonClassName}
                        onPress={() => onViewModeChange(action.key)}>
                        <AppIcon
                          icon={action.icon}
                          size={18}
                          aria-hidden="true"
                        />
                      </Button>
                    </Tooltip.Trigger>
                    <Tooltip.Content>{action.label}</Tooltip.Content>
                  </Tooltip>
                ))}
              </div>
            </>
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
                  <AppIcon
                    icon="vx:menu-vertical"
                    size={18}
                    aria-hidden="true"
                  />
                </Button>
                <Tooltip.Content>More</Tooltip.Content>
              </Tooltip>
              <Dropdown.Popover className="hidden md:block">
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
      {isMobile && primaryAction && (
        <Tooltip delay={0}>
          <Button
            isIconOnly
            variant="primary"
            aria-label={primaryAction.label}
            className="fixed right-8 bottom-[calc(5.5rem+env(safe-area-inset-bottom))] z-50 h-12 w-12 rounded-full p-0 shadow-lg"
            onPress={primaryAction.onAction}>
            <AppIcon icon={primaryAction.icon} size={22} aria-hidden="true" />
          </Button>
          <Tooltip.Content>{primaryAction.label}</Tooltip.Content>
        </Tooltip>
      )}
    </header>
  )
}

export { SectionActiveFilters, SectionToolbar }
