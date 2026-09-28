import { useState } from 'react'

import {
  Bell as BellIcon,
  CloseCircle as CloseCircleIcon,
  Logout2 as Logout2Icon,
  MenuDots as MenuDotsIcon,
  QuestionCircle as QuestionCircleIcon,
  Settings as SettingsIcon
} from '@vezham/icons-react'
import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  ListBox,
  Select,
  Separator,
  Surface,
  Tooltip
} from '@vezham/react-v3'

import { useUser } from '@store/users/useUserStore'

import UserInfoModal from './preferences/modal'
import { FooterActionsProps } from './types'

type UserStatus = 'active' | 'away' | 'idle' | 'busy' | 'dnd'

const STATUS_OPTIONS = [
  { id: 'active', label: 'Available', icon: '🟢', color: 'bg-success' },
  { id: 'away', label: 'Away', icon: '🌙', color: 'bg-warning' },
  { id: 'idle', label: 'Idle', icon: '💤', color: 'bg-primary' },
  { id: 'busy', label: 'Busy', icon: '🔴', color: 'bg-danger' },
  { id: 'dnd', label: 'Do not disturb', icon: '⛔', color: 'bg-muted' }
]

const isColorStatus = (status?: UserStatus) =>
  status === 'active' || status === 'away' || status === 'busy'

