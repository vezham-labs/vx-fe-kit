import { type ReactNode, createContext, useContext } from 'react'

import { AltArrowDown, AltArrowUp, Settings } from '@vezham/icons-react'
import { Button, Switch } from '@vezham/react-v3'

import { ActionTile } from './tile'
import { controlCenterVariants } from './variant'

type EditorState = {
  items: readonly {
    id: string
    label: string
    visible: boolean
    editable: boolean
  }[]
  onVisibilityChange: (id: string, visible: boolean) => void
  onMove: (id: string, offset: number) => void
  onReset: () => void
}
const EditorContext = createContext<EditorState | null>(null)
export const EditorProvider = ({
  value,
  children
}: {
  value: EditorState
  children: ReactNode
}) => <EditorContext.Provider value={value}>{children}</EditorContext.Provider>

export const EditControlsTile = ({ onOpen }: { onOpen: () => void }) => (
  <ActionTile
    label="Edit Controls"
    icon={<Settings size={18} />}
    onPress={onOpen}
  />
)

const styles = controlCenterVariants()
export const EditControlsSettings = () => {
  const editor = useContext(EditorContext)
  if (!editor)
    throw new Error('Edit Controls must be rendered inside ControlCenter')
  return (
    <div className={styles.editor()}>
      <p className={styles.previewHint()}>
        Choose your controls and their order.
      </p>
      {editor.items.map((item, index) => (
        <div key={item.id} className={styles.editorRow()}>
          <Switch
            aria-label={`Show ${item.label}`}
            isSelected={item.visible}
            isDisabled={!item.editable}
            onChange={visible => editor.onVisibilityChange(item.id, visible)}>
            <Switch.Content className={styles.editorToggle()}>
              <Switch.Control>
                <Switch.Thumb />
              </Switch.Control>
              <span className={styles.editorLabel()}>{item.label}</span>
            </Switch.Content>
          </Switch>
          <div className={styles.editorActions()}>
            <Button
              aria-label={`Move ${item.label} up`}
              isIconOnly
              size="sm"
              variant="ghost"
              isDisabled={index === 0}
              onPress={() => editor.onMove(item.id, -1)}>
              <AltArrowUp size={16} />
            </Button>
            <Button
              aria-label={`Move ${item.label} down`}
              isIconOnly
              size="sm"
              variant="ghost"
              isDisabled={index === editor.items.length - 1}
              onPress={() => editor.onMove(item.id, 1)}>
              <AltArrowDown size={16} />
            </Button>
          </div>
        </div>
      ))}
      <Button variant="ghost" onPress={editor.onReset}>
        Reset Controls
      </Button>
    </div>
  )
}
