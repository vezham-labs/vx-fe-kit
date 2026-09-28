import { type VariantProps, tv } from '@vezham/react-v3'

const tva = tv({
  slots: {
    base: 'pointer-events-auto absolute inset-0 overflow-hidden rounded-3xl',
    container: 'flex h-full flex-col',
    header: 'relative flex items-center border-b border-white/10 p-2 pt-4',
    backButton: 'absolute left-4',
    title: 'flex-1 text-center text-lg',
    content: 'flex-1 overflow-hidden'
  },
  variants: {
    variant: {
      default: '',
      modal: '',
      drawer: ''
    },
    size: {
      sm: '',
      md: '',
      lg: '',
      full: ''
    },
    animation: {
      spring: '',
      fade: '',
      slide: ''
    }
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
    animation: 'spring'
  }
})

type tvProps = VariantProps<typeof tva>
type tvSlots = keyof ReturnType<typeof tva>

export { tva }
export type { tvProps, tvSlots }
