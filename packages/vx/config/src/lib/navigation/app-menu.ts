const object = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const validateEntry = (
  value: unknown,
  fields: string[],
  location: string,
  keys: Set<string>
) => {
  if (!object(value)) throw new Error(`${location} must be an object`)
  for (const field of Object.keys(value)) {
    if (!fields.includes(field))
      throw new Error(`Unknown field: ${location}.${field}`)
  }
  for (const field of ['key', 'label', 'icon', 'shortcut']) {
    if (field === 'key' || field === 'label' || value[field] !== undefined) {
      if (typeof value[field] !== 'string' || !value[field].trim())
        throw new Error(`${location}.${field} must be a non-empty string`)
    }
  }
  const key = value.key as string
  if (keys.has(key))
    throw new Error(`Duplicate app menu key: ${location}.${key}`)
  keys.add(key)
  return value
}

export const validateAppMenu = (value: unknown, location: string) => {
  if (!Array.isArray(value)) throw new Error(`${location} must be an array`)
  const menuKeys = new Set<string>()
  const actionKeys = new Set<string>()
  for (const entry of value) {
    const menu = validateEntry(
      entry,
      ['key', 'label', 'icon', 'groups'],
      location,
      menuKeys
    )
    if (!Array.isArray(menu.groups) || !menu.groups.length)
      throw new Error(
        `${location}.${menu.key}.groups must be a non-empty array`
      )
    for (const group of menu.groups) {
      if (!Array.isArray(group) || !group.length)
        throw new Error(
          `${location}.${menu.key} groups must be non-empty arrays`
        )
      for (const action of group)
        validateEntry(
          action,
          ['key', 'label', 'icon', 'shortcut'],
          `${location}.${menu.key}`,
          actionKeys
        )
    }
  }
}
