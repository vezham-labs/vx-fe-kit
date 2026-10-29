import { Link as VLink, useNavigate } from '@tanstack/react-router'

import { lib } from '@vezham/lib'
import { LibReact } from '@vezham/lib-react'
import { Link } from '@vezham/react-v3'
import { Home } from '@vezham/template/pages'

export default () => {
  const navigate = useNavigate()

  return (
    <>
      <LibReact />
      {lib()}
      <VLink to="/pro" className="link">
        Open Pro page
        <Link.Icon />
      </VLink>

      <Link onPress={() => navigate({ to: '/pro' })}>
        <Link.Icon />
        Navigate with Vezham UI
        <Link.Icon />
      </Link>

      <Home onPress={() => navigate({ to: '/pro' })} />
    </>
  )
}
