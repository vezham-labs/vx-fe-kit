import type { ReactNode } from 'react'

import { AppFrame } from '../app'

export const SettingsLayout = ({ children }: { children: ReactNode }) => (
  <AppFrame contentClassName="p-0 overflow-hidden">{children}</AppFrame>
)
