import FeatchIcon from '@/components/UI/FeatchButton/FeatchIcon'
import { API_URL } from '@/store/const'
import { fetchDelCart, fetchPatchCart, openCart } from '@/store/features/cartSlice'
import { AppDispatch, AppThunkDispatch } from '@/types/types'
import { MinusSmallIcon, PlusSmallIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import React, { MouseEventHandler, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

export default function CartItem({product, closeModal, cartStatus}: { product: {
    id: string,
    title: string,
    pic: string,
    size: string,
    colorTitle: string,
    color: number,
    price: number,
    count: number
  },
  cartStatus: string
  closeModal: MouseEventHandler<HTMLAnchorElement | HTMLDivElement>
}) {
  const dispatch:AppThunkDispatch = useDispatch();
  const [featchingCart, setFeatchingCart] = useState('');
  const delItem =() => {
    setFeatchingCart('del');
    dispatch(fetchDelCart({id: product.id, color: product.color, size: product.size}));
  };
  const changeCount = (count: number) => {
    if (count > 0) {
      const action = count > product.count ? 'inc' : 'dec'
      
      setFeatchingCart(action);
      dispatch(fetchPatchCart({id: product.id, color: product.color, size: product.size, count}));
      return;
    }

    setFeatchingCart('dec');
    dispatch(fetchDelCart({id: product.id, color: product.color, size: product.size}));
  }

  
  useEffect(() => {
    if(cartStatus !== 'loading') {
      setFeatchingCart('');
    }
  }, [cartStatus]);
  
  return (
    <li className="flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700">
      <div className="relative flex w-full flex-row justify-between px-1 py-4">
        <div className="absolute z-40 -mt-2 ml-[55px]">
          <button aria-label="Remove cart item" className="ease flex h-[17px] w-[17px] items-center justify-center rounded-full bg-neutral-500 transition-all duration-200" onClick={delItem}>
            {featchingCart === 'del' ?
              <FeatchIcon className='text-white'/> :
              <XMarkIcon className="hover:text-accent-3 mx-[1px] h-4 w-4 text-white dark:text-black" />
            }
          </button>
        </div>
        <Link className="z-30 flex flex-row space-x-4" href={`/products/${product.id}`} onClick={closeModal}>
          <div className="relative h-16 w-16 cursor-pointer overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800">
            <Image 
              width={50}
              height={50}
              src={`${API_URL}/${product.pic}`}
              alt={product.title}
              className="h-full w-full object-cover" style={{color: 'transparent'}}
            />
          </div>
          <div className="flex flex-1 flex-col text-base">
            <span className="leading-tight">{product.title}</span>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">{product.size} / {product.colorTitle}</p>
          </div>
        </Link>
        <div className="flex h-16 flex-col justify-between">
          <p className="flex justify-end space-y-2 text-right text-sm">{product.price * product.count}₽
          </p>
          <div className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700">
            <button aria-label="Reduce item quantity" className="ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full px-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80 ml-auto" onClick={() => changeCount(product.count - 1)}>
              {featchingCart === 'dec' ?
                <FeatchIcon className='black'/> :
                <MinusSmallIcon className="h-4 w-4 dark:text-neutral-500" />
              }
            </button>
            <p className="w-6 text-center">
              <span className="w-full text-sm">{product.count}</span>
            </p>
            <button aria-label="Increase item quantity" className="ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full px-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80" onClick={() => changeCount(product.count + 1)}>
              {featchingCart === 'inc' ?
                <FeatchIcon className='black'/> :
                <PlusSmallIcon className="h-4 w-4 dark:text-neutral-500" />
              }
            </button>
          </div>
        </div>
      </div>
    </li>
  )
}