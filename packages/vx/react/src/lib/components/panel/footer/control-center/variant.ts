import { VariantProps, tv } from '@vezham/react-v3'

const tva = tv({
  slots: {
    drawer_base:
      'max-w-[440px] rounded-none border-none bg-transparent shadow-none md:translate-x-[106px]',
    drawer_wrapper: 'z-[50]',
    drawer_content:
      'flex justify-end bg-black/5 p-4 shadow-xl backdrop-blur-sm',
    drawer_header: 'flex shrink-0 justify-end p-0 pb-3',
    close_button:
      'text-default-500 shrink-0 bg-transparent hover:bg-transparent data-[hovered=true]:bg-transparent',

    motion_container: 'flex min-h-0 w-full flex-col',
    empty_state: 'flex min-h-[320px] flex-col items-center justify-center',
    empty_state_icon: 'text-muted-foreground',

    main_view: 'space-y-4',
    main_grid: 'grid grid-cols-2 gap-4',
    main_grid_left: 'space-y-4',

    tile: 'flex cursor-pointer items-center gap-3 rounded-full bg-white/10 p-4 backdrop-blur-md transition hover:bg-white/20',
    tile_icon_wrapper:
      'flex h-10 w-10 items-center justify-center rounded-full bg-white',
    tile_icon: 'text-primary',
    tile_label: 'text-default-500 text-sm font-semibold',
    tile_sub: 'text-default-400 text-xs',

    media_tile:
      'flex flex-col justify-between rounded-2xl bg-white/10 p-4 backdrop-blur-md',
    media_tile_status: 'text-default-400 text-sm',
    media_tile_controls: 'mt-6 flex items-center justify-center gap-4',
    media_tile_icon: 'text-primary',

    circle_action:
      'flex items-center gap-3 rounded-full bg-white/10 p-4 backdrop-blur-md',
    circle_action_center: 'justify-center',
    circle_action_large: 'flex-1',
    circle_action_icon_wrapper:
      'flex h-10 w-10 items-center justify-center rounded-full bg-white',
    circle_action_icon: 'text-primary',
    circle_action_label: 'text-default-500 text-sm font-semibold',
    circle_action_sub: 'text-default-400 text-xs',

    slider: 'rounded-2xl bg-white/10 p-4 backdrop-blur-md',
    slider_header: 'mb-2 flex items-center gap-2 text-sm',
    slider_icon: 'text-white',
    slider_label: 'text-default-500',
    slider_track: 'h-1 w-full rounded-full bg-white/20',
    slider_progress: 'h-1 rounded-full bg-white',

    subview: 'space-y-4',
    subview_header: 'flex items-center gap-2',
    subview_back_button: '',
    subview_title: 'font-semibold',
    subview_content: 'space-y-2',

    option:
      'cursor-pointer rounded-xl bg-white/10 p-3 transition hover:bg-white/20',

    drawer_footer: 'mt-4 flex justify-center',
    chip: 'cursor-pointer rounded-full bg-white px-4 py-2 text-sm'
  },
  variants: {
    variant: {
      default: {
        drawer_content: 'bg-black/5',
        tile: 'bg-white/10 hover:bg-white/20',
        media_tile: 'bg-white/10',
        circle_action: 'bg-white/10',
        slider: 'bg-white/10',
        option: 'bg-white/10 hover:bg-white/20'
      },
      dark: {
        drawer_content: 'bg-black/30',
        tile: 'bg-white/5 hover:bg-white/15',
        media_tile: 'bg-white/5',
        circle_action: 'bg-white/5',
        slider: 'bg-white/5',
        option: 'bg-white/5 hover:bg-white/15'
      },
      light: {
        drawer_content: 'bg-white/10',
        tile: 'bg-black/5 hover:bg-black/10',
        media_tile: 'bg-black/5',
        circle_action: 'bg-black/5',
        slider: 'bg-black/5',
        option: 'bg-black/5 hover:bg-black/10'
      }
    },
    placement: {
      left: {
        drawer_base: 'max-w-[380px] md:translate-x-[106px]'
      },
      right: {
        drawer_base: 'max-w-[380px] md:-translate-x-[106px]'
      }
    },
    size: {
      sm: {
        drawer_base: 'max-w-[280px] md:translate-x-[80px]',
        tile: 'p-3',
        tile_icon_wrapper: 'h-8 w-8',
        tile_icon: 'w-4',
        tile_label: 'text-xs',
        tile_sub: 'text-[10px]'
      },
      md: {
        drawer_base: 'max-w-[440px] md:translate-x-[106px]',
        tile: 'p-4',
        tile_icon_wrapper: 'h-10 w-10',
        tile_icon: 'w-5',
        tile_label: 'text-sm',
        tile_sub: 'text-xs'
      },
      lg: {
        drawer_base: 'max-w-[480px] md:translate-x-[133px]',
        tile: 'p-5',
        tile_icon_wrapper: 'h-12 w-12',
        tile_icon: 'w-6',
        tile_label: 'text-base',
        tile_sub: 'text-sm'
      }
    },
    blur: {
      none: {
        drawer_content: 'backdrop-blur-none',
        tile: 'backdrop-blur-none',
        media_tile: 'backdrop-blur-none',
        circle_action: 'backdrop-blur-none',
        slider: 'backdrop-blur-none',
        option: 'backdrop-blur-none'
      },
      sm: {
        drawer_content: 'backdrop-blur-sm',
        tile: 'backdrop-blur-sm',
        media_tile: 'backdrop-blur-sm',
        circle_action: 'backdrop-blur-sm',
        slider: 'backdrop-blur-sm',
        option: 'backdrop-blur-sm'
      },
      md: {
        drawer_content: 'backdrop-blur-md',
        tile: 'backdrop-blur-md',
        media_tile: 'backdrop-blur-md',
        circle_action: 'backdrop-blur-md',
        slider: 'backdrop-blur-md',
        option: 'backdrop-blur-md'
      },
      lg: {
        drawer_content: 'backdrop-blur-lg',
        tile: 'backdrop-blur-lg',
        media_tile: 'backdrop-blur-lg',
        circle_action: 'backdrop-blur-lg',
        slider: 'backdrop-blur-lg',
        option: 'backdrop-blur-lg'
      }
    },
    animation: {
      spring: {
        motion_container: ''
      },
      smooth: {
        motion_container: ''
      }
    }
  },
  compoundVariants: [
    {
      placement: 'left',
      class: {
        drawer_base: 'left-0'
      }
    },
    {
      placement: 'right',
      class: {
        drawer_base: 'right-0'
      }
    }
  ],
  defaultVariants: {
    variant: 'default',
    placement: 'left',
    size: 'md',
    blur: 'sm',
    animation: 'spring'
  }
})

type tvProps = VariantProps<typeof tva>
type tvSlots = keyof ReturnType<typeof tva>

export { tva }
export type { tvProps, tvSlots }
