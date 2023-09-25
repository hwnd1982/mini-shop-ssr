import { DefaultComponentsProps } from '@/types/types'

type NavProps = {
  gender: string,
  list: DefaultComponentsProps[]
}

export default function Nav({gender, list}: NavProps) {
  return (
    <div className="row-start-1 gap-y-10 text-sm">
      <ul
        role="list"
        aria-labelledby={`${gender}-categories`}
        className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
      >
        {list.map((item) => (
          <li key={`${item.title}-nav`} className="flex">
            <a href={item.slug.toString() || '#'} className="hover:text-gray-800">
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}