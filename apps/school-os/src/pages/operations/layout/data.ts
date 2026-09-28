import type { AcademicMenuItem, ActionItem } from './types'

export const operationsSidebarItems: AcademicMenuItem[] = [
  {
    key: 'fees',
    title: 'Fees Collections',
    href: '/operations/fees',
    icon: 'lucide:calendar-check',
    children: [
      {
        key: 'fees-group',
        title: 'Fees Group',
        href: '/operations/fees/fees-group',
        icon: 'lucide:file-chart-column'
      },
      {
        key: 'fees-type',
        title: 'Fees Type',
        href: '/operations/fees/fees-type',
        icon: 'lucide:user-round-check'
      },
      {
        key: 'fees-master',
        title: 'Fees Master',
        href: '/operations/fees/fees-master',
        icon: 'lucide:calendar-days'
      },
      {
        key: 'fees-assign',
        title: 'Fees Assign',
        href: '/operations/fees/fees-assign',
        icon: 'lucide:user'
      },
      {
        key: 'collect-fees',
        title: 'Collect Fees',
        href: '/operations/fees/collect-fees',
        icon: 'lucide:graduation-cap'
      }
    ]
  },
  {
    key: 'library',
    title: 'Library',
    href: '/operations/library',
    icon: 'lucide:school',
    children: [
      {
        key: 'members',
        title: 'Library Members',
        href: '/operations/library/members',
        icon: 'lucide:file-chart-column'
      },
      {
        key: 'books',
        title: 'Books',
        href: '/operations/library/books',
        icon: 'lucide:user-round-check'
      },
      {
        key: 'issue-book',
        title: 'Issue Book',
        href: '/operations/library/issue-book',
        icon: 'lucide:calendar-days'
      },
      {
        key: 'return',
        title: 'Return',
        href: '/operations/library/return',
        icon: 'lucide:user'
      }
    ]
  },
  {
    key: 'sports',
    title: 'Sports',
    href: '/operations/sports',
    icon: 'lucide:users'
  },
  {
    key: 'players',
    title: 'Players',
    href: '/operations/players',
    icon: 'lucide:users'
  },
  {
    key: 'hostel',
    title: 'Hostel',
    href: '/operations/hostel',
    icon: 'lucide:badge-check',
    children: [
      {
        key: 'hostel-list',
        title: 'Hostel List',
        href: '/operations/hostel/hostel-list',
        icon: 'lucide:file-chart-column'
      },
      {
        key: 'hostel-room',
        title: 'Hostel Room',
        href: '/operations/hostel/hostel-room',
        icon: 'lucide:user-round-check'
      },
      {
        key: 'room-type',
        title: 'Room Type',
        href: '/operations/hostel/room-type',
        icon: 'lucide:calendar-days'
      }
    ]
  },
  {
    key: 'transport',
    title: 'Transport',
    href: '/operations/transport',
    icon: 'lucide:calendar-minus',
    children: [
      {
        key: 'routes',
        title: 'Routes',
        href: '/operations/transport/routes',
        icon: 'lucide:file-chart-column'
      },
      {
        key: 'pickup-points',
        title: 'Pickup points',
        href: '/operations/transport/pickup-points',
        icon: 'lucide:user-round-check'
      },
      {
        key: 'vehicle-drivers',
        title: 'Vehicle Drivers',
        href: '/operations/transport/vehicle-drivers',
        icon: 'lucide:calendar-days'
      },
      {
        key: 'vehicles',
        title: 'Vehicles',
        href: '/operations/transport/vehicles',
        icon: 'lucide:user-round-check'
      },
      {
        key: 'assign',
        title: 'Assign Vehicles',
        href: '/operations/transport/assign',
        icon: 'lucide:calendar-days'
      }
    ]
  }
]

export const defaultLeftActions: ActionItem[] = [
  {
    key: 'back',
    label: 'Back',
    icon: 'lucide:arrow-left',
    onAction: () => window.history.back()
  },
  {
    key: 'forward',
    label: 'Forward',
    icon: 'lucide:arrow-right',
    onAction: () => window.history.forward()
  }
]

export const defaultRightActions: ActionItem[] = [
  {
    key: 'search',
    label: 'Search',
    icon: 'lucide:search',
    kind: 'search'
  },
  {
    key: 'import',
    label: 'Import',
    icon: 'lucide:upload',
    kind: 'menu'
  },
  {
    key: 'print',
    label: 'Print',
    icon: 'lucide:printer',
    kind: 'menu',
    onAction: () => window.print()
  },
  {
    key: 'export',
    label: 'Export',
    icon: 'lucide:download',
    kind: 'menu'
  },
  {
    key: 'refresh',
    label: 'Refresh',
    icon: 'lucide:refresh-cw',
    kind: 'refresh',
    onAction: () => window.location.reload()
  }
]

export const createLabelsByPageKey: Record<string, string> = {
  'fees-group': 'Add Fees Group',
  'fees-type': 'Add Fees Type',
  'fees-master': 'Add Fees Master',
  'fees-assign': 'Assign New',
  'collect-fees': 'Collect Fees',
  members: 'Add Member',
  books: 'Add Book',
  'issue-book': 'Issue Book',
  return: 'Return Book',
  sports: 'Add Sport',
  players: 'Add Players',
  'hostel-list': 'Add Hostel',
  'hostel-room': 'Add Hostel Rooms',
  'room-type': 'Add Room Type',
  routes: 'Add Route',
  'pickup-points': 'Add Pickup Points',
  'vehicle-drivers': 'Add Drivers',
  vehicles: 'Add Vehicle',
  assign: 'Assign New Vehicle'
}

export const createExcludedPageKeys = new Set<string>()
