import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { SettingsPage } from '@vx/react/pages/settings'

const DemoSettings = () => {
  const navigate = useNavigate()
  return <SettingsPage onBack={() => navigate({ to: '/' })} />
}

export const Route = createFileRoute('/settings')({
  component: DemoSettings
})
