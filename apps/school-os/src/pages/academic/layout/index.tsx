import { Outlet } from '@tanstack/react-router'
import { Fragment, ReactNode, forwardRef } from 'react'

import {
  Button,
  Drawer,
  Dropdown,
  InputGroup,
  Label,
  ListBox,
  Separator,
  Surface,
  Tabs,
  TextField,
  Tooltip
} from '@vezham/react-v3'

import { AppIcon } from '@components/app-icon'
import { ShortcutKey } from '@components/shortcut-key'

import { Props, useProps } from './types'

const AcademicLayoutPage = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const {
    Component,
    activeTabs,
    isNavigationCollapsed,
    layoutTitle,
    headerProps,
    sidebarProps,
    drawerProps,
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
    getSeparatorProps,
    getTabsListProps,
    getTabsTabProps
  } = useProps({
    ...props,
    ref
  })

  return (
    <Component {...getBaseProps()}>
      <Surface
        key={isNavigationCollapsed ? 'navigation-collapsed' : 'navigation-open'}
        {...getHeaderProps()}>
        <Surface {...getHeaderInnerProps()}>
          <Surface {...getHeaderLeftProps()}>
            {!isNavigationCollapsed && (
              <>
                <HeaderIconTooltip
                  label={headerProps.sidebarToggle.label}
                  shortcut="⌘ S">
                  <Button {...getIconButtonProps(headerProps.sidebarToggle)}>
                    <AppIcon
                      {...getButtonIconProps(headerProps.sidebarToggle.icon)}
                      size="1em"
                      aria-hidden="true"
                    />
                  </Button>
                </HeaderIconTooltip>

                {headerProps.leftActions.map(action => (
                  <HeaderIconTooltip
                    key={action.key}
                    label={action.label}
                    shortcut={getActionShortcut(action.key)}>
                    <Button {...getIconButtonProps(action)}>
                      <AppIcon
                        {...getButtonIconProps(action.icon)}
                        size="1em"
                        aria-hidden="true"
                      />
                    </Button>
                  </HeaderIconTooltip>
                ))}
              </>
            )}

            {activeTabs.length ? (
              <Surface {...getHeaderTabsDesktopProps()}>
                <HeaderTabs
                  tabs={activeTabs}
                  selectedKey={headerProps.selectedTabKey}
                  onSelectionChange={headerProps.onTabSelectionChange}
                  getTabsScrollerProps={getTabsScrollerProps}
                  getTabsListProps={getTabsListProps}
                  getTabsTabProps={getTabsTabProps}
                />
              </Surface>
            ) : null}
          </Surface>

          <Surface {...getHeaderRightProps()}>
            {headerProps.searchAction ? (
              <>
                <TextField {...getSearchFieldProps(headerProps.searchAction)}>
                  <InputGroup>
                    <InputGroup.Prefix>
                      <AppIcon
                        {...getSearchIconProps(headerProps.searchAction.icon)}
                        size="1em"
                        aria-hidden="true"
                      />
                    </InputGroup.Prefix>
                    <InputGroup.Input
                      placeholder={headerProps.searchAction.label}
                    />
                  </InputGroup>
                </TextField>
                <HeaderIconTooltip
                  label={headerProps.searchAction.label}
                  shortcut="⌘ K">
                  <Button {...getIconButtonProps(headerProps.searchAction)}>
                    <AppIcon
                      {...getButtonIconProps(headerProps.searchAction.icon)}
                      size="1em"
                      aria-hidden="true"
                    />
                  </Button>
                </HeaderIconTooltip>
              </>
            ) : null}

            {headerProps.refreshAction ? (
              <HeaderIconTooltip
                label={headerProps.refreshAction.label}
                shortcut={getActionShortcut(headerProps.refreshAction.key)}>
                <Button {...getIconButtonProps(headerProps.refreshAction)}>
                  <AppIcon
                    {...getButtonIconProps(headerProps.refreshAction.icon)}
                    size="1em"
                    aria-hidden="true"
                  />
                </Button>
              </HeaderIconTooltip>
            ) : null}

            {headerProps.menuActions.length ? (
              <MoreActions
                actions={headerProps.menuActions}
                getIconButtonProps={getIconButtonProps}
                getButtonIconProps={getButtonIconProps}
                getDropdownLabelProps={getDropdownLabelProps}
              />
            ) : null}

            {headerProps.primaryAction ? (
              <Button {...getIconButtonProps(headerProps.primaryAction, true)}>
                <AppIcon
                  {...getButtonIconProps(headerProps.primaryAction.icon)}
                  size="1em"
                  aria-hidden="true"
                />
                <Label {...getPrimaryLabelProps()}>
                  {headerProps.primaryAction.label}
                </Label>
              </Button>
            ) : null}
          </Surface>
        </Surface>

        {activeTabs.length ? (
          <Surface {...getHeaderTabsMobileProps()}>
            <HeaderTabs
              tabs={activeTabs}
              selectedKey={headerProps.selectedTabKey}
              onSelectionChange={headerProps.onTabSelectionChange}
              getTabsScrollerProps={getTabsScrollerProps}
              getTabsListProps={getTabsListProps}
              getTabsTabProps={getTabsTabProps}
            />
          </Surface>
        ) : null}
      </Surface>

      <Surface {...getShellProps()}>
        <Surface {...getSidebarRailProps()}>
          <AcademicSidebar
            sidebarProps={sidebarProps}
            getSidebarProps={getSidebarProps}
            getSidebarListProps={getSidebarListProps}
            getSidebarItemWrapProps={getSidebarItemWrapProps}
            getSidebarChildGroupProps={getSidebarChildGroupProps}
            getSidebarItemProps={getSidebarItemProps}
            getCollapsedSidebarListProps={getCollapsedSidebarListProps}
            getCollapsedSidebarItemProps={getCollapsedSidebarItemProps}
            getSidebarFlyoutProps={getSidebarFlyoutProps}
            getSidebarFlyoutLabelProps={getSidebarFlyoutLabelProps}
            getSidebarFlyoutListProps={getSidebarFlyoutListProps}
            getSidebarFlyoutItemProps={getSidebarFlyoutItemProps}
            getSidebarIconProps={getSidebarIconProps}
            getSidebarLabelProps={getSidebarLabelProps}
            getSidebarDisclosureIconProps={getSidebarDisclosureIconProps}
          />
        </Surface>

        <Surface {...getContentProps()}>
          <Surface {...getContentSurfaceProps()}>
            <Outlet />
          </Surface>
        </Surface>
      </Surface>

      <Drawer {...drawerProps.root}>
        <Drawer.Content placement="left">
          <Drawer.Dialog {...drawerProps.dialog}>
            <Surface {...getDrawerHeaderProps()}>
              <Drawer.Header {...getDrawerTitleProps()}>
                {layoutTitle}
              </Drawer.Header>

              <Button {...getIconButtonProps(drawerProps.closeAction)}>
                <AppIcon
                  {...getButtonIconProps(drawerProps.closeAction.icon)}
                  size="1em"
                  aria-hidden="true"
                />
              </Button>
            </Surface>
            <Separator {...getSeparatorProps()} />
            <Drawer.Body {...getDrawerBodyProps()}>
              <AcademicSidebar
                sidebarProps={drawerProps.sidebar}
                getSidebarProps={getSidebarProps}
                getSidebarListProps={getSidebarListProps}
                getSidebarItemWrapProps={getSidebarItemWrapProps}
                getSidebarChildGroupProps={getSidebarChildGroupProps}
                getSidebarItemProps={getSidebarItemProps}
                getCollapsedSidebarListProps={getCollapsedSidebarListProps}
                getCollapsedSidebarItemProps={getCollapsedSidebarItemProps}
                getSidebarFlyoutProps={getSidebarFlyoutProps}
                getSidebarFlyoutLabelProps={getSidebarFlyoutLabelProps}
                getSidebarFlyoutListProps={getSidebarFlyoutListProps}
                getSidebarFlyoutItemProps={getSidebarFlyoutItemProps}
                getSidebarIconProps={getSidebarIconProps}
                getSidebarLabelProps={getSidebarLabelProps}
                getSidebarDisclosureIconProps={getSidebarDisclosureIconProps}
              />
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer>
    </Component>
  )
})

