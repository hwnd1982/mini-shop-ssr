import { clsx } from 'clsx';
import s from './FeatchIcon.module.sass'

export default function FeatchIcon({ className }: { className?: string}) {
  return (
    <span className={clsx("px-1 inline-flex items-center justify-center", className)}>
      <span className={clsx("mx-[1px] inline-block h-1 w-1 rounded-md bg-current", s.blink)}></span>
      <span className={clsx("mx-[1px] inline-block h-1 w-1 rounded-md bg-current", s.blink, s.delay200)}></span>
      <span className={clsx("mx-[1px] inline-block h-1 w-1 rounded-md bg-current", s.blink, s.delay400)}></span>
    </span> 
  )
}

// ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full px-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80 cursor-not-allowed