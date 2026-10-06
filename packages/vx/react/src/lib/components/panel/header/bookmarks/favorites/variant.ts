import { type VariantProps, tv } from '@vezham/react-v3'

const tva = tv({
  slots: {
    grid: 'grid grid-cols-4 gap-2 outline-none',
    item: 'group bg-default/50 hover:bg-default data-[selected]:bg-accent/10 relative flex min-w-0 cursor-grab items-center justify-center rounded-lg outline-none active:cursor-grabbing data-[focus-visible]:ring-2',
    itemDragging: 'scale-[0.98] opacity-55',
    itemDropTarget: 'ring-2',
    dragButton: 'sr-only',
    backgroundImage: 'absolute inset-0 h-full w-full object-cover',
    backgroundFallback: 'absolute inset-0 bg-gradient-to-br',
    overlay:
      'absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent',
    avatarContainer:
      'flex h-full w-full items-center justify-center overflow-hidden rounded-[inherit]',
    avatar: 'h-full w-full rounded-lg',
    avatarFallback: 'text-muted bg-transparent text-xs font-medium',
    avatarIcon: 'text-warning',
    content: 'absolute right-0 bottom-0 left-0',
    name: 'line-clamp-2 leading-tight text-white',
    emptyState: 'text-default-500 text-sm'
  },
  variants: {
    variant: {
      default: {
        item: 'data-[focus-visible]:ring-focus',
        itemDropTarget: 'ring-primary',
        backgroundFallback: 'from-default-200 to-default-300',
        avatarFallback: 'bg-transparent'
      },
      subtle: {
        item: 'bg-default/30 data-[focus-visible]:ring-focus',
        itemDropTarget: 'ring-default-500',
        backgroundFallback: 'from-default-100 to-default-300',
        avatarFallback: 'bg-transparent'
      },
      glass: {
        item: 'data-[focus-visible]:ring-focus bg-white/10 hover:bg-white/20',
        itemDropTarget: 'ring-white/70',
        backgroundFallback: 'from-white/30 to-white/10',
        avatarFallback: 'bg-transparent'
      }
    },
    size: {
      sm: {
        item: 'h-10',
        content: 'p-1.5',
        name: 'text-[10px]',
        avatarContainer: ''
      },
      md: {
        item: 'h-12',
        content: 'p-2',
        name: 'text-xs',
        avatarContainer: ''
      },
      lg: {
        item: 'h-14',
        content: 'p-2.5',
        name: 'text-sm',
        avatarContainer: ''
      }
    },
    isInteractive: {
      true: {
        item: 'cursor-grab active:cursor-grabbing'
      },
      false: {
        item: 'cursor-default active:cursor-default'
      }
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
    isInteractive: true
  }
})

type tvProps = VariantProps<typeof tva>
type tvSlots = keyof ReturnType<typeof tva>

export { tva }
export type { tvProps, tvSlots }
