import { tv } from 'tailwind-variants'

export const controlCenterVariants = tv({
  slots: {
    surface:
      'border-border/70 dark:border-border/80 relative w-72 overflow-hidden rounded-[1.75rem] border p-2 shadow-2xl ring-1 ring-white/15 backdrop-blur-2xl',
    triggerIcon: 'text-muted',
    backdrop: 'bg-overlay/10 backdrop-blur-xs',
    modalContainer: 'justify-end p-4 pt-18',
    content: 'relative',
    edgeHighlight:
      'pointer-events-none absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-white/55 to-transparent dark:via-white/25',
    surfaceHighlight:
      'pointer-events-none absolute inset-x-0 top-0 h-20 bg-linear-to-b from-white/15 to-transparent dark:from-white/8',
    panelHeader: 'flex items-center gap-2 px-1 pt-1 pb-2',
    panelTitle: 'text-sm font-semibold capitalize',
    panelBody: 'p-1',
    home: 'grid grid-cols-4 items-center gap-x-2 gap-y-3',
    tileContainer: 'min-w-0',
    languageList: 'flex flex-col gap-1'
  },
  variants: {
    span: {
      compact: {
        tileContainer:
          'col-span-1 aspect-square w-full overflow-hidden [&>button]:size-full [&>button>span>span:last-child]:hidden'
      },
      standard: { tileContainer: 'col-span-2 min-w-0 [&>button]:w-full' },
      wide: { tileContainer: 'col-span-3 min-w-0 [&>button]:w-full' },
      full: { tileContainer: 'col-span-4 min-w-0 [&>button]:w-full' }
    },
    presentation: {
      popover: { surface: 'bg-transparent' },
      modal: { surface: 'bg-surface/75 dark:bg-surface/65', content: 'p-0' }
    }
  },
  defaultVariants: { presentation: 'popover' }
})

export const controlCenterTileVariants = tv({
  slots: {
    button: 'bg-default-hover hover:bg-surface rounded-full',
    content: 'flex min-w-0 items-center gap-2',
    icon: 'bg-surface flex size-10 shrink-0 items-center justify-center rounded-full border shadow-sm',
    text: 'flex min-w-0 flex-col',
    title: 'truncate text-sm font-medium',
    description: 'text-muted truncate text-xs'
  },
  variants: {
    compact: {
      true: { button: 'size-14 shrink-0' },
      false: {
        button:
          'h-auto min-h-14 items-center justify-between px-3 py-2.5 text-start'
      }
    }
  },
  defaultVariants: { compact: false }
})

export const optionTileVariants = tv({
  base: 'rounded-lg px-3 py-2 text-sm transition-colors',
  variants: {
    selected: {
      true: 'bg-primary/10 text-primary',
      false: 'hover:bg-surface text-muted hover:text-foreground'
    }
  },
  defaultVariants: { selected: false }
})