export default function Footer({
  user,
  showAI = false,
  showControlCenter = false,
  showNotifications = false,
  showUserInfo = true,
  notificationCount = 0,
  onAI,
  onControlCenterClick,
  onNotificationsClick,
  onUserClick,
  className
}: FooterActionsProps) {
  const { clearUser } = useUser()

  const [userStatus, setUserStatus] = useState<UserStatus>('active')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const currentStatus = STATUS_OPTIONS.find(s => s.id === userStatus)

  const [selectedStatus, setSelectedStatus] = useState<any>(null)
  const [selectedTiming, setSelectedTiming] = useState<any>(null)

  const [isStatusOpen, setIsStatusOpen] = useState(false)
  const [isTimingOpen, setIsTimingOpen] = useState(false)

  const suggestedStatuses = [
    { id: 'meeting', label: 'In a meeting', emoji: '🗓️' },
    { id: 'commuting', label: 'Commuting', emoji: '🚌' },
    { id: 'sick', label: 'Out sick', emoji: '🤒' },
    { id: 'vacation', label: 'Vacationing', emoji: '🌴' },
    { id: 'remote', label: 'Working remotely', emoji: '🏡' }
  ]

  const timingOptions = [
    { id: '15min', label: 'For 15 Minutes' },
    { id: '1hour', label: 'For 1 Hour' },
    { id: '8hours', label: 'For 8 Hours' },
    { id: '24hours', label: 'For 24 Hours' },
    { id: '3days', label: 'For 3 Days' },
    { id: 'forever', label: 'Forever' }
  ]

  const renderStatusVisual = (status: any) => {
    if (!status) return null
    return isColorStatus(status.id) ? (
      <span className={`h-2 w-2 rounded-full ${status.color}`} />
    ) : (
      <span className="text-xs">{status.icon}</span>
    )
  }

  const renderBadgeContent = () => {
    if (!currentStatus) return null
    return isColorStatus(userStatus) ? (
      <span className={`h-2 w-2 rounded-full ${currentStatus.color}`} />
    ) : (
      <span className="text-[10px]">{currentStatus.icon}</span>
    )
  }

  const getStatusDisplayText = () => {
    if (!selectedStatus) return ''
    if (!selectedTiming)
      return `${selectedStatus.emoji} ${selectedStatus.label}`
    return `${selectedStatus.emoji} ${selectedStatus.label} • ${selectedTiming.label}`
  }

  const tooltipText = selectedStatus
    ? getStatusDisplayText()
    : `${user?.name} - ${currentStatus?.icon} ${currentStatus?.label}`

  const onCurrentUserClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsModalOpen(true)
  }

  return (
    <>
      <Separator className="hidden md:block" />

      <Surface variant="transparent" className={className}>
        <div className="hidden flex-row items-center justify-center gap-3 min-[500px]:flex md:flex-col md:gap-6">
          {/* AI */}
          {showAI && (
            <Tooltip delay={0}>
              <Tooltip.Trigger>
                <QuestionCircleIcon
                  className="text-muted cursor-pointer"
                  size={24}
                  onClick={onAI}
                  aria-hidden="true"
                />
              </Tooltip.Trigger>
              <Tooltip.Content placement="right">AI</Tooltip.Content>
            </Tooltip>
          )}

          {/* Control Center */}
          {showControlCenter && (
            <Tooltip delay={0}>
              <Tooltip.Trigger>
                <SettingsIcon
                  className="text-muted cursor-pointer"
                  size={24}
                  onClick={onControlCenterClick}
                  aria-hidden="true"
                />
              </Tooltip.Trigger>
              <Tooltip.Content placement="right">
                Control Center
              </Tooltip.Content>
            </Tooltip>
          )}

          {/* Notifications */}
          {showNotifications && (
            <Tooltip delay={0}>
              <Tooltip.Trigger>
                <BellIcon
                  className="text-muted cursor-pointer"
                  size={24}
                  onClick={onNotificationsClick}
                  aria-hidden="true"
                />
              </Tooltip.Trigger>
              <Tooltip.Content placement="right">Notifications</Tooltip.Content>
            </Tooltip>
          )}

          {/* USER */}
          {showUserInfo && (
            <Dropdown>
              <Tooltip delay={0}>
                <Tooltip.Trigger>
                  <Dropdown.Trigger>
                    <Button
                      isIconOnly
                      variant="ghost"
                      className="h-12 w-12 rounded-xl">
                      <Badge.Anchor>
                        <Avatar size="sm" className="rounded-xl">
                          <Avatar.Image src={user?.avatar} />
                          <Avatar.Fallback>{user?.name?.[0]}</Avatar.Fallback>
                        </Avatar>

                        <Badge
                          placement="bottom-right"
                          size="sm"
                          className="border-background flex items-center justify-center border">
                          {renderBadgeContent()}
                        </Badge>
                      </Badge.Anchor>
                    </Button>
                  </Dropdown.Trigger>
                </Tooltip.Trigger>

                <Tooltip.Content placement="right">
                  {tooltipText}
                </Tooltip.Content>
              </Tooltip>

              <Dropdown.Popover placement="right">
                <div
                  className="hover:bg-default-100 flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2"
                  onClick={onCurrentUserClick}>
                  <Avatar size="sm">
                    <Avatar.Image src={user?.avatar} />
                    <Avatar.Fallback>{user?.name?.[0]}</Avatar.Fallback>
                  </Avatar>

                  <div>
                    <div className="font-medium">{user?.name}</div>
                    <div className="text-muted flex items-center gap-1 text-xs">
                      {renderStatusVisual(currentStatus)}
                      {currentStatus?.label}
                    </div>
                  </div>
                </div>

                <Dropdown.Menu>
                  <Separator />

                  <Dropdown.Item className="mt-2 w-full p-0" variant="text">
                    <Select
                      className="w-full"
                      value={userStatus}
                      onChange={v => setUserStatus(v as UserStatus)}>
                      <Select.Trigger className="h-8 border-none bg-transparent shadow-none">
                        <Select.Value />
                        <Select.Indicator />
                      </Select.Trigger>

                      <Select.Popover>
                        <ListBox>
                          {STATUS_OPTIONS.map(s => (
                            <ListBox.Item key={s.id} id={s.id}>
                              <div className="flex items-center gap-2">
                                {renderStatusVisual(s)}
                                {s.label}
                              </div>
                            </ListBox.Item>
                          ))}
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  </Dropdown.Item>

                  <Dropdown.Item className="p-0">
                    <Select
                      className="w-full border-none shadow-none"
                      selectedKeys={selectedStatus ? [selectedStatus.id] : []}
                      open={isStatusOpen}
                      onOpenChange={setIsStatusOpen}
                      onSelectionChange={key => {
                        if (key === 'clear') {
                          setSelectedStatus(null)
                          setSelectedTiming(null)
                          setIsStatusOpen(false)
                          return
                        }
                        const status = suggestedStatuses.find(s => s.id === key)
                        if (status) {
                          setSelectedStatus(status)
                          const defaultTiming = timingOptions.find(
                            t => t.id === '15min'
                          )
                          setSelectedTiming(defaultTiming)
                          setIsStatusOpen(false)
                        }
                      }}>
                      <Select.Trigger className="flex w-full items-center justify-between border-none bg-transparent px-3 py-2 shadow-none ring-0 outline-none focus:ring-0 focus:outline-none">
                        <Select.Value>
                          {selectedStatus
                            ? `${selectedStatus.emoji} ${selectedStatus.label}`
                            : 'Update your status'}
                        </Select.Value>
                        <Select.Indicator />
                      </Select.Trigger>
                      <Select.Popover placement="right">
                        <ListBox>
                          {suggestedStatuses.map(s => (
                            <ListBox.Item key={s.id} id={s.id}>
                              {s.emoji} {s.label}
                            </ListBox.Item>
                          ))}
                          <ListBox.Item key="clear" id="clear">
                            <div className="text-danger flex items-center gap-2">
                              <CloseCircleIcon
                                className="text-danger text-base"
                                size="1em"
                                weight="filled"
                                aria-hidden="true"
                              />
                              Clear status
                            </div>
                          </ListBox.Item>
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  </Dropdown.Item>
                  {selectedStatus && (
                    <Dropdown.Item className="my-1 p-0" variant="text">
                      <Select
                        className="w-full"
                        selectedKeys={selectedTiming ? [selectedTiming.id] : []}
                        open={isTimingOpen}
                        onOpenChange={setIsTimingOpen}
                        onSelectionChange={key => {
                          const timing = timingOptions.find(t => t.id === key)

                          if (timing) {
                            setSelectedTiming(timing)
                            setIsTimingOpen(false)
                            setIsDropdownOpen(false)
                          }
                        }}>
                        <Select.Trigger className="flex w-full items-center justify-between border-none bg-transparent px-3 py-2 shadow-none ring-0 outline-none focus:ring-0 focus:outline-none">
                          <Select.Value>
                            {selectedTiming
                              ? selectedTiming.label
                              : 'Select duration'}
                          </Select.Value>
                          <Select.Indicator />
                        </Select.Trigger>

                        <Select.Popover placement="right">
                          <ListBox>
                            {timingOptions.map(t => (
                              <ListBox.Item key={t.id} id={t.id}>
                                {t.label}
                              </ListBox.Item>
                            ))}
                          </ListBox>
                        </Select.Popover>
                      </Select>
                    </Dropdown.Item>
                  )}

                  <Separator />

                  <Dropdown.Item onPress={() => onUserClick?.(user)}>
                    <SettingsIcon size={20} aria-hidden="true" />
                    Preferences
                  </Dropdown.Item>

                  <Separator />

                  <Dropdown.Item onPress={clearUser} className="text-danger">
                    <Logout2Icon size={20} aria-hidden="true" />
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          )}
        </div>
        <div className="flex items-center gap-3 min-[500px]:hidden">
          <Dropdown>
            <Dropdown.Trigger>
              <MenuDotsIcon
                size={24}
                className="text-muted"
                aria-hidden="true"
              />
            </Dropdown.Trigger>
            <Dropdown.Popover>
              <Dropdown.Menu>
                {showControlCenter && (
                  <Dropdown.Item onPress={onControlCenterClick}>
                    <SettingsIcon size={24} aria-hidden="true" />
                    Control Center
                  </Dropdown.Item>
                )}
                {showNotifications && (
                  <Dropdown.Item
                    onPress={onNotificationsClick}
                    endContent={
                      notificationCount > 0 && (
                        <Badge
                          content={notificationCount}
                          color="danger"
                          size="sm"
                        />
                      )
                    }>
                    <BellIcon size={24} aria-hidden="true" />
                    Notifications
                  </Dropdown.Item>
                )}
                {showAI && (
                  <Dropdown.Item onPress={onAI}>
                    <QuestionCircleIcon size={24} aria-hidden="true" />
                    Help
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>

          {showUserInfo && (
            <Dropdown>
              <Tooltip delay={0}>
                <Tooltip.Trigger>
                  <Dropdown.Trigger>
                    <Button
                      isIconOnly
                      variant="ghost"
                      className="h-12 w-12 rounded-xl">
                      <Badge.Anchor>
                        <Avatar size="sm" className="rounded-xl">
                          <Avatar.Image src={user?.avatar} />
                          <Avatar.Fallback>{user?.name?.[0]}</Avatar.Fallback>
                        </Avatar>

                        <Badge
                          placement="bottom-right"
                          size="sm"
                          className="border-background flex items-center justify-center border">
                          {renderBadgeContent()}
                        </Badge>
                      </Badge.Anchor>
                    </Button>
                  </Dropdown.Trigger>
                </Tooltip.Trigger>

                <Tooltip.Content placement="right">
                  {tooltipText}
                </Tooltip.Content>
              </Tooltip>
              <Dropdown.Popover>
                <div
                  className="hover:bg-default-100 flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2"
                  onClick={onCurrentUserClick}>
                  <Avatar size="sm">
                    <Avatar.Image src={user?.avatar} />
                    <Avatar.Fallback>{user?.name?.[0]}</Avatar.Fallback>
                  </Avatar>

                  <div>
                    <div className="font-medium">{user?.name}</div>
                    <div className="text-muted flex items-center gap-1 text-xs">
                      {renderStatusVisual(currentStatus)}
                      {currentStatus?.label}
                    </div>
                  </div>
                </div>
                <Dropdown.Menu>
                  <Separator />
                  <Dropdown.Item className="mt-2 p-0" variant="text">
                    <Select
                      className="w-full"
                      value={userStatus}
                      onChange={v => setUserStatus(v as UserStatus)}>
                      <Select.Trigger className="h-8 border-none bg-transparent shadow-none ring-0 outline-none focus:ring-0 focus:outline-none">
                        <Select.Value />
                        <Select.Indicator />
                      </Select.Trigger>

                      <Select.Popover>
                        <ListBox>
                          {STATUS_OPTIONS.map(s => (
                            <ListBox.Item key={s.id} id={s.id}>
                              <div className="flex items-center gap-2">
                                {renderStatusVisual(s)}
                                {s.label}
                              </div>
                            </ListBox.Item>
                          ))}
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  </Dropdown.Item>
                  <Dropdown.Item className="mt-2 p-0" variant="text">
                    <Select
                      className="w-full"
                      selectedKeys={selectedStatus ? [selectedStatus.id] : []}
                      open={isStatusOpen}
                      onOpenChange={setIsStatusOpen}
                      onSelectionChange={key => {
                        if (key === 'clear') {
                          setSelectedStatus(null)
                          setSelectedTiming(null)
                          setIsStatusOpen(false)
                          return
                        }
                        const status = suggestedStatuses.find(s => s.id === key)
                        if (status) {
                          setSelectedStatus(status)
                          const defaultTiming = timingOptions.find(
                            t => t.id === '15min'
                          )
                          setSelectedTiming(defaultTiming)
                          setIsStatusOpen(false)
                        }
                      }}>
                      <Select.Trigger className="flex w-full items-center justify-between border-none bg-transparent px-3 py-2 shadow-none ring-0 outline-none focus:ring-0 focus:outline-none">
                        <Select.Value>
                          {selectedStatus
                            ? `${selectedStatus.emoji} ${selectedStatus.label}`
                            : 'Update your status'}
                        </Select.Value>
                        <Select.Indicator />
                      </Select.Trigger>
                      <Select.Popover placement="right">
                        <ListBox>
                          {suggestedStatuses.map(s => (
                            <ListBox.Item key={s.id} id={s.id}>
                              {s.emoji} {s.label}
                            </ListBox.Item>
                          ))}
                          <ListBox.Item key="clear" id="clear">
                            <div className="text-danger flex items-center gap-2">
                              <CloseCircleIcon
                                className="text-danger text-base"
                                size="1em"
                                weight="filled"
                                aria-hidden="true"
                              />
                              Clear status
                            </div>
                          </ListBox.Item>
                        </ListBox>
                      </Select.Popover>
                    </Select>
                  </Dropdown.Item>
                  {selectedStatus && (
                    <Dropdown.Item className="my-2 p-0" variant="text">
                      <Select
                        className="w-full"
                        selectedKeys={selectedTiming ? [selectedTiming.id] : []}
                        open={isTimingOpen}
                        onOpenChange={setIsTimingOpen}
                        onSelectionChange={key => {
                          const timing = timingOptions.find(t => t.id === key)
                          if (timing) {
                            setSelectedTiming(timing)
                            setIsTimingOpen(false)
                            setIsDropdownOpen(false)
                          }
                        }}>
                        <Select.Trigger className="outline-no flex w-full items-center justify-between border-none bg-transparent px-3 py-2 shadow-none ring-0 focus:ring-0 focus:outline-none">
                          <Select.Value>
                            {selectedTiming
                              ? selectedTiming.label
                              : 'Select duration'}
                          </Select.Value>
                          <Select.Indicator />
                        </Select.Trigger>

                        <Select.Popover placement="right">
                          <ListBox>
                            {timingOptions.map(t => (
                              <ListBox.Item key={t.id} id={t.id}>
                                {t.label}
                              </ListBox.Item>
                            ))}
                          </ListBox>
                        </Select.Popover>
                      </Select>
                    </Dropdown.Item>
                  )}
                  <Dropdown.Item onPress={() => onUserClick?.(user)}>
                    <SettingsIcon size={20} aria-hidden="true" />
                    Preferences
                  </Dropdown.Item>
                  <Separator />
                  <Dropdown.Item onPress={clearUser} className="text-danger">
                    <Logout2Icon size={20} aria-hidden="true" />
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          )}
        </div>
      </Surface>

      <UserInfoModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={user}
        defaultActiveTab="profiles"
      />
    </>
  )
}
