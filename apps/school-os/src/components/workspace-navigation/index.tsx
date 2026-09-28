import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react'

import { useCommand } from '../command'
import { useInfoPanel } from '../panel/info-panel'

type WorkspaceNavigationContextValue = {
  isNavigationCollapsed: boolean
  collapseNavigation: () => void
  expandNavigation: () => void
  toggleNavigation: () => void
}

const WorkspaceNavigationContext =
  createContext<WorkspaceNavigationContextValue | null>(null)

/**
 * Coordinates every persistent navigation surface in the School app. Keeping
 * this state in one provider means a collapse starts as one React update rather
 * than each sidebar reacting independently.
 */
export function WorkspaceNavigationProvider({
  children
}: {
  children: ReactNode
}) {
  const [isNavigationCollapsed, setIsNavigationCollapsed] = useState(false)
  const { closeInfoPanel } = useInfoPanel()
  const { closeCommand } = useCommand()

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

  const value = useMemo(
    () => ({
      isNavigationCollapsed,
      collapseNavigation,
      expandNavigation,
      toggleNavigation
    }),
    [
      collapseNavigation,
      expandNavigation,
      isNavigationCollapsed,
      toggleNavigation
    ]
  )

  return (
    <WorkspaceNavigationContext.Provider value={value}>
      {children}
    </WorkspaceNavigationContext.Provider>
  )
}

export function useWorkspaceNavigation() {
  const context = useContext(WorkspaceNavigationContext)

  if (!context) {
    throw new Error(
      'useWorkspaceNavigation must be used within WorkspaceNavigationProvider'
    )
  }

  return context
}
