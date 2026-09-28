'use client'

import { useEffect, useState } from 'react'

import { Button, Input, Tabs } from '@vezham/react-v3'

import { useUser } from '../../../../../../store/users/useUserStore'

const Index = () => {
  const { user, updateUser, clearUser } = useUser()

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: ''
  })

  const isChanged =
    form.firstName !== user?.firstName ||
    form.lastName !== user?.lastName ||
    form.email !== user?.email

  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || ''
      })
    }
  }, [user])

  const handleChange = (
    key: 'firstName' | 'lastName' | 'email',
    value: string
  ) => {
    setForm(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSave = () => {
    updateUser(form)
  }

  const handleDelete = () => {
    clearUser()
  }

  return (
    <div>
      <Tabs
        className="w-full"
        variant="secondary"
        defaultSelectedKey="main-profile">
        <Tabs.ListContainer>
          <Tabs.List aria-label="Options">
            <Tabs.Tab id="main-profile">
              Main Profiles
              <Tabs.Indicator />
            </Tabs.Tab>
            <Tabs.Tab id="per-profile">
              Space Profiles
              <Tabs.Indicator />
            </Tabs.Tab>
          </Tabs.List>
        </Tabs.ListContainer>

        <Tabs.Panel className="pt-6" id="main-profile">
          <div className="max-w-xl space-y-6">
            <h2 className="text-xl font-semibold">Profile</h2>

            <div className="grid gap-6">
              <Input
                placeholder="First Name"
                value={form.firstName}
                onChange={e => handleChange('firstName', e.target.value)}
                className="mt-1 w-full rounded-lg"
              />

              <Input
                placeholder="Last Name"
                value={form.lastName}
                onChange={e => handleChange('lastName', e.target.value)}
                className="mt-1 w-full rounded-lg"
              />

              <Input
                placeholder="Email"
                type="email"
                value={form.email}
                onChange={e => handleChange('email', e.target.value)}
                className="mt-1 w-full rounded-lg"
              />
            </div>

            <div className="flex items-center justify-between pt-4">
              <Button isDisabled={!isChanged} onPress={handleSave}>
                Save Changes
              </Button>
              <Button
                className="rounded-xl"
                variant="danger"
                onPress={handleDelete}>
                Delete Account
              </Button>
            </div>
          </div>
        </Tabs.Panel>

        <Tabs.Panel className="pt-4" id="per-profile">
          <p>Per-server profile settings here</p>
        </Tabs.Panel>
      </Tabs>
    </div>
  )
}

export default Index
