import { ColorsState } from '@/store/features/colorsSlice';
import { clsx } from 'clsx';
import { Dispatch, SetStateAction } from 'react';
import s from './ColorsFieldset.module.sass'

export default function ColorsFieldset({productColors, colors, selectedColor, setSelectedColor}: {productColors: number[], colors: ColorsState, selectedColor: number, setSelectedColor: Dispatch<SetStateAction<number>>}) {
  return (
    <fieldset className="relative gap-2 mb-4 flex justify-start flex-wrap">
      {productColors.map(colorId => {
        const color = colors.list.find(color => color.id === colorId);

        return (
          <div key={color?.title} className="mr-3 mb-4">
            <input
              type="radio"
              name="color"
              id={color?.title}
              className="sr-only"
              onChange={() => setSelectedColor(color?.id || 0)}
            />
            <label
              htmlFor={color?.title}
              className={clsx(s.color, color?.title && s[color.title], color?.id === selectedColor && s.selected)}
            />
          </div>
        )
      })}
    </fieldset>
  )
}