import { useHotkey } from '@tanstack/react-hotkeys'
import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'

import { useCommand } from '../command'
import { useInfoPanel } from '../panel/info-panel'

type WorkspaceNavigationContextValue = {
  isNavigationCollapsed: boolean
  collapseNavigation: () => void
  expandNavigation: () => void
  toggleNavigation: () => void
  registerSidebarShortcut: (handler: () => void) => () => void
}

const WorkspaceNavigationContext =
  createContext<WorkspaceNavigationContextValue | null>(null)

/**
 * Coordinates every persistent navigation surface in the application. Keeping
 * this state in one provider means a collapse starts as one React update rather
 * than each sidebar reacting independently.
 */
const WorkspaceNavigationProvider = ({ children }: { children: ReactNode }) => {
  const [isNavigationCollapsed, setIsNavigationCollapsed] = useState(false)
  const { closeInfoPanel } = useInfoPanel()
  const { closeCommand } = useCommand()
  const sidebarShortcutHandlers = useRef(new Set<() => void>())

  const registerSidebarShortcut = useCallback((handler: () => void) => {
    sidebarShortcutHandlers.current.add(handler)
    return () => {
      sidebarShortcutHandlers.current.delete(handler)
    }
  }, [])

  const collapseNavigation = useCallback(() => {
    setIsNavigationCollapsed(true)
    closeInfoPanel()
    closeCommand()
  }, [closeCommand, closeInfoPanel])

  const expandNavigation = useCallback(() => {
    setIsNavigationCollapsed(false)
  }, [])

  const toggleNavigation = useCallback(() => {
    setIsNavigationCollapsed(isCollapsed => !isCollapsed)
    closeInfoPanel()
    closeCommand()
  }, [closeCommand, closeInfoPanel])

  useHotkey('Meta+S', () => {
    const handlers = [...sidebarShortcutHandlers.current]
    const handler = handlers[handlers.length - 1] ?? toggleNavigation
    handler()
  })

  const value = useMemo(
    () => ({
      isNavigationCollapsed,
      collapseNavigation,
      expandNavigation,
      toggleNavigation,
      registerSidebarShortcut
    }),
    [
      collapseNavigation,
      expandNavigation,
      isNavigationCollapsed,
      toggleNavigation,
      registerSidebarShortcut
    ]
  )

  return (
    <WorkspaceNavigationContext.Provider value={value}>
      {children}
    </WorkspaceNavigationContext.Provider>
  )
}

export { WorkspaceNavigationProvider }

export const useWorkspaceNavigation = () => {
  const context = useContext(WorkspaceNavigationContext)

  if (!context) {
    throw new Error(
      'useWorkspaceNavigation must be used within WorkspaceNavigationProvider'
    )
  }

  return context
}

export const useSidebarShortcut = (handler: () => void, enabled = true) => {
  const { registerSidebarShortcut } = useWorkspaceNavigation()
  useEffect(() => {
    if (enabled) return registerSidebarShortcut(handler)
    return undefined
  }, [enabled, handler, registerSidebarShortcut])
}
