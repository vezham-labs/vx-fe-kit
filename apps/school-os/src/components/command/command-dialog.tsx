import { useNavigate } from '@tanstack/react-router'

import { Magnifier as MagnifierIcon } from '@vezham/icons-react'
import { Command } from '@vezham/react-pro-v3'
import { Typography } from '@vezham/react-v3'

import { AppIcon } from '@components/app-icon'
import { items as mainMenuItems } from '@components/panel/menu/sidebar-items'
import { sidebarItems as academicSidebarItems } from '@pages/academic/layout/data'
import { operationsSidebarItems } from '@pages/operations/layout/data'
import { reportsSidebarItems } from '@pages/reports/layout/data'

interface CommandDialogProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  onAction?: () => void
}

type NavigationCommand = {
  id: string
  label: string
  description: string
  icon: string
  href: string
}

type NavigationMenuItem = {
  key: string
  title: string
  href?: string
  icon?: string
  children?: NavigationMenuItem[]
  submenu?: NavigationMenuItem[]
}

type ActionCommand = {
  id: string
  label: string
  description: string
  icon: string
  action: () => void
}

const DEFAULT_COMMAND_ICON = 'vx:status'

const navigationCommands: NavigationCommand[] = [
  ...createNavigationCommands(mainMenuItems),
  ...createNavigationCommands(academicSidebarItems, 'Academic'),
  ...createNavigationCommands(operationsSidebarItems, 'Operations'),
  ...createNavigationCommands(reportsSidebarItems, 'Reports')
]

const actionCommands: ActionCommand[] = [
  {
    id: 'go-back',
    label: 'Back',
    description: 'Go to the previous page',
    icon: 'vx:arrow-left',
    action: () => window.history.back()
  },
  {
    id: 'go-forward',
    label: 'Forward',
    description: 'Go to the next page',
    icon: 'vx:arrow-right',
    action: () => window.history.forward()
  },
  {
    id: 'print-page',
    label: 'Print',
    description: 'Print the current page',
    icon: 'vx:printer',
    action: () => window.print()
  },
  {
    id: 'refresh-page',
    label: 'Refresh',
    description: 'Reload the current page',
    icon: 'vx:refresh',
    action: () => window.location.reload()
  }
]

export function CommandPaletteDialog({
  isOpen,
  onOpenChange,
  onAction
}: CommandDialogProps) {
  const navigate = useNavigate()

  const closeCommand = () => {
    onAction?.()
  }

  const runNavigationCommand = (command: NavigationCommand) => {
    navigate({ to: command.href })
    closeCommand()
  }

  const runActionCommand = (command: ActionCommand) => {
    command.action()
    closeCommand()
  }

  return (
    <Command>
      <Command.Backdrop
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        variant="blur">
        <Command.Container size="lg">
          <Command.Dialog>
            <Command.Header>
              <Command.InputGroup>
                <Command.InputGroup.Prefix>
                  <MagnifierIcon size={18} aria-hidden="true" />
                </Command.InputGroup.Prefix>
                <Command.InputGroup.Input placeholder="Search commands..." />
                <Command.InputGroup.ClearButton aria-label="Clear search" />
              </Command.InputGroup>
            </Command.Header>

            <Command.List
              aria-label="Command palette"
              renderEmptyState={() => 'No commands found.'}>
              <Command.Group heading="Navigation">
                {navigationCommands.map(command => (
                  <Command.Item
                    key={command.id}
                    id={command.id}
                    textValue={`${command.label} ${command.description}`}
                    onAction={() => runNavigationCommand(command)}>
                    <CommandItemContent {...command} />
                  </Command.Item>
                ))}
              </Command.Group>

              <Command.Separator />

              <Command.Group heading="Actions">
                {actionCommands.map(command => (
                  <Command.Item
                    key={command.id}
                    id={command.id}
                    textValue={`${command.label} ${command.description}`}
                    onAction={() => runActionCommand(command)}>
                    <CommandItemContent {...command} />
                  </Command.Item>
                ))}
              </Command.Group>
            </Command.List>
          </Command.Dialog>
        </Command.Container>
      </Command.Backdrop>
    </Command>
  )
}

function createNavigationCommands(
  items: NavigationMenuItem[],
  section?: string
): NavigationCommand[] {
  return items.flatMap(item => {
    const children = item.submenu ?? item.children
    const command = item.href
      ? [
          {
            id: `navigate-${item.key}`,
            label: item.title,
            description: section ? `${section} - ${item.href}` : item.href,
            icon: item.icon ?? DEFAULT_COMMAND_ICON,
            href: item.href
          }
        ]
      : []

    return [
      ...command,
      ...createNavigationCommands(children ?? [], section ?? item.title)
    ]
  })
}

function CommandItemContent({
  label,
  description,
  icon
}: {
  label: string
  description: string
  icon: string
}) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <div className="bg-default-100 text-default-600 flex h-8 w-8 shrink-0 items-center justify-center rounded-md">
        <AppIcon icon={icon} size={18} aria-hidden="true" />
      </div>
      <div className="min-w-0 flex-1">
        <Typography.Heading className="text-foreground block truncate text-sm font-medium">
          {label}
        </Typography.Heading>
        <Typography.Paragraph className="text-muted block truncate text-xs">
          {description}
        </Typography.Paragraph>
      </div>
    </div>
  )
}
