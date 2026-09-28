import { useMediaQuery } from '@vezham/react-v3'

import MenuMD from './index-md'
import MenuSM from './index-sm'

const MenuLayout = () => {
  const isMobile = useMediaQuery('(max-width: 767px)')

  if (isMobile) {
    return <MenuSM />
  } else {
    return <MenuMD />
  }
}

export default MenuLayout
