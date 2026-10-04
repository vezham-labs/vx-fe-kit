import { useTheme } from '@vezham/docs-react/provider/base'
import { Moon, Sun } from '@vezham/icons-react'
import { Button } from '@vezham/react-v3'

import { controlCenterTileVariants } from '@components/docs/control-center.variants'

const tile = controlCenterTileVariants()

export const AppearanceLitePanel = () => {
  const { resolvedTheme, setTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'
  const AppearanceIcon = isDark ? Moon : Sun

  return (
    <Button
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} appearance`}
      className={tile.button({ compact: true })}
      isIconOnly
      variant="ghost"
      onPress={() => setTheme(isDark ? 'light' : 'dark')}>
      <AppearanceIcon size={20} />
    </Button>
  )
}
