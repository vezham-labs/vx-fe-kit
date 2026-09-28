import {
  AltArrowDown as AltArrowDownIcon,
  AltArrowUp as AltArrowUpIcon,
  ArrowRightUp as ArrowRightUpIcon,
  Copy as CopyIcon,
  DoubleAltArrowRight as DoubleAltArrowRightIcon,
  Link as LinkIcon,
  Pen as PenIcon
} from '@vezham/icons-react'
import { Button, Drawer, Tooltip } from '@vezham/react-v3'

import { ShortcutTooltipLabel } from '../../../../../components/shortcut-key'
import type { ClassDrawerProps } from '../../types'
import { getDrawerTitle } from '../../utils/classroom'
import { classNames } from '../../variants'
import { ClassDetails } from './class-details'
import { ClassForm } from './class-form'

export function ClassDrawer({
  canGoNext,
  canGoPrevious,
  drawerState,
  form,
  formErrors,
  mode,
  row,
  onCancel,
  onClose,
  onCopyId,
  onCopyLink,
  onEdit,
  onFormChange,
  onGoNext,
  onGoPrevious,
  onOpenPage,
  onSave
}: ClassDrawerProps) {
  const isFormMode = mode === 'create' || mode === 'edit'
  const showNavigation = mode !== 'create'
  const drawerTitle =
    mode === 'create' ? 'Add Classroom' : row ? getDrawerTitle(row) : ''

  return (
    <Drawer state={drawerState}>
      <Drawer.Backdrop variant="transparent">
        <Drawer.Content placement="right">
          <Drawer.Dialog className={classNames.drawerDialog}>
            <Drawer.Header className={classNames.drawerHeader}>
              <div className={classNames.drawerHeaderRow}>
                <div className={classNames.drawerTitleGroup}>
                  <Tooltip delay={0}>
                    <Tooltip.Trigger>
                      <Button
                        isIconOnly
                        aria-label="Toggle drawer"
                        variant="ghost"
                        onPress={onClose}>
                        <DoubleAltArrowRightIcon size={24} aria-hidden="true" />
                      </Button>
                    </Tooltip.Trigger>
                    <Tooltip.Content>
                      <ShortcutTooltipLabel
                        label="Toggle Drawer"
                        shortcut="⌘ /"
                      />
                    </Tooltip.Content>
                  </Tooltip>
                  <span className={classNames.drawerTitle}>{drawerTitle}</span>
                  {row && (
                    <Tooltip delay={0}>
                      <Tooltip.Trigger>
                        <Button
                          isIconOnly
                          aria-label={`Copy ID ${row.id}`}
                          variant="ghost"
                          onPress={() => onCopyId(row)}>
                          <CopyIcon size={16} aria-hidden="true" />
                        </Button>
                      </Tooltip.Trigger>
                      <Tooltip.Content>
                        <ShortcutTooltipLabel label="Copy" shortcut="⌘ C" />
                      </Tooltip.Content>
                    </Tooltip>
                  )}
                </div>

                <div className={classNames.drawerActions}>
                  {row && (
                    <>
                      <Tooltip delay={0}>
                        <Tooltip.Trigger>
                          <Button
                            isIconOnly
                            aria-label={`Copy URL for ${row.id}`}
                            variant="secondary"
                            onPress={() => onCopyLink(row)}>
                            <LinkIcon size={16} aria-hidden="true" />
                          </Button>
                        </Tooltip.Trigger>
                        <Tooltip.Content>
                          <ShortcutTooltipLabel label="Copy" shortcut="⌘ C" />
                        </Tooltip.Content>
                      </Tooltip>
                      <Tooltip delay={0}>
                        <Tooltip.Trigger>
                          <Button
                            isIconOnly
                            aria-label={`Edit ${row.id}`}
                            variant="secondary"
                            onPress={onEdit}>
                            <PenIcon size={16} aria-hidden="true" />
                          </Button>
                        </Tooltip.Trigger>
                        <Tooltip.Content>
                          <ShortcutTooltipLabel label="Edit" shortcut="⌘ E" />
                        </Tooltip.Content>
                      </Tooltip>
                      <Tooltip delay={0}>
                        <Tooltip.Trigger>
                          <Button
                            isIconOnly
                            aria-label={`Open ${row.id}`}
                            variant="secondary"
                            onPress={() => onOpenPage(row)}>
                            <ArrowRightUpIcon size={16} aria-hidden="true" />
                          </Button>
                        </Tooltip.Trigger>
                        <Tooltip.Content>Open ↗</Tooltip.Content>
                      </Tooltip>
                    </>
                  )}

                  {showNavigation && (
                    <>
                      <Button
                        isIconOnly
                        aria-label="Next schedule"
                        isDisabled={!canGoNext}
                        variant="secondary"
                        onPress={onGoNext}>
                        <AltArrowUpIcon size={18} aria-hidden="true" />
                      </Button>
                      <Button
                        isIconOnly
                        aria-label="Previous schedule"
                        isDisabled={!canGoPrevious}
                        variant="secondary"
                        onPress={onGoPrevious}>
                        <AltArrowDownIcon size={18} aria-hidden="true" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </Drawer.Header>

            <Drawer.Body className={classNames.drawerBody}>
              {isFormMode ? (
                <ClassForm
                  form={form}
                  formErrors={formErrors}
                  mode={mode}
                  row={row}
                  onFormChange={onFormChange}
                />
              ) : (
                <ClassDetails row={row} />
              )}
            </Drawer.Body>

            <Drawer.Footer className={classNames.drawerFooter}>
              {isFormMode ? (
                <div className={classNames.drawerFormFooterActions}>
                  <Button variant="secondary" onPress={onCancel}>
                    Cancel
                  </Button>
                  <Button onPress={onSave}>
                    {mode === 'create' ? 'Add Classroom' : 'Save'}
                  </Button>
                </div>
              ) : (
                <div className={classNames.drawerViewFooterActions}>
                  <Button
                    className={classNames.flexOne}
                    variant="secondary"
                    onPress={onEdit}>
                    <PenIcon size={16} aria-hidden="true" />
                    Edit
                  </Button>
                  <Button className={classNames.flexOne} onPress={onClose}>
                    Close
                  </Button>
                </div>
              )}
            </Drawer.Footer>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  )
}
