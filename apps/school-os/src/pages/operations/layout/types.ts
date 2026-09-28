import { useHotkey } from '@tanstack/react-hotkeys'
import { useLocation, useNavigate } from '@tanstack/react-router'
import {
  type ComponentPropsWithRef,
  type ElementType,
  Key,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react'

import { cn } from '@vezham/react-v3'

import { useWorkspaceNavigation } from '../../../components/workspace-navigation'
import {
  createExcludedPageKeys,
  createLabelsByPageKey,
  defaultLeftActions,
  defaultRightActions,
  operationsSidebarItems
} from './data'
import { tvProps, tvSlots, tva } from './variant'

type AcademicMenuItem = {
  key: string
  title: string
  href: string
  icon: string
  children?: AcademicMenuItem[]
}

type AcademicTab = {
  key: string
  title: string
  href: string
}

type ActionItem = {
  key: string
  label: string
  icon: string
  onAction?: () => void
  isVisible?: (pageKey: string) => boolean
  kind?: 'search' | 'refresh' | 'menu' | 'primary'
}

type HeaderActionsConfig = {
  leftActions?: ActionItem[]
  rightActions?: ActionItem[]
}

type LayoutConfig = {
  title?: string
  navigationLabel?: string
  subNavigationLabel?: string
  createEventPrefix?: string
  collapsedSidebarMode?: SidebarProps['collapsedMode']
  initialSidebarCollapsed?: boolean
  renderChildrenInSidebar?: boolean
  sidebarItems?: AcademicMenuItem[]
}

type SidebarViewItem = Omit<AcademicMenuItem, 'children'> & {
  isExpanded: boolean
  isActive: boolean
  children?: SidebarViewItem[]
}

type SidebarProps = {
  collapsed: boolean
  collapsedMode: 'hidden' | 'icons'
  hideToggle: boolean
  items: SidebarViewItem[]
  navigationLabel: string
  renderChildrenInSidebar: boolean
  selectedKeys: Set<string>
  toggleIcon: string
  toggleButtonProps: {
    variant: 'ghost'
    className: string
    'aria-label': string
    onPress: () => void
  }
  onAction: (key: Key) => void
}

interface Props extends tvProps, ComponentPropsWithRef<'div'> {
  as?: ElementType
  classNames?: Partial<Record<tvSlots, string>>
  actions?: HeaderActionsConfig
  layout?: LayoutConfig
}

const useProps = (originalProps: Props) => {
  const {
    variant,
    as,
    id,
    ref,
    className,
    classNames,
    actions,
    layout,
    ...otherProps
  } = originalProps

  const Component = as || 'div'
  const domRef = ref
  const slots = tva({ variant })
  const location = useLocation()
  const navigate = useNavigate()
  const { isNavigationCollapsed, toggleNavigation } = useWorkspaceNavigation()
  const layoutConfig = {
    title: 'Operations',
    navigationLabel: 'Operations navigation',
    subNavigationLabel: 'Operations sub navigation',
    createEventPrefix: 'operations',
    collapsedSidebarMode: 'hidden' as SidebarProps['collapsedMode'],
    initialSidebarCollapsed: false,
    renderChildrenInSidebar: true,
    sidebarItems: operationsSidebarItems,
    ...layout
  }
  const layoutSidebarItems = layoutConfig.sidebarItems
  const activeParentKeys = useMemo(
    () => getActiveParentKeys(location.pathname, layoutSidebarItems),
    [layoutSidebarItems, location.pathname]
  )
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const collapsed = layoutConfig.initialSidebarCollapsed
  const [expandedSidebarKeys, setExpandedSidebarKeys] = useState<Set<string>>(
    () => new Set(activeParentKeys)
  )
  const isSidebarCollapsed = collapsed || isNavigationCollapsed
  const activeTabs = layoutConfig.renderChildrenInSidebar
    ? []
    : getActiveTabs(location.pathname, layoutSidebarItems)
  const activePageKey = getActivePageKey(location.pathname, layoutSidebarItems)
  const activeSidebarKey = getActiveSidebarKey(
    location.pathname,
    layoutSidebarItems
  )
  const selectedTabKey = activeTabs.find(
    tab =>
      location.pathname === tab.href ||
      location.pathname.startsWith(`${tab.href}/`)
  )?.key

  const rightActions = useMemo(
    () => getPageRightActions(activePageKey, layoutConfig.createEventPrefix),
    [activePageKey, layoutConfig.createEventPrefix]
  )
  const resolvedLeftActions = mergeActions(
    defaultLeftActions,
    actions?.leftActions
  )
  const resolvedRightActions = mergeActions(
    defaultRightActions,
    actions?.rightActions ?? rightActions
  )
  const visibleRightActions = resolvedRightActions.filter(
    action => !action.isVisible || action.isVisible(activePageKey)
  )
  const sidebarViewItems = createSidebarViewItems(
    location.pathname,
    layoutSidebarItems,
    expandedSidebarKeys
  )

  useEffect(() => {
    setExpandedSidebarKeys(currentKeys => {
      const nextKeys = new Set(currentKeys)
      let hasChanged = false

      activeParentKeys.forEach(key => {
        if (!nextKeys.has(key)) {
          nextKeys.add(key)
          hasChanged = true
        }
      })

      return hasChanged ? nextKeys : currentKeys
    })
  }, [activeParentKeys])

  const onToggleSidebar = useCallback(() => {
    if (window.matchMedia('(min-width: 768px)').matches) {
      toggleNavigation()
    } else {
      setIsSidebarOpen(true)
    }
  }, [toggleNavigation])

  useEffect(() => {
    if (isNavigationCollapsed) {
      setIsSidebarOpen(false)
    }
  }, [isNavigationCollapsed])

  const backAction = resolvedLeftActions.find(action => action.key === 'back')
  const forwardAction = resolvedLeftActions.find(
    action => action.key === 'forward'
  )
  const refreshAction = visibleRightActions.find(
    action => action.kind === 'refresh'
  )

  useHotkey('Meta+ArrowLeft', () => backAction?.onAction?.(), {
    enabled: Boolean(backAction?.onAction)
  })

  useHotkey('Meta+ArrowRight', () => forwardAction?.onAction?.(), {
    enabled: Boolean(forwardAction?.onAction)
  })

  useHotkey('Meta+R', () => refreshAction?.onAction?.(), {
    enabled: Boolean(refreshAction?.onAction)
  })

  useHotkey('Meta+S', () => onToggleSidebar())

  const onSidebarAction = (key: Key, onNavigate?: () => void) => {
    const item = findSidebarItem(layoutSidebarItems, String(key))

    if (item) {
      if (layoutConfig.renderChildrenInSidebar && item.children?.length) {
        setExpandedSidebarKeys(currentKeys => {
          const nextKeys = new Set(currentKeys)

          if (nextKeys.has(item.key)) {
            nextKeys.delete(item.key)
          } else {
            nextKeys.add(item.key)
          }

          return nextKeys
        })

        return
      }

      navigate({ to: item.href })
      onNavigate?.()
    }
  }

  const getBaseProps = () => ({
    id,
    ref: domRef,
    className: slots.base({ class: cn(classNames?.base, className) }),
    ...otherProps
  })

  const getHeaderProps = () => ({
    variant: 'transparent' as const,
    className: slots.header({ class: classNames?.header })
  })

  const getSeparatorProps = () => ({
    className: slots.separator({ class: classNames?.separator })
  })

  const getHeaderInnerProps = () => ({
    variant: 'transparent' as const,
    className: slots.header_inner({ class: classNames?.header_inner })
  })

  const getHeaderLeftProps = () => ({
    variant: 'transparent' as const,
    className: slots.header_left({ class: classNames?.header_left })
  })

  const getHeaderTabsDesktopProps = () => ({
    variant: 'transparent' as const,
    className: slots.header_tabs_desktop({
      class: classNames?.header_tabs_desktop
    })
  })

  const getHeaderRightProps = () => ({
    variant: 'transparent' as const,
    className: slots.header_right({ class: classNames?.header_right })
  })

  const getHeaderTabsMobileProps = () => ({
    variant: 'transparent' as const,
    className: slots.header_tabs_mobile({
      class: classNames?.header_tabs_mobile
    })
  })

  const getShellProps = () => ({
    variant: 'transparent' as const,
    className: slots.shell({ class: classNames?.shell })
  })

  const getSidebarRailProps = () => ({
    variant: 'transparent' as const,
    className: slots.sidebar_rail({
      class: cn(
        classNames?.sidebar_rail,
        isSidebarCollapsed &&
          (layoutConfig.collapsedSidebarMode === 'icons'
            ? slots.sidebar_rail_compact()
            : slots.sidebar_rail_closed())
      )
    })
  })

  const getContentProps = () => ({
    variant: 'transparent' as const,
    className: slots.content({ class: classNames?.content })
  })

  const getContentSurfaceProps = () => ({
    className: slots.content_surface({ class: classNames?.content_surface })
  })

  const getDrawerHeaderProps = () => ({
    variant: 'transparent' as const,
    className: slots.drawer_header({ class: classNames?.drawer_header })
  })

  const getDrawerTitleProps = () => ({
    className: slots.drawer_title({ class: classNames?.drawer_title })
  })

  const getDrawerBodyProps = () => ({
    className: slots.drawer_body({ class: classNames?.drawer_body })
  })

  const getIconButtonProps = (action: ActionItem, isPrimary = false) => ({
    variant: isPrimary ? ('primary' as const) : ('ghost' as const),
    isIconOnly: !isPrimary,
    className: isPrimary
      ? slots.primary_button({ class: classNames?.primary_button })
      : action.kind === 'search'
        ? slots.search_button({ class: classNames?.search_button })
        : slots.icon_button({ class: classNames?.icon_button }),
    'aria-label': action.label,
    onPress: action.onAction
  })

  const getButtonIconProps = (icon: string, isInline = false) => ({
    icon,
    width: isInline ? 16 : 18,
    className: isInline
      ? slots.inline_icon({ class: classNames?.inline_icon })
      : undefined
  })

  const getSearchFieldProps = (action: ActionItem) => ({
    'aria-label': action.label,
    className: slots.search_field({ class: classNames?.search_field })
  })

  const getSearchIconProps = (icon: string) => ({
    icon,
    className: slots.search_icon({ class: classNames?.search_icon })
  })

  const getPrimaryLabelProps = () => ({
    className: slots.primary_label({ class: classNames?.primary_label })
  })

  const getDropdownLabelProps = () => ({
    className: slots.dropdown_label({ class: classNames?.dropdown_label })
  })

  const getSidebarProps = (sidebar: SidebarProps) => ({
    variant: 'transparent' as const,
    className: sidebar.collapsed
      ? slots.sidebar_collapsed({ class: classNames?.sidebar_collapsed })
      : slots.sidebar({ class: classNames?.sidebar })
  })

  const getSidebarListProps = (sidebar: SidebarProps) => ({
    'aria-label': sidebar.navigationLabel,
    selectionMode: 'single' as const,
    selectedKeys: sidebar.selectedKeys,
    onAction: sidebar.onAction,
    onSelectionChange: (keys: Set<Key> | 'all') => {
      if (keys === 'all') {
        return
      }

      const selectedKey = Array.from(keys)[0]

      if (selectedKey) {
        sidebar.onAction(selectedKey)
      }
    },
    className: slots.sidebar_list({ class: classNames?.sidebar_list })
  })

  const getSidebarItemProps = (
    item: SidebarViewItem,
    sidebar?: SidebarProps,
    isChild = false
  ) => ({
    id: item.key,
    textValue: item.title,
    onPress: () => sidebar?.onAction(item.key),
    className: isChild
      ? item.isActive
        ? slots.sidebar_child_item_active({
            class: classNames?.sidebar_child_item_active
          })
        : slots.sidebar_child_item({ class: classNames?.sidebar_child_item })
      : item.isActive
        ? slots.sidebar_item_active({ class: classNames?.sidebar_item_active })
        : slots.sidebar_item({ class: classNames?.sidebar_item })
  })

  const getSidebarItemWrapProps = () => ({
    variant: 'transparent' as const,
    className: slots.sidebar_item_wrap({ class: classNames?.sidebar_item_wrap })
  })

  const getSidebarChildGroupProps = () => ({
    className: slots.sidebar_child_group({
      class: classNames?.sidebar_child_group
    })
  })

  const getCollapsedSidebarListProps = () => ({
    variant: 'transparent' as const,
    className: slots.sidebar_collapsed_list({
      class: classNames?.sidebar_collapsed_list
    })
  })

  const getCollapsedSidebarItemProps = (item: SidebarViewItem) => ({
    variant: 'ghost' as const,
    isIconOnly: true,
    'aria-label': item.title,
    className: item.isActive
      ? slots.sidebar_collapsed_item_active({
          class: classNames?.sidebar_collapsed_item_active
        })
      : slots.sidebar_collapsed_item({
          class: classNames?.sidebar_collapsed_item
        }),
    onPress: () => onSidebarAction(item.key)
  })

  const getSidebarFlyoutProps = () => ({
    variant: 'transparent' as const,
    className: slots.sidebar_flyout({ class: classNames?.sidebar_flyout })
  })

  const getSidebarFlyoutLabelProps = () => ({
    className: slots.sidebar_flyout_label({
      class: classNames?.sidebar_flyout_label
    })
  })

  const getSidebarFlyoutListProps = () => ({
    variant: 'transparent' as const,
    className: slots.sidebar_flyout_list({
      class: classNames?.sidebar_flyout_list
    })
  })

  const getSidebarFlyoutItemProps = (item: SidebarViewItem) => ({
    variant: 'ghost' as const,
    className: item.isActive
      ? slots.sidebar_flyout_item_active({
          class: classNames?.sidebar_flyout_item_active
        })
      : slots.sidebar_flyout_item({ class: classNames?.sidebar_flyout_item }),
    onPress: () => onSidebarAction(item.key)
  })

  const getSidebarIconProps = (icon: string, isActive: boolean) => ({
    icon,
    width: 18,
    className: isActive
      ? slots.sidebar_icon_active({ class: classNames?.sidebar_icon_active })
      : slots.sidebar_icon({ class: classNames?.sidebar_icon })
  })

  const getSidebarLabelProps = (isActive: boolean) => ({
    className: isActive
      ? slots.sidebar_label_active({ class: classNames?.sidebar_label_active })
      : slots.sidebar_label({ class: classNames?.sidebar_label })
  })

  const getSidebarDisclosureIconProps = (isExpanded: boolean) => ({
    icon: isExpanded ? 'lucide:chevron-down' : 'lucide:chevron-right',
    width: 16,
    className: slots.sidebar_disclosure_icon({
      class: classNames?.sidebar_disclosure_icon
    })
  })

  const getTabsScrollerProps = () => ({
    variant: 'transparent' as const,
    className: slots.tabs_scroller({ class: classNames?.tabs_scroller })
  })

  const getTabsListProps = () => ({
    'aria-label': layoutConfig.subNavigationLabel,
    className: slots.tabs_list({ class: classNames?.tabs_list })
  })

  const getTabsTabProps = (tab: AcademicTab) => ({
    id: tab.key,
    className: slots.tabs_tab({ class: classNames?.tabs_tab })
  })

  const sidebarProps: SidebarProps = {
    collapsed: isSidebarCollapsed,
    collapsedMode: layoutConfig.collapsedSidebarMode,
    hideToggle: true,
    items: sidebarViewItems,
    navigationLabel: layoutConfig.navigationLabel,
    renderChildrenInSidebar: layoutConfig.renderChildrenInSidebar,
    selectedKeys: new Set([activeSidebarKey]),
    toggleIcon: isSidebarCollapsed
      ? 'lucide:chevron-right'
      : 'lucide:chevron-left',
    toggleButtonProps: {
      variant: 'ghost' as const,
      className: slots.sidebar_toggle({ class: classNames?.sidebar_toggle }),
      'aria-label': isSidebarCollapsed
        ? `Expand ${layoutConfig.navigationLabel}`
        : `Collapse ${layoutConfig.navigationLabel}`,
      onPress: onToggleSidebar
    },
    onAction: key => onSidebarAction(key)
  }

  const drawerSidebarProps: SidebarProps = {
    ...sidebarProps,
    collapsed: false,
    hideToggle: true,
    onAction: key => onSidebarAction(key, () => setIsSidebarOpen(false))
  }

  return {
    Component,
    domRef,
    slots,
    classNames,
    activeTabs,
    isNavigationCollapsed,
    layoutTitle: layoutConfig.title,
    headerProps: {
      leftActions: resolvedLeftActions,
      searchAction: visibleRightActions.find(
        action => action.kind === 'search'
      ),
      primaryAction: visibleRightActions.find(
        action => action.kind === 'primary'
      ),
      refreshAction,
      menuActions: visibleRightActions.filter(action => action.kind === 'menu'),
      sidebarToggle: {
        key: 'sidebar-toggle',
        label: isSidebarCollapsed ? 'Show navigation' : 'Hide navigation',
        icon: isSidebarCollapsed
          ? 'lucide:panel-left-open'
          : 'lucide:panel-left-close',
        onAction: onToggleSidebar
      },
      selectedTabKey,
      onTabSelectionChange: (key: Key) => {
        const tab = activeTabs.find(item => item.key === String(key))

        if (tab) {
          navigate({ to: tab.href })
        }
      }
    },
    sidebarProps,
    drawerProps: {
      root: {
        isOpen: isSidebarOpen && !isNavigationCollapsed,
        onOpenChange: setIsSidebarOpen
      },
      dialog: {
        className: slots.drawer_dialog({ class: classNames?.drawer_dialog })
      },
      closeAction: {
        key: 'close-sidebar',
        label: `Close ${layoutConfig.navigationLabel}`,
        icon: 'lucide:x',
        onAction: () => setIsSidebarOpen(false)
      },
      sidebar: drawerSidebarProps
    },
    getBaseProps,
    getHeaderProps,
    getHeaderInnerProps,
    getHeaderLeftProps,
    getHeaderTabsDesktopProps,
    getHeaderRightProps,
    getHeaderTabsMobileProps,
    getShellProps,
    getSidebarRailProps,
    getContentProps,
    getSeparatorProps,
    getContentSurfaceProps,
    getDrawerHeaderProps,
    getDrawerTitleProps,
    getDrawerBodyProps,
    getIconButtonProps,
    getButtonIconProps,
    getSearchFieldProps,
    getSearchIconProps,
    getPrimaryLabelProps,
    getDropdownLabelProps,
    getSidebarProps,
    getSidebarListProps,
    getSidebarItemWrapProps,
    getSidebarChildGroupProps,
    getSidebarItemProps,
    getCollapsedSidebarListProps,
    getCollapsedSidebarItemProps,
    getSidebarFlyoutProps,
    getSidebarFlyoutLabelProps,
    getSidebarFlyoutListProps,
    getSidebarFlyoutItemProps,
    getSidebarIconProps,
    getSidebarLabelProps,
    getSidebarDisclosureIconProps,
    getTabsScrollerProps,
    getTabsListProps,
    getTabsTabProps
  }
}

function getPageRightActions(
  activePageKey: string,
  createEventPrefix: string
): ActionItem[] {
  if (createExcludedPageKeys.has(activePageKey)) {
    return [
      {
        key: 'create',
        label: 'Create',
        icon: 'lucide:plus',
        kind: 'primary',
        isVisible: () => false
      }
    ]
  }

  const label = createLabelsByPageKey[activePageKey]

  return label
    ? [
        {
          key: 'create',
          label,
          icon: 'lucide:plus',
          kind: 'primary',
          onAction: () => dispatchCreateAction(activePageKey, createEventPrefix)
        }
      ]
    : []
}

function dispatchCreateAction(pageKey: string, prefix: string) {
  window.dispatchEvent(new CustomEvent(`${prefix}:${pageKey}:create`))
}

function mergeActions(
  defaultActions: ActionItem[],
  pageActions?: ActionItem[]
) {
  if (!pageActions?.length) {
    return defaultActions
  }

  const actionMap = new Map(defaultActions.map(action => [action.key, action]))

  pageActions.forEach(action => {
    actionMap.set(action.key, {
      ...actionMap.get(action.key),
      ...action
    })
  })

  return Array.from(actionMap.values())
}

function getActiveTabs(pathname: string, items: AcademicMenuItem[]) {
  const activeItem = items.find(
    item => pathname === item.href || pathname.startsWith(`${item.href}/`)
  )

  return (
    activeItem?.children?.map(child => ({
      key: child.key,
      title: child.title,
      href: child.href
    })) ?? []
  )
}

function getActivePageKey(pathname: string, items: AcademicMenuItem[]) {
  const allItems = flattenSidebarItems(items)
  const activeItem = allItems
    .filter(
      item => pathname === item.href || pathname.startsWith(`${item.href}/`)
    )
    .sort((a, b) => b.href.length - a.href.length)[0]

  return activeItem?.key ?? 'operations'
}

function getActiveSidebarKey(pathname: string, items: AcademicMenuItem[]) {
  const activeItem = items
    .filter(
      item => pathname === item.href || pathname.startsWith(`${item.href}/`)
    )
    .sort((a, b) => b.href.length - a.href.length)[0]

  return activeItem?.key ?? ''
}

function createSidebarViewItems(
  pathname: string,
  items: AcademicMenuItem[],
  expandedKeys: Set<string>
): SidebarViewItem[] {
  return items.map(item => {
    const children = item.children
      ? createSidebarViewItems(pathname, item.children, expandedKeys)
      : undefined
    const isActive =
      pathname === item.href ||
      pathname.startsWith(`${item.href}/`) ||
      Boolean(children?.some(child => child.isActive))

    return {
      ...item,
      children,
      isExpanded: expandedKeys.has(item.key),
      isActive
    }
  })
}

function getActiveParentKeys(pathname: string, items: AcademicMenuItem[]) {
  const parentKeys: string[] = []

  items.forEach(item => {
    if (!item.children?.length) {
      return
    }

    const hasActiveChild = item.children.some(
      child => pathname === child.href || pathname.startsWith(`${child.href}/`)
    )

    if (hasActiveChild) {
      parentKeys.push(item.key)
    }
  })

  return parentKeys
}

function flattenSidebarItems(items: AcademicMenuItem[]): AcademicMenuItem[] {
  return items.flatMap(item => [
    item,
    ...flattenSidebarItems(item.children ?? [])
  ])
}

function findSidebarItem(items: AcademicMenuItem[], key: string) {
  return flattenSidebarItems(items).find(item => item.key === key)
}

export { useProps }
export type {
  ActionItem,
  AcademicMenuItem,
  AcademicTab,
  HeaderActionsConfig,
  LayoutConfig,
  Props,
  SidebarProps,
  SidebarViewItem
}
