import { ReactNode } from 'react';

export default function FeatchButton({
  loading,
  children,
  className
}: {
  loading: boolean
  children: ReactNode
  className: string
}) {
  return (
    <button aria-label="Increase item quantity" className={className} disabled={loading}>
      {loading ?
        <span className="mx-2 inline-flex items-center">
          <span className="mx-[1px] inline-block h-1 w-1 animate-blink rounded-md bg-black dark:bg-white"></span>
          <span className="mx-[1px] inline-block h-1 w-1 animate-blink rounded-md animation-delay-[200ms] bg-black dark:bg-white"></span>
          <span className="mx-[1px] inline-block h-1 w-1 animate-blink rounded-md animation-delay-[400ms] bg-black dark:bg-white"></span>
        </span> :
        children
      }
  </button>
  )
}

// ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full px-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80 cursor-not-allowed