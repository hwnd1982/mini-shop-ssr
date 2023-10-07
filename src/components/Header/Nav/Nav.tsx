import { ClickHandler, DefaultComponentsProps } from '@/types/types'
import Link from 'next/link'

type NavProps = {
  gender: string,
  list: DefaultComponentsProps[]
  onClick: ClickHandler
}

export default function Nav({gender, list, onClick}: NavProps) {
  return (
    <div className="row-start-1 gap-y-10 text-sm">
      <ul
        role="list"
        aria-labelledby={`${gender}-categories`}
        className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
      >
        {list.map((item) => (
          <li key={`${item.title}-nav`} className="flex">
            <Link href={`/catalog/${gender}/${item.slug.toString()}`} onClick={onClick} className="hover:text-gray-800">
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}