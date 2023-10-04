import { ColorsState } from '@/store/features/colorsSlice';
import { Product } from '@/store/features/productSlice';
import { clsx } from 'clsx';
import s from './ColorsList.module.sass'

export default function ColorsList({product, colors}: {product: Product, colors: ColorsState}) {
  return (
    <div className="relative gap-2 mb-4 flex justify-center flex-wrap">
      {product.colors.map(colorId => {
        const color = colors.list.find(color => color.id === colorId);

        return <div key={`${product.id}-${color?.title}`} className={clsx(s.color, color?.title && s[color.title])}></div>
      })}
    </div>
  )
}