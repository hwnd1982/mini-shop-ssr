import { Fragment } from 'react';
import { Dialog, Disclosure, Transition } from '@headlessui/react';
import { ChevronUpIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { CartState, openCart } from '@/store/features/cartSlice';
import CartItem from './CartItem/CartItem';
import { ColorsState } from '@/store/features/colorsSlice';
import { useDispatch } from 'react-redux';
import Checkout from '../Checkout/Checkout';

export default function CartModal({cart, colors}: {
  cart: CartState
  colors: ColorsState
}) {
  const dispatch = useDispatch();
  const closeModal = () => dispatch(openCart(false));
  
  return (
    <Transition
      show={cart.opened}
      as={Fragment}
    >
      <Dialog onClose={closeModal} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 bg-black/30 opacity-100 backdrop-blur-[.5px]"
            aria-hidden="true"
            onClick={closeModal}
          ></div>
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="ease-in duration-200"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          <div className="fixed bottom-0 right-0 top-0 flex flex-col w-full border-l border-neutral-200 bg-white/90 p-6 text-black backdrop-blur-xl dark:border-neutral-700 dark:bg-black/80 dark:text-white md:w-[390px] translate-x-0" id="headlessui-dialog-panel-:r1:">
            {/* <Dialog.Panel> */}
              
              <Dialog.Title>Завершите свой заказ</Dialog.Title>
              <div className="flex items-center justify-between mb-4">
                <p className="text-lg font-semibold">Корзина</p>
                <button aria-label="Close cart" onClick={closeModal}>
                  <div className="relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white">
                    <XMarkIcon className="h-6 transition-all ease-in-out hover:scale-110" />
                  </div>
                </button>
              </div>
              <div className="flex grow flex-col justify-between overflow-hidden p-1">
                <ul className="grow overflow-auto py-4 pr-3 scroll">
                  {cart.list.map(item => {
                    const product = cart.products[item.id];
                    const color = colors.list.find(color => color.id === item.color)?.title || '';

                    return <CartItem
                      key={`${item.id}-${item.color}-${item.size}`}
                      product={{...item, ...product, colorTitle: color}}
                      cartStatus={cart.status} 
                      closeModal={closeModal}
                    />
                  })}
                </ul>
                <div className="py-4 text-sm text-neutral-500 dark:text-neutral-400">
                <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
                  <p>ИТОГО:</p>
                  <p className="text-right text-base text-black dark:text-white">
                    {cart.totalPrice}₽
                  </p>
                </div>
                </div>
                {/* <a href="#" className="block w-full rounded-full bg-blue-600 p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100">Proceed to Checkout</a> */}
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full justify-between rounded-full bg-indigo-600 p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100">
                        <span>Оформить заказ</span>
                        <ChevronUpIcon className={`${ open ? 'rotate-180 transform' : ''} h-5 w-5`} />
                      </Disclosure.Button>

                        <Disclosure.Panel unmount={false} className="px-4 pt-4 pb-2 text-sm text-gray-500">
                          <Checkout />
                        </Disclosure.Panel>

                    </>
                  )}
                </Disclosure>
              </div>
            {/* </Dialog.Panel> */}
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}
