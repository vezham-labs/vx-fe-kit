import { Surface } from '@vezham/react-v3'

const tileSizes = [
  'small',
  'small',
  'medium',
  'large',
  'small',
  'small',
  'medium',
  'large'
] satisfies ('small' | 'medium' | 'large')[]

export const hasWidgetTiles = tileSizes.length > 0

export const WidgetTiles = () => (
  <div className="@container mx-auto w-full max-w-[352px]">
    <div className="grid auto-rows-[calc((100cqw-1rem)/2)] grid-cols-2 gap-4 pb-4">
      {tileSizes.map((size, index) => (
        <Surface
          key={`${size}-${index}`}
          variant="transparent"
          data-widget-size={size}
          aria-hidden="true"
          className={`bg-surface/80 relative min-w-0 overflow-hidden rounded-3xl shadow-sm backdrop-blur-xl ${
            size === 'small'
              ? ''
              : size === 'medium'
                ? 'col-span-2'
                : 'col-span-2 row-span-2'
          }`}>
          {null}
        </Surface>
      ))}
    </div>
  </div>
)
