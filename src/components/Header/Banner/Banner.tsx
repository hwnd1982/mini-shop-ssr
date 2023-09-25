import { API_URL } from '@/store/const';
import { DefaultComponentsProps } from '@/types/types';
import Image from 'next/image';

export default function Banner({productId, imgSrc, title}: DefaultComponentsProps) {
  return (
    <div className="col-start-2 col-span-3 grid">
      <div className="group relative text-base sm:text-sm">
        <div className="aspect-h-1 aspect-w-4 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
          <Image
            width={1000}
            height={315}
            src={`${API_URL}/${imgSrc}`}
            alt={`${title}`}
            className="object-cover object-center" 
            priority={true}
            />
          </div>
          <a href={`/products/${productId}`} className="mt-6 block font-medium text-gray-900">
            <span className="absolute inset-0 z-10" aria-hidden="true" />
            {title}
          </a>
        </div>
    </div>
  )
}