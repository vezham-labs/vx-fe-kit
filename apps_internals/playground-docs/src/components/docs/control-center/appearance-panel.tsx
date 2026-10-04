import { useTheme } from '@vezham/docs-react/provider/base'
import { Moon, Sun } from '@vezham/icons-react'
import { Button } from '@vezham/react-v3'

import { controlCenterTileVariants } from '@components/docs/control-center.variants'

const tile = controlCenterTileVariants()

export const AppearancePanel = () => {
  const { resolvedTheme, setTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'
  const AppearanceIcon = isDark ? Moon : Sun

  return (
    <Button
      className={tile.button()}
      variant="ghost"
      onPress={() => setTheme(isDark ? 'light' : 'dark')}>
      <span className={tile.content()}>
        <span className={tile.icon()}>
          <AppearanceIcon size={16} />
        </span>
        <span className={tile.title()}>Appearance</span>
      </span>
    </Button>
  )
}
