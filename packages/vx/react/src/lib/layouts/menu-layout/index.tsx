import { useMediaQuery } from '@vezham/react-v3'

import type { AppNavigationItem } from '../../navigation'
import { MenuMD } from './index-md'
import { MenuSM } from './index-sm'

const MenuLayout = ({ items }: { items: AppNavigationItem[] }) => {
  const isMobile = useMediaQuery('(max-width: 767px)')

  if (isMobile) {
    return <MenuSM items={items} />
  } else {
    return <MenuMD items={items} />
  }
}

export { MenuLayout }