function MoreActions({
  actions,
  getIconButtonProps,
  getButtonIconProps,
  getDropdownLabelProps
}: Pick<
  ReturnType<typeof useProps>,
  'getIconButtonProps' | 'getButtonIconProps' | 'getDropdownLabelProps'
> & {
  actions: ReturnType<typeof useProps>['headerProps']['menuActions']
}) {
  return (
    <Dropdown>
      <Dropdown.Trigger>
        <HeaderIconTooltip label="More">
          <Button
            {...getIconButtonProps({
              key: 'more',
              label: 'More',
              icon: 'lucide:more-vertical'
            })}>
            <AppIcon
              {...getButtonIconProps('lucide:more-vertical')}
              size="1em"
              aria-hidden="true"
            />
          </Button>
        </HeaderIconTooltip>
      </Dropdown.Trigger>
      <Dropdown.Popover>
        <Dropdown.Menu>
          {actions.map(action =>
            action.key === 'export' ? (
              <Dropdown.SubmenuTrigger key={action.key}>
                <Dropdown.Item id={action.key} textValue={action.label}>
                  <Label {...getDropdownLabelProps()}>
                    <AppIcon
                      {...getButtonIconProps(action.icon, true)}
                      size="1em"
                      aria-hidden="true"
                    />
                    {action.label}
                  </Label>
                  <Dropdown.SubmenuIndicator />
                </Dropdown.Item>
                <Dropdown.Popover>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      id="export-pdf"
                      textValue="Export as PDF"
                      onPress={action.onAction}>
                      <Label {...getDropdownLabelProps()}>
                        <AppIcon
                          {...getButtonIconProps('lucide:file-text', true)}
                          size="1em"
                          aria-hidden="true"
                        />
                        Export as PDF
                      </Label>
                    </Dropdown.Item>
                    <Dropdown.Item
                      id="export-excel"
                      textValue="Export as Excel"
                      onPress={action.onAction}>
                      <Label {...getDropdownLabelProps()}>
                        <AppIcon
                          {...getButtonIconProps(
                            'lucide:file-spreadsheet',
                            true
                          )}
                          size="1em"
                          aria-hidden="true"
                        />
                        Export as Excel
                      </Label>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown.SubmenuTrigger>
            ) : (
              <Dropdown.Item
                key={action.key}
                id={action.key}
                textValue={action.label}
                onPress={action.onAction}>
                <Label {...getDropdownLabelProps()}>
                  <AppIcon
                    {...getButtonIconProps(action.icon, true)}
                    size="1em"
                    aria-hidden="true"
                  />
                  {action.label}
                </Label>
              </Dropdown.Item>
            )
          )}
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  )
}

