import type { AcademicMenuItem, ActionItem } from './types'

export const operationsSidebarItems: AcademicMenuItem[] = [
  {
    key: 'fees',
    title: 'Fees Collections',
    href: '/operations/fees',
    icon: 'vx:calendar-check',
    children: [
      {
        key: 'fees-group',
        title: 'Fees Group',
        href: '/operations/fees/fees-group',
        icon: 'vx:report'
      },
      {
        key: 'fees-type',
        title: 'Fees Type',
        href: '/operations/fees/fees-type',
        icon: 'vx:user-round-check'
      },
      {
        key: 'fees-master',
        title: 'Fees Master',
        href: '/operations/fees/fees-master',
        icon: 'vx:calendar-days'
      },
      {
        key: 'fees-assign',
        title: 'Fees Assign',
        href: '/operations/fees/fees-assign',
        icon: 'vx:user'
      },
      {
        key: 'collect-fees',
        title: 'Collect Fees',
        href: '/operations/fees/collect-fees',
        icon: 'vx:academic-cap'
      }
    ]
  },
  {
    key: 'library',
    title: 'Library',
    href: '/operations/library',
    icon: 'vx:school',
    children: [
      {
        key: 'members',
        title: 'Library Members',
        href: '/operations/library/members',
        icon: 'vx:report'
      },
      {
        key: 'books',
        title: 'Books',
        href: '/operations/library/books',
        icon: 'vx:user-round-check'
      },
      {
        key: 'issue-book',
        title: 'Issue Book',
        href: '/operations/library/issue-book',
        icon: 'vx:calendar-days'
      },
      {
        key: 'return',
        title: 'Return',
        href: '/operations/library/return',
        icon: 'vx:user'
      }
    ]
  },
  {
    key: 'sports',
    title: 'Sports',
    href: '/operations/sports',
    icon: 'vx:users'
  },
  {
    key: 'players',
    title: 'Players',
    href: '/operations/players',
    icon: 'vx:users'
  },
  {
    key: 'hostel',
    title: 'Hostel',
    href: '/operations/hostel',
    icon: 'vx:verified',
    children: [
      {
        key: 'hostel-list',
        title: 'Hostel List',
        href: '/operations/hostel/hostel-list',
        icon: 'vx:report'
      },
      {
        key: 'hostel-room',
        title: 'Hostel Room',
        href: '/operations/hostel/hostel-room',
        icon: 'vx:user-round-check'
      },
      {
        key: 'room-type',
        title: 'Room Type',
        href: '/operations/hostel/room-type',
        icon: 'vx:calendar-days'
      }
    ]
  },
  {
    key: 'transport',
    title: 'Transport',
    href: '/operations/transport',
    icon: 'vx:calendar-minus',
    children: [
      {
        key: 'routes',
        title: 'Routes',
        href: '/operations/transport/routes',
        icon: 'vx:report'
      },
      {
        key: 'pickup-points',
        title: 'Pickup points',
        href: '/operations/transport/pickup-points',
        icon: 'vx:user-round-check'
      },
      {
        key: 'vehicle-drivers',
        title: 'Vehicle Drivers',
        href: '/operations/transport/vehicle-drivers',
        icon: 'vx:calendar-days'
      },
      {
        key: 'vehicles',
        title: 'Vehicles',
        href: '/operations/transport/vehicles',
        icon: 'vx:user-round-check'
      },
      {
        key: 'assign',
        title: 'Assign Vehicles',
        href: '/operations/transport/assign',
        icon: 'vx:calendar-days'
      }
    ]
  }
]

export const defaultLeftActions: ActionItem[] = [
  {
    key: 'back',
    label: 'Back',
    icon: 'vx:arrow-left',
    onAction: () => window.history.back()
  },
  {
    key: 'forward',
    label: 'Forward',
    icon: 'vx:arrow-right',
    onAction: () => window.history.forward()
  }
]

export const defaultRightActions: ActionItem[] = [
  {
    key: 'search',
    label: 'Search',
    icon: 'vx:search',
    kind: 'search'
  },
  {
    key: 'import',
    label: 'Import',
    icon: 'vx:upload',
    kind: 'menu'
  },
  {
    key: 'print',
    label: 'Print',
    icon: 'vx:printer',
    kind: 'menu',
    onAction: () => window.print()
  },
  {
    key: 'export',
    label: 'Export',
    icon: 'vx:download',
    kind: 'menu'
  },
  {
    key: 'refresh',
    label: 'Refresh',
    icon: 'vx:refresh',
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
