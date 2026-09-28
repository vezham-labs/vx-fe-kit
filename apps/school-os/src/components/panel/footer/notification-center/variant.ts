import { VariantProps, tv } from '@vezham/react-v3'

const tva = tv({
  slots: {
    // Main Drawer slots
    drawer_base:
      'z-[50] max-w-[440px] rounded-none border-none bg-transparent shadow-none md:translate-x-[106px]',
    drawer_wrapper: 'z-[50]',
    drawer_content:
      'border border-white/20 bg-black/5 shadow-xl backdrop-blur-lg',

    // Header slots
    drawer_header: 'flex shrink-0 items-start justify-between text-white/90',
    header_title: 'text-foreground text-lg font-semibold',
    close_button:
      'text-default-500 shrink-0 bg-transparent hover:bg-transparent data-[hovered=true]:bg-transparent',

    // Body slots
    drawer_body: 'overflow-y-auto',
    scroll_shadow: '',
    empty_state:
      'flex min-h-[320px] flex-col items-center justify-center text-center',
    empty_state_icon: 'text-muted-foreground',

    // Footer slots
    drawer_footer: 'flex items-center justify-center',
    chip: 'cursor-pointer bg-white'
  },
  variants: {
    variant: {
      default: {
        drawer_content: 'border-white/20 bg-black/5',
        drawer_header: 'text-white/90',
        header_title: '',
        chip: ''
      },
      dark: {
        drawer_content: 'border-white/10 bg-black/30',
        drawer_header: 'text-white/70',
        header_title: '',
        chip: ''
      },
      light: {
        drawer_content: 'border-black/20 bg-white/10',
        drawer_header: 'text-black/90',
        header_title: '',
        chip: ''
      },
      glass: {
        drawer_content: 'border-white/30 bg-white/10 backdrop-blur-xl',
        drawer_header: 'text-white',
        header_title: '',
        chip: ''
      }
    },
    placement: {
      left: {
        drawer_base: 'max-w-[440px] md:translate-x-[106px]'
      },
      right: {
        drawer_base: 'max-w-[440px] md:-translate-x-[106px]'
      },
      top: {
        drawer_base: 'max-h-[440px] max-w-full md:translate-y-[106px]'
      },
      bottom: {
        drawer_base: 'max-h-[440px] max-w-full md:-translate-y-[106px]'
      }
    },
    size: {
      sm: {
        drawer_base: 'max-w-[320px] md:translate-x-[80px]',
        drawer_header: 'p-3',
        header_title: 'text-base',
        drawer_body: 'p-3',
        drawer_footer: 'p-3'
      },
      md: {
        drawer_base: 'max-w-[440px] md:translate-x-[106px]',
        drawer_header: 'p-4',
        header_title: 'text-lg',
        drawer_body: 'p-4',
        drawer_footer: 'p-4'
      },
      lg: {
        drawer_base: 'max-w-[560px] md:translate-x-[133px]',
        drawer_header: 'p-5',
        header_title: 'text-xl',
        drawer_body: 'p-5',
        drawer_footer: 'p-5'
      }
    },
    blur: {
      none: {
        drawer_content: 'backdrop-blur-none'
      },
      sm: {
        drawer_content: 'backdrop-blur-sm'
      },
      md: {
        drawer_content: 'backdrop-blur-md'
      },
      lg: {
        drawer_content: 'backdrop-blur-lg'
      },
      xl: {
        drawer_content: 'backdrop-blur-xl'
      }
    },
    border: {
      none: {
        drawer_content: 'border-none'
      },
      subtle: {
        drawer_content: 'border border-white/10'
      },
      prominent: {
        drawer_content: 'border-2 border-white/20'
      }
    }
  },
  compoundVariants: [
    {
      placement: 'left',
      class: {
        drawer_base: 'left-0 rounded-r-none'
      }
    },
    {
      placement: 'right',
      class: {
        drawer_base: 'right-0 rounded-l-none'
      }
    },
    {
      placement: 'top',
      class: {
        drawer_base: 'top-0 rounded-b-none'
      }
    },
    {
      placement: 'bottom',
      class: {
        drawer_base: 'bottom-0 rounded-t-none'
      }
    },
    {
      variant: 'glass',
      blur: 'xl',
      class: {
        drawer_content: 'bg-white/20'
      }
    }
  ],
  defaultVariants: {
    variant: 'default',
    placement: 'left',
    size: 'md',
    blur: 'lg',
    border: 'subtle'
  }
})

type tvProps = VariantProps<typeof tva>
type tvSlots = keyof ReturnType<typeof tva>

export { tva }
export type { tvProps, tvSlots }
