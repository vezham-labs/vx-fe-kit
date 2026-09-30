import { createLazyFileRoute } from '@tanstack/react-router'

import Page from '@pages/sidebar'

export const Route = createLazyFileRoute('/sidebar')({
  component: Page
})
