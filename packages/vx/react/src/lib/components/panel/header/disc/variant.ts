import { VariantProps, tv } from '@vezham/react-v3'

const tva = tv({
  slots: {
    tabs: '',
    tabs_list_container: 'w-full',
    tabs_list: 'w-full',
    tab_archive: 'flex-1 justify-center',
    tab_trash: 'flex-1 justify-center',
    tab_indicator: '',

    container: 'flex min-h-0 flex-1 flex-col',

    search_input: 'w-full',
    search_input_wrapper: 'bg-default-100/50',
    search_icon: 'text-default-400',

    actions_bar: 'text-muted mt-2 flex justify-end',
    actions_bar_with_gap: 'text-muted mt-2 flex justify-end gap-2',

    clear_all_button: '',
    restore_all_button: '',

    empty_container:
      'flex h-full min-h-[320px] flex-col items-center justify-center gap-4 text-center',
    empty_icon: 'text-default-400',
    empty_title: 'text-xl font-semibold',
    empty_description: 'text-default-500 max-w-[220px]',

    items_container: 'space-y-4 pb-6',
    date_group: '',
    date_header: 'mb-2 flex items-center gap-2',
    date_label: 'text-default-500 text-xs font-medium',
    date_divider: 'bg-default-200 h-px flex-1',
    items_list: 'space-y-1',

    item: 'group hover:bg-default-100 relative flex w-full cursor-pointer items-center gap-3 rounded-lg px-2 py-2 transition-colors',
    item_favicon: 'h-4 w-4 shrink-0',
    item_fallback_icon: 'text-default-400 shrink-0',
    item_content: 'min-w-0 flex-1',
    item_title: 'truncate text-sm font-medium',
    item_url: 'text-default-500 truncate text-xs',

    item_actions:
      'absolute top-1/2 right-2 flex -translate-y-1/2 items-center rounded-md bg-inherit opacity-0 transition-opacity group-hover:opacity-100',

    unarchive_button: 'hover:bg-default-200 rounded-md p-1.5 transition-colors',
    restore_button: 'hover:bg-success-100 rounded-md p-1.5 transition-colors',
    delete_button: 'hover:bg-danger-100 rounded-md p-1.5 transition-colors',
    delete_permanent_button:
      'hover:bg-danger-100 rounded-md p-1.5 transition-colors',

    action_icon: '',
    action_icon_success: 'text-success',
    action_icon_danger: 'text-danger',
    action_icon_default: 'text-default-600'
  },
  variants: {
    variant: {
      default: {
        search_input_wrapper: 'bg-default-100/50',
        item: 'hover:bg-default-100'
      },
      dark: {
        search_input_wrapper: 'bg-default-800/50',
        item: 'hover:bg-default-800'
      },
      light: {
        search_input_wrapper: 'bg-default-50/50',
        item: 'hover:bg-default-50'
      },
      glass: {
        search_input_wrapper: 'bg-white/10',
        item: 'hover:bg-white/20'
      }
    },
    size: {
      sm: {
        empty_icon: 'w-12',
        empty_title: 'text-lg',
        empty_description: 'max-w-[180px] text-xs',
        item: 'px-1 py-1.5',
        item_title: 'text-xs',
        item_url: 'text-[10px]',
        item_actions: 'right-1 gap-0.5',
        unarchive_button: 'p-1',
        delete_button: 'p-1'
      },
      md: {
        empty_icon: 'w-16',
        empty_title: 'text-xl',
        empty_description: 'max-w-[220px] text-sm',
        item: 'px-2 py-2',
        item_title: 'text-sm',
        item_url: 'text-xs',
        item_actions: 'right-2 gap-1',
        unarchive_button: 'p-1.5',
        delete_button: 'p-1.5'
      },
      lg: {
        empty_icon: 'w-20',
        empty_title: 'text-2xl',
        empty_description: 'max-w-[280px] text-base',
        item: 'px-3 py-2.5',
        item_title: 'text-base',
        item_url: 'text-sm',
        item_actions: 'right-3 gap-1.5',
        unarchive_button: 'p-2',
        delete_button: 'p-2'
      }
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'md'
  }
})

type tvProps = VariantProps<typeof tva>
type tvSlots = keyof ReturnType<typeof tva>

export { tva }
export type { tvProps, tvSlots }
