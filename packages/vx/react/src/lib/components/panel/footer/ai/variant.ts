import { type VariantProps, tv } from '@vezham/react-v3'

const tva = tv({
  slots: {
    base: 'z-[50] h-full rounded-none border-none bg-transparent shadow-none',
    wrapper: 'z-[50]',
    content: 'border border-white/20 bg-black/5 shadow-xl backdrop-blur-sm',
    body: 'flex h-full flex-col items-center justify-center gap-4 text-center',
    icon: 'text-muted-foreground',
    title: 'text-xl font-semibold',
    description: 'text-muted-foreground max-w-[220px]'
  },
  variants: {
    variant: {
      default: {
        base: '',
        content: 'border-white/20 bg-black/5',
        icon: 'text-muted-foreground',
        description: 'text-muted-foreground'
      },
      primary: {
        base: '',
        content: 'border-primary/20 bg-primary/5',
        icon: 'text-primary',
        description: 'text-primary/70'
      },
      secondary: {
        base: '',
        content: 'border-secondary/20 bg-secondary/5',
        icon: 'text-secondary',
        description: 'text-secondary/70'
      },
      accent: {
        base: '',
        content: 'border-accent/20 bg-accent/5',
        icon: 'text-accent',
        description: 'text-accent/70'
      }
    },
    placement: {
      left: {
        base: ''
      },
      right: {
        base: ''
      },
      top: {
        base: ''
      },
      bottom: {
        base: ''
      }
    },
    size: {
      sm: {
        base: '',
        icon: 'w-12',
        title: 'text-lg',
        description: 'max-w-[180px] text-xs'
      },
      md: {
        base: '',
        icon: 'w-16',
        title: 'text-xl',
        description: 'max-w-[220px] text-sm'
      },
      lg: {
        base: '',
        icon: 'w-20',
        title: 'text-2xl',
        description: 'max-w-[280px] text-base'
      }
    },
    blur: {
      none: {
        content: 'backdrop-blur-none'
      },
      sm: {
        content: 'backdrop-blur-sm'
      },
      md: {
        content: 'backdrop-blur-md'
      },
      lg: {
        content: 'backdrop-blur-lg'
      }
    }
  },
  compoundVariants: [
    {
      placement: 'left',
      class: {
        base: 'left-0'
      }
    },
    {
      placement: 'right',
      class: {
        base: 'right-0'
      }
    },
    {
      placement: 'top',
      class: {
        base: 'top-0'
      }
    },
    {
      placement: 'bottom',
      class: {
        base: 'bottom-0'
      }
    }
  ],
  defaultVariants: {
    variant: 'default',
    placement: 'left',
    size: 'md',
    blur: 'sm'
  }
})

type tvProps = VariantProps<typeof tva>
type tvSlots = keyof ReturnType<typeof tva>

export { tva }
export type { tvProps, tvSlots }
