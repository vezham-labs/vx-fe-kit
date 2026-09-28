import { type VariantProps, tv } from '@vezham/react-v3'

const tva = tv({
  slots: {
    grid: 'flex flex-wrap gap-3 outline-none',
    item: 'group relative flex aspect-square cursor-grab flex-col overflow-hidden rounded-2xl transition-transform will-change-transform outline-none active:cursor-grabbing data-[focus-visible]:ring-2',
    itemDragging: 'scale-[0.98] opacity-55',
    itemDropTarget: 'ring-2',
    dragButton: 'sr-only',
    backgroundImage: 'absolute inset-0 h-full w-full object-cover',
    backgroundFallback: 'absolute inset-0 bg-gradient-to-br',
    overlay:
      'absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent',
    avatarContainer: 'absolute top-2 left-2',
    avatar: 'ring-2 ring-white/20',
    avatarFallback: 'text-white',
    avatarIcon: 'text-warning',
    content: 'absolute right-0 bottom-0 left-0',
    name: 'line-clamp-2 leading-tight text-white',
    emptyState: 'text-default-500 text-sm'
  },
  variants: {
    variant: {
      default: {
        item: 'data-[focus-visible]:ring-primary hover:scale-[1.02] active:scale-[0.98]',
        itemDropTarget: 'ring-primary',
        backgroundFallback: 'from-default-200 to-default-300',
        avatarFallback: 'bg-default-500'
      },
      subtle: {
        item: 'data-[focus-visible]:ring-default-500 hover:scale-[1.01] active:scale-[0.99]',
        itemDropTarget: 'ring-default-500',
        backgroundFallback: 'from-default-100 to-default-300',
        avatarFallback: 'bg-default-400'
      },
      glass: {
        item: 'hover:scale-[1.02] active:scale-[0.98] data-[focus-visible]:ring-white/70',
        itemDropTarget: 'ring-white/70',
        backgroundFallback: 'from-white/30 to-white/10',
        avatarFallback: 'bg-white/20 backdrop-blur-md'
      }
    },
    size: {
      sm: {
        item: 'w-[calc(23%_-_5px)] rounded-xl',
        content: 'p-1.5',
        name: 'text-[10px]',
        avatarContainer: 'top-1.5 left-1.5'
      },
      md: {
        item: 'w-[calc(23%_-_5px)] rounded-2xl',
        content: 'p-2',
        name: 'text-xs',
        avatarContainer: 'top-2 left-2'
      },
      lg: {
        item: 'w-[calc(23%_-_5px)] rounded-2xl',
        content: 'p-2.5',
        name: 'text-sm',
        avatarContainer: 'top-2.5 left-2.5'
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
