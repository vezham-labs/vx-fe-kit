import { getNavigationChildren } from '@generated/navigation'

import type { AcademicMenuItem } from './types'

export const operationsSidebarItems: AcademicMenuItem[] =
  getNavigationChildren('operations')

export const operationsCreateLabelsByPageKey: Record<string, string> = {
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

export const operationsCreateExcludedPageKeys = new Set<string>()
