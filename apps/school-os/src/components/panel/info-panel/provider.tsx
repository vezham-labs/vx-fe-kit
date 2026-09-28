import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'

import { ActiveInfoPanel, InfoPanelContextValue } from './types'

const InfoPanelContext = createContext<InfoPanelContextValue | null>(null)
const STORAGE_KEY = 'school:info-panel'
const VALID_INFO_PANELS: Array<Exclude<ActiveInfoPanel, null>> = [
  'bookmarks',
  'disc',
  'ai'
]

interface StoredInfoPanelState {
  activeInfoPanel: ActiveInfoPanel
  isOpen: boolean
}

const isInfoPanel = (panel: unknown): panel is Exclude<ActiveInfoPanel, null> =>
  typeof panel === 'string' &&
  VALID_INFO_PANELS.includes(panel as Exclude<ActiveInfoPanel, null>)

const readStoredInfoPanelState = (): StoredInfoPanelState => {
  if (typeof window === 'undefined') {
    return { activeInfoPanel: null, isOpen: false }
  }

  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEY)

    if (!storedValue) {
      return { activeInfoPanel: null, isOpen: false }
    }

    const parsedValue = JSON.parse(storedValue) as Partial<StoredInfoPanelState>
    const activeInfoPanel = isInfoPanel(parsedValue.activeInfoPanel)
      ? parsedValue.activeInfoPanel
      : null

    return {
      activeInfoPanel,
      isOpen: Boolean(parsedValue.isOpen && activeInfoPanel)
    }
  } catch {
    return { activeInfoPanel: null, isOpen: false }
  }
}

export function InfoPanelProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<StoredInfoPanelState>(
    readStoredInfoPanelState
  )
  const { activeInfoPanel, isOpen } = state

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const setActiveInfoPanel = useCallback((panel: ActiveInfoPanel) => {
    setState({
      activeInfoPanel: panel,
      isOpen: Boolean(panel)
    })
  }, [])

  const openInfoPanel = useCallback(
    (panel: Exclude<ActiveInfoPanel, null>) =>
      setState({ activeInfoPanel: panel, isOpen: true }),
    []
  )

  const closeInfoPanel = useCallback(() => {
    setState(current => ({ ...current, isOpen: false }))
  }, [])

  const toggleInfoPanel = useCallback(
    (panel: Exclude<ActiveInfoPanel, null>) => {
      setState(current =>
        current.activeInfoPanel === panel && current.isOpen
          ? { ...current, isOpen: false }
          : { activeInfoPanel: panel, isOpen: true }
      )
    },
    []
  )

  const value = useMemo(
    () => ({
      activeInfoPanel,
      isOpen,
      setActiveInfoPanel,
      openInfoPanel,
      closeInfoPanel,
      toggleInfoPanel
    }),
    [
      activeInfoPanel,
      closeInfoPanel,
      isOpen,
      openInfoPanel,
      setActiveInfoPanel,
      toggleInfoPanel
    ]
  )

  return (
    <InfoPanelContext.Provider value={value}>
      {children}
    </InfoPanelContext.Provider>
  )
}

export function useInfoPanel() {
  const context = useContext(InfoPanelContext)

  if (!context) {
    throw new Error('useInfoPanel must be used within InfoPanelProvider')
  }

  return context
}
