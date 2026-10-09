const ACTION_FIELDS = new Set(['key', 'label', 'icon', 'children'])
const VIEW_ACTION_FIELDS = new Set(['key', 'label', 'icon', 'enabled'])
const TOOLBAR_FIELDS = new Set([
  'search',
  'sync',
  'filter',
  'view',
  'menuActions',
  'primaryAction'
])
const SEARCH_FIELDS = new Set(['label', 'placeholder'])
const VIEW_ACTION_KEYS = new Set(['grid', 'list'])

const object = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const validateFields = (
  value: Record<string, unknown>,
  fields: ReadonlySet<string>,
  location: string
) => {
  for (const key of Object.keys(value)) {
    if (!fields.has(key)) throw new Error(`Unknown field: ${location}.${key}`)
  }
}

const validateString = (value: unknown, location: string) => {
  if (typeof value !== 'string' || !value.trim())
    throw new Error(`${location} must be a non-empty string`)
}

const validateAction = (value: unknown, location: string) => {
  if (!object(value)) throw new Error(`${location} must be an action object`)
  validateFields(value, ACTION_FIELDS, location)
  for (const field of ['key', 'label', 'icon'])
    validateString(value[field], `${location}.${field}`)
  if (value.children !== undefined)
    validateActions(value.children, `${location}.children`)
}

const validateActions = (value: unknown, location: string) => {
  if (!Array.isArray(value)) throw new Error(`${location} must be an array`)
  const keys = new Set<unknown>()
  for (const action of value) {
    validateAction(action, location)
    if (keys.has(action.key))
      throw new Error(`Duplicate action key: ${location}.${action.key}`)
    keys.add(action.key)
  }
}

const validateViewActions = (value: unknown, location: string) => {
  if (!Array.isArray(value)) throw new Error(`${location} must be an array`)
  const keys = new Set<unknown>()
  for (const action of value) {
    if (!object(action))
      throw new Error(`${location} must contain action objects`)
    validateFields(action, VIEW_ACTION_FIELDS, location)
    for (const field of ['key', 'label', 'icon'])
      validateString(action[field], `${location}.${field}`)
    if (typeof action.key !== 'string' || !VIEW_ACTION_KEYS.has(action.key))
      throw new Error(`Unknown view action key: ${location}.${action.key}`)
    if (action.enabled !== undefined && typeof action.enabled !== 'boolean')
      throw new Error(`${location}.${action.key}.enabled must be a boolean`)
    if (keys.has(action.key))
      throw new Error(`Duplicate action key: ${location}.${action.key}`)
    keys.add(action.key)
  }
}

export const validateToolbar = (value: unknown, location: string) => {
  if (!object(value)) throw new Error(`${location} must be an object`)
  validateFields(value, TOOLBAR_FIELDS, location)
  if (value.search !== undefined && typeof value.search !== 'boolean') {
    if (!object(value.search))
      throw new Error(`${location}.search must be a boolean or an object`)
    validateFields(value.search, SEARCH_FIELDS, `${location}.search`)
    for (const [field, entry] of Object.entries(value.search))
      validateString(entry, `${location}.search.${field}`)
  }
  if (value.sync !== undefined && typeof value.sync !== 'boolean')
    throw new Error(`${location}.sync must be a boolean`)
  if (value.filter !== undefined && typeof value.filter !== 'boolean')
    throw new Error(`${location}.filter must be a boolean`)
  if (value.view !== undefined)
    validateViewActions(value.view, `${location}.view`)
  if (value.menuActions !== undefined)
    validateActions(value.menuActions, `${location}.menuActions`)
  if (value.primaryAction !== undefined && value.primaryAction !== false)
    validateAction(value.primaryAction, `${location}.primaryAction`)
}