function HeaderIconTooltip({
  children,
  label,
  shortcut
}: {
  children: ReactNode
  label: string
  shortcut?: string
}) {
  return (
    <Tooltip delay={0}>
      <Tooltip.Trigger>{children}</Tooltip.Trigger>
      <Tooltip.Content>
        <span className="flex items-center gap-2 whitespace-nowrap">
          <span>{label}</span>
          {shortcut ? <ShortcutKey shortcut={shortcut} /> : null}
        </span>
      </Tooltip.Content>
    </Tooltip>
  )
}

function getActionShortcut(key: string) {
  if (key === 'back') return '⌘ ←'
  if (key === 'forward') return '⌘ →'
  if (key === 'refresh') return '⌘ R'

  return undefined
}

function AcademicSidebar({
  sidebarProps,
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
  getSidebarDisclosureIconProps
}: Pick<
  ReturnType<typeof useProps>,
  | 'sidebarProps'
  | 'getSidebarProps'
  | 'getSidebarListProps'
  | 'getSidebarItemWrapProps'
  | 'getSidebarChildGroupProps'
  | 'getSidebarItemProps'
  | 'getCollapsedSidebarListProps'
  | 'getCollapsedSidebarItemProps'
  | 'getSidebarFlyoutProps'
  | 'getSidebarFlyoutLabelProps'
  | 'getSidebarFlyoutListProps'
  | 'getSidebarFlyoutItemProps'
  | 'getSidebarIconProps'
  | 'getSidebarLabelProps'
  | 'getSidebarDisclosureIconProps'
>) {
  return (
    <Surface {...getSidebarProps(sidebarProps)}>
      {!sidebarProps.hideToggle ? (
        <Button {...sidebarProps.toggleButtonProps}>
          <AppIcon
            {...getSidebarIconProps(sidebarProps.toggleIcon, false)}
            size="1em"
            aria-hidden="true"
          />
        </Button>
      ) : null}

      {sidebarProps.collapsed && sidebarProps.collapsedMode === 'icons' ? (
        <Surface {...getCollapsedSidebarListProps()}>
          {sidebarProps.items.map(item => (
            <Surface key={item.key} {...getSidebarItemWrapProps()}>
              <Button {...getCollapsedSidebarItemProps(item)}>
                <AppIcon
                  {...getSidebarIconProps(item.icon, item.isActive)}
                  size="1em"
                  aria-hidden="true"
                />
              </Button>

              <Surface {...getSidebarFlyoutProps()}>
                <Label {...getSidebarFlyoutLabelProps()}>
                  <AppIcon
                    {...getSidebarIconProps(item.icon, item.isActive)}
                    size="1em"
                    aria-hidden="true"
                  />
                  {item.title}
                </Label>

                {item.children?.length ? (
                  <Surface {...getSidebarFlyoutListProps()}>
                    {item.children.map(child => (
                      <Button
                        key={child.key}
                        {...getSidebarFlyoutItemProps(child)}>
                        <AppIcon
                          {...getSidebarIconProps(child.icon, child.isActive)}
                          size="1em"
                          aria-hidden="true"
                        />
                        <Label {...getSidebarLabelProps(child.isActive)}>
                          {child.title}
                        </Label>
                      </Button>
                    ))}
                  </Surface>
                ) : null}
              </Surface>
            </Surface>
          ))}
        </Surface>
      ) : null}

      {sidebarProps.collapsed ? null : (
        <ListBox {...getSidebarListProps(sidebarProps)}>
          {sidebarProps.items.map(item => (
            <Fragment key={item.key}>
              <ListBox.Item {...getSidebarItemProps(item, sidebarProps)}>
                <AppIcon
                  {...getSidebarIconProps(item.icon, item.isActive)}
                  size="1em"
                  aria-hidden="true"
                />
                <Label {...getSidebarLabelProps(item.isActive)}>
                  {item.title}
                </Label>
                {sidebarProps.renderChildrenInSidebar &&
                item.children?.length ? (
                  <AppIcon
                    {...getSidebarDisclosureIconProps(item.isExpanded)}
                    size="1em"
                    aria-hidden="true"
                  />
                ) : null}
              </ListBox.Item>

              {sidebarProps.renderChildrenInSidebar &&
              item.isExpanded &&
              item.children?.length ? (
                <ListBox.Section
                  {...getSidebarChildGroupProps()}
                  aria-label={item.title}>
                  {item.children.map(child => (
                    <ListBox.Item
                      key={child.key}
                      {...getSidebarItemProps(child, sidebarProps, true)}>
                      <AppIcon
                        {...getSidebarIconProps(child.icon, child.isActive)}
                        size="1em"
                        aria-hidden="true"
                      />
                      <Label {...getSidebarLabelProps(child.isActive)}>
                        {child.title}
                      </Label>
                    </ListBox.Item>
                  ))}
                </ListBox.Section>
              ) : null}
            </Fragment>
          ))}
        </ListBox>
      )}
    </Surface>
  )
}

function HeaderTabs({
  tabs,
  selectedKey,
  onSelectionChange,
  getTabsScrollerProps,
  getTabsListProps,
  getTabsTabProps
}: Pick<
  ReturnType<typeof useProps>,
  'getTabsScrollerProps' | 'getTabsListProps' | 'getTabsTabProps'
> & {
  tabs: ReturnType<typeof useProps>['activeTabs']
  selectedKey?: string
  onSelectionChange: ReturnType<
    typeof useProps
  >['headerProps']['onTabSelectionChange']
}) {
  return (
    <Surface {...getTabsScrollerProps()}>
      <Tabs selectedKey={selectedKey} onSelectionChange={onSelectionChange}>
        <Tabs.ListContainer>
          <Tabs.List {...getTabsListProps()}>
            {tabs.map((tab, index) => (
              <Tabs.Tab key={tab.key} {...getTabsTabProps(tab)}>
                {index > 0 ? <Tabs.Separator /> : null}
                {tab.title}
                <Tabs.Indicator />
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </Tabs.ListContainer>
      </Tabs>
    </Surface>
  )
}

AcademicLayoutPage.displayName = 'AcademicLayoutPage'

export default AcademicLayoutPage
