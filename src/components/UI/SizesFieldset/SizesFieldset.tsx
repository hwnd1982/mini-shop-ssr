import clsx from 'clsx';
import { Dispatch, SetStateAction } from 'react';
import s from './SizesFieldset.module.sass';

export default function SizesFieldset({productSizes, selectedSize, setSelectedSize}: {productSizes: string[], selectedSize: string, setSelectedSize: Dispatch<SetStateAction<string>>}) {
  return (
    <fieldset className={s.fieldset}>
      {productSizes.map(size => (
        <div key={size} className="mr-3 mb-4">
          <input type="radio" name="size" id={size} className={s.input} onChange={() => setSelectedSize(size)} />
          <label htmlFor={size} className={clsx(s.label, size === selectedSize && s.selected)}>
          {size}
          </label>
        </div>
      ))}
    </fieldset>
  )
}