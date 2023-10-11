import { API_URL } from '@/store/const';
import { ColorsState } from '@/store/features/colorsSlice';
import { Product } from '@/store/features/productSlice';
import { rgbDataURL } from '@/utils/rgbDataURL';
import clsx from 'clsx';
import Image from 'next/image'
import Link from 'next/link'
import ColorsList from '../UI/ColorsList/ColorsList';

export default function GoodsList({className, goods, colors}: {className?: string, goods: Product[], colors: ColorsState}) {
  const rgbData = rgbDataURL(200,200,200);

  return (
    <ul className={clsx("grid grid-flow-row gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 py-6 sm:py-8", className)}>
    {goods.map((product, index) => (
      <li key={product.id} className="transition-opacity animate-fadeIn">
        <Link href={`/products/${product.id}`} className="aspect-h-1 aspect-w-1 block overflow-hidden">
          <div className="group flex w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600 border-neutral-200">
            <Image
              width={600}
              height={600}
              src={`${API_URL}/${product.pic}`}
              alt={product.title}
              priority={index < 8}
              loading={index > 7 ? 'lazy' : undefined}
              placeholder="blur"
              blurDataURL={rgbData}
              sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="relative h-full w-full object-cover transition duration-300 ease-in-out group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 flex w-full px-4 pb-4 @container/label">
              <div className="flex items-center rounded-full border bg-white/50 p-1 text-xs text-black backdrop-blur-md">
                <h3 className="mr-4 line-clamp-2 line-clamp-2 flex-grow pl-2 leading-none tracking-tight font-semibold">
                  {product.title}
                </h3>
                <p className="flex-none rounded-full bg-indigo-600 p-2 tracking-wider text-white">
                  {product.price} ₽
                </p>
              </div>
            </div>
            <div className="absolute top-0 left-0 flex w-full px-4 pt-4 @container/label">
              <ColorsList product={product} colors={colors} />
            </div>
          </div>
        </Link>
      </li>
    ))}
  </ul>
  )
}