import clsx from 'clsx';
import { useState } from 'react';
import s from './DoubleRangeSlider.module.sass';

export type Range = {
  min: number,
  max: number
}

export interface DoubleRangeProps {
  className?: string
  min: number
  max: number
  step: number
  unit: string
  range: Range
  setRange: Function
}

export default function DoubleRangeSlider({ className = '', min, max, step = 100, unit, range, setRange}: DoubleRangeProps) {
  const rangeToThumbPosition = (range: Range) => {
    const left = (range.min - min) /  (max - min) * 100;
    const right = (max - range.max) /  (max - min) * 100;

    return {left, right};
  }

  const setMin = ({target}: {target: HTMLInputElement}) => {
    const newMin = +target.value > max - step ? max - step : +target.value;
    const newMax = newMin >= range.max ? newMin + step : range.max;
    const newRange = {min: newMin, max: newMax};

    setThumbPosition(rangeToThumbPosition(newRange));
    setRange(newRange);
  };

  const setMax = ({target}: {target: HTMLInputElement}) => {
    const newMax = +target.value < min + step ? min + step : +target.value;
    const newMin = newMax <= range.min ? newMax - step : range.min;
    const newRange = {min: newMin, max: newMax};

    setThumbPosition(rangeToThumbPosition(newRange));
    setRange(newRange);
  };

  const [thumbPosition, setThumbPosition] = useState(rangeToThumbPosition(range));

  return (
    <fieldset className={clsx("px-6 py-12 min-w-[280px]", className)}>
      <div className="relative z-10 h-1">
        <input 
          className={s.range}
          id="range-min"
          type="range"
          min={min}
          max={max - step}
          step={step}
          value={range.min}
          onChange={setMin}
        />
        <input
          className={s.range}
          id="range-max"
          type="range"
          min={min + step}
          max={max} step={step}
          value={range.max}
          onChange={setMax}
        />
        <div className={s.rangeBar}></div>
        <div 
          className={s.rangeSelected}
          style={{left: `calc(${thumbPosition.left}%)`, right: `calc(${thumbPosition.right}%)`}}></div>
        <label
          htmlFor='#range-min'
          id="thumb-left"
          className={s.thumb}
          style={{left: `${thumbPosition.left}%`, transform: `translate(${-thumbPosition.left}%,-50%)`}}
        >
          <span className={clsx(s.price, s.priceMin)}>{range.min}{unit}</span>
        </label>
        <label
          htmlFor='#range-max'
          id="thumb-right"
          className={s.thumb}
          style={{right: `${thumbPosition.right}%`, transform: `translate(${thumbPosition.right}%,-50%)`}}
        >
          <span className={clsx(s.price, s.priceMax)}>{range.max}{unit}</span>
        </label>
      </div>
    </fieldset>
  )
}