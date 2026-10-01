import { toast } from '@vezham/react-v3'

import { getLayoutRightActions } from '../src/pages/_shared/layout-actions'

describe('configured section toolbar', () => {
  it('shows a notice for Sync', () => {
    const notice = vi.spyOn(toast, 'info').mockReturnValue('sync-notice')
    try {
      getLayoutRightActions(
        '/academic/classes/allclasses',
        'academic',
        'allclasses'
      )
        .find(action => action.kind === 'sync')
        ?.onAction?.()
      expect(notice).toHaveBeenCalledWith('Server sync is not implemented yet.')
    } finally {
      notice.mockRestore()
    }
  })
  it.each([
    ['/academic/classes/allclasses', 'academic', 'allclasses', 'Add Class'],
    ['/academic/classes/schedule', 'academic', 'schedule', 'Add Schedule'],
    ['/operations/fees/fees-assign', 'operations', 'fees-assign', 'Assign New']
  ])(
    'uses configured labels and preserves create events for %s',
    (pathname, prefix, pageKey, label) => {
      const actions = getLayoutRightActions(pathname, prefix, pageKey)
      const create = actions.find(action => action.kind === 'primary')
      expect(create?.label).toBe(label)
      const listener = vi.fn()
      const event = `${prefix}:${pageKey}:create`
      window.addEventListener(event, listener)
      try {
        create?.onAction?.()
        expect(listener).toHaveBeenCalledOnce()
      } finally {
        window.removeEventListener(event, listener)
      }
    }
  )

  it.each([
    ['/academic/examinations/exam-attendance', 'academic', 'exam-attendance'],
    ['/academic/examinations/exam-results', 'academic', 'exam-results'],
    ['/reports/attendance/attendance-report', 'reports', 'attendance-report']
  ])(
    'disables Add while retaining inherited controls on %s',
    (pathname, prefix, pageKey) => {
      const actions = getLayoutRightActions(pathname, prefix, pageKey)
      expect(actions.some(action => action.kind === 'primary')).toBe(false)
      expect(actions.some(action => action.kind === 'search')).toBe(true)
      expect(actions.some(action => action.kind === 'sync')).toBe(true)
      expect(
        actions
          .find(action => action.key === 'export')
          ?.children?.map(action => action.key)
      ).toEqual(['export-pdf', 'export-excel'])
    }
  )
})
