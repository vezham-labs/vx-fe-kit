import { Typography, cn } from '@vezham/react-v3'

type ShortcutKeyProps = {
  className?: string
  shortcut: string
}

type ShortcutTooltipLabelProps = ShortcutKeyProps & {
  label: string
}

const shortcutGroupClassName =
  'inline-flex min-h-9 items-center gap-1 rounded-xl '

const keycapClassName =
  'inline-flex min-h-7 min-w-7 items-center justify-center rounded-lg bg-surface-tertiary px-2 text-sm leading-none text-muted hover:text-foreground'

export function ShortcutKey({ className, shortcut }: ShortcutKeyProps) {
  const keys = shortcut.split(/\s+/).filter(Boolean)

  return (
    <span
      aria-label={shortcut}
      className={cn(shortcutGroupClassName, className)}>
      {keys.map((key, index) => (
        <span key={`${key}-${index}`} className={keycapClassName}>
          {key}
        </span>
      ))}
    </span>
  )
}

export function ShortcutTooltipLabel({
  className,
  label,
  shortcut
}: ShortcutTooltipLabelProps) {
  return (
    <span
      className={cn('flex items-center gap-2 whitespace-nowrap', className)}>
      <Typography.Paragraph>{label}</Typography.Paragraph>
      <ShortcutKey shortcut={shortcut} />
    </span>
  )
}
