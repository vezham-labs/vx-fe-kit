import { useState } from 'react'

import {
  CloseCircle as CloseCircleIcon,
  Logout2 as LogoutIcon,
  Settings as SettingsIcon
} from '@vezham/icons-react'
import {
  Avatar,
  Badge,
  Dropdown,
  ListBox,
  Select,
  Separator,
  Tooltip
} from '@vezham/react-v3'

import {
  DEFAULT_STATUS_OPTION,
  STATUS_OPTIONS,
  STATUS_TIMING_OPTIONS,
  SUGGESTED_STATUS_OPTIONS,
  isColorStatus
} from './data'
import type {
  StatusTimingOption,
  SuggestedStatusOption,
  UserInfo,
  UserStatus,
  UserStatusOption
} from './types'

type Props = {
  user: UserInfo
  onLogout: () => void
  onProfile?: () => void
  onPreferences?: () => void
}

const StatusVisual = ({ status }: { status: UserStatusOption }) => {
  if (isColorStatus(status.id)) {
    return <span className={`h-2 w-2 rounded-full ${status.color ?? ''}`} />
  }

  return <span className="text-xs">{status.icon}</span>
}

const UserMenu = ({ user, onLogout, onProfile, onPreferences }: Props) => {
  const [userStatus, setUserStatus] = useState<UserStatus>('active')
  const [selectedStatus, setSelectedStatus] = useState<SuggestedStatusOption>()
  const [selectedTiming, setSelectedTiming] = useState<StatusTimingOption>()

  const currentStatus =
    STATUS_OPTIONS.find(status => status.id === userStatus) ??
    DEFAULT_STATUS_OPTION

  const tooltipText = selectedStatus
    ? `${selectedStatus.emoji} ${selectedStatus.label}${
        selectedTiming ? ` • ${selectedTiming.label}` : ''
      }`
    : `${user.name} - ${currentStatus.icon} ${currentStatus.label}`

  return (
    <Dropdown>
      <Tooltip delay={0}>
        <Tooltip.Trigger>
          <Dropdown.Trigger
            aria-label={`Open ${user.name || 'user'} menu`}
            className="button button--ghost relative flex h-12 w-12 items-center justify-center rounded-xl">
            <Badge.Anchor>
              <Avatar size="sm" className="rounded-xl">
                {user.avatar ? (
                  <Avatar.Image src={user.avatar} alt={user.name} />
                ) : null}
                <Avatar.Fallback>{user.name?.[0]}</Avatar.Fallback>
              </Avatar>
              <Badge
                placement="bottom-right"
                size="sm"
                className="border-background flex items-center justify-center border">
                <StatusVisual status={currentStatus} />
              </Badge>
            </Badge.Anchor>
          </Dropdown.Trigger>
        </Tooltip.Trigger>
        <Tooltip.Content placement="right">{tooltipText}</Tooltip.Content>
      </Tooltip>

      <Dropdown.Popover placement="right" className="min-w-72">
        <button
          type="button"
          className="hover:bg-default-100 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left"
          onClick={onProfile}>
          <Avatar size="sm">
            {user.avatar ? (
              <Avatar.Image src={user.avatar} alt={user.name} />
            ) : null}
            <Avatar.Fallback>{user.name?.[0]}</Avatar.Fallback>
          </Avatar>
          <span>
            <span className="block font-medium">{user.name}</span>
            <span className="text-muted flex items-center gap-1 text-xs">
              <StatusVisual status={currentStatus} />
              {currentStatus.label}
            </span>
          </span>
        </button>

        <Separator />

        <div className="flex flex-col gap-1 p-2">
          <Select
            aria-label="Availability"
            selectedKey={userStatus}
            onSelectionChange={key => {
              const status = STATUS_OPTIONS.find(option => option.id === key)
              if (status) setUserStatus(status.id)
            }}>
            <Select.Trigger className="h-9 border-none bg-transparent shadow-none">
              <Select.Value>{currentStatus.label}</Select.Value>
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover placement="right">
              <ListBox>
                {STATUS_OPTIONS.map(status => (
                  <ListBox.Item key={status.id} id={status.id}>
                    <div className="flex items-center gap-2">
                      <StatusVisual status={status} />
                      {status.label}
                    </div>
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>

          <Select
            aria-label="Custom status"
            placeholder="Update your status"
            selectedKey={selectedStatus?.id ?? null}
            onSelectionChange={key => {
              if (key === 'clear') {
                setSelectedStatus(undefined)
                setSelectedTiming(undefined)
                return
              }

              const status = SUGGESTED_STATUS_OPTIONS.find(
                option => option.id === key
              )
              if (!status) return

              setSelectedStatus(status)
              setSelectedTiming(STATUS_TIMING_OPTIONS[0])
            }}>
            <Select.Trigger className="h-9 border-none bg-transparent shadow-none">
              <Select.Value>
                {selectedStatus
                  ? `${selectedStatus.emoji} ${selectedStatus.label}`
                  : 'Update your status'}
              </Select.Value>
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover placement="right">
              <ListBox>
                {SUGGESTED_STATUS_OPTIONS.map(status => (
                  <ListBox.Item key={status.id} id={status.id}>
                    {status.emoji} {status.label}
                  </ListBox.Item>
                ))}
                <ListBox.Item id="clear" textValue="Clear status">
                  <span className="text-danger flex items-center gap-2">
                    <CloseCircleIcon size={18} aria-hidden="true" />
                    Clear status
                  </span>
                </ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>

          {selectedStatus ? (
            <Select
              aria-label="Status duration"
              selectedKey={selectedTiming?.id ?? null}
              onSelectionChange={key => {
                const timing = STATUS_TIMING_OPTIONS.find(
                  option => option.id === key
                )
                if (timing) setSelectedTiming(timing)
              }}>
              <Select.Trigger className="h-9 border-none bg-transparent shadow-none">
                <Select.Value>
                  {selectedTiming?.label ?? 'Select duration'}
                </Select.Value>
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover placement="right">
                <ListBox>
                  {STATUS_TIMING_OPTIONS.map(timing => (
                    <ListBox.Item key={timing.id} id={timing.id}>
                      {timing.label}
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>
          ) : null}
        </div>

        <Separator />

        <Dropdown.Menu aria-label="User actions">
          <Dropdown.Item onPress={onPreferences}>
            <SettingsIcon size={18} aria-hidden="true" />
            Preferences
          </Dropdown.Item>
          <Dropdown.Item onPress={onLogout} className="text-danger">
            <LogoutIcon size={18} aria-hidden="true" />
            Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  )
}

export { UserMenu }
