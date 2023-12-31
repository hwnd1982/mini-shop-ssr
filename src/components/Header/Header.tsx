import { Fragment, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { Bars3Icon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import { NavigationState } from '@/store/features/navgationSlice';
import MobileMenu from './MobileMenu/MobileMenu';
import Logo from './Logo/Logo';
import ActualPanelShadow from './ActualPanelShadow/ActualPanelShadow';
import Banner from './Banner/Banner';
import Nav from './Nav/Nav';
import CartModal from '../CartModal/CartModal';
import { openCart } from '@/store/features/cartSlice';
import { ColorsState } from '@/store/features/colorsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '@/store/store';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Header({navigation, colors}: {navigation: NavigationState, colors: ColorsState}) {
  const [open, setOpen] = useState(false);
  const cart = useSelector((state: AppState) => state.cart);
  const dispatch = useDispatch();
  const openModal = () => dispatch(openCart(true));
  
  return (
    <header className="relative z-50">
      {/* Mobile menu */}
      {navigation ?
        <MobileMenu open={open} setOpen={setOpen} navigation={navigation} classNames={classNames}/> : ''
      }

      <div className="relative bg-white">
        <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <Logo />

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.genderList.map((gender) => (
                    <Popover key={`${gender}-header-nav`} className="flex">
                      {({ open, close }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? 'border-indigo-600 text-indigo-600'
                                  : 'border-transparent text-gray-700 hover:text-gray-800',
                                'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out'
                              )}
                            >
                              {navigation.list[gender].title}
                            </Popover.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                              <ActualPanelShadow />

                              <div className="relative bg-white">
                                <div className="mx-auto max-w-7xl px-8">
                                  <div className="grid grid-cols-4 gap-x-8 gap-y-10 py-16">
                                    <Banner 
                                      productId={navigation.list[gender].banner.id}
                                      imgSrc={navigation.list[gender].banner.bg.desktop}
                                      title={navigation.list[gender].banner.description}
                                      onClick={close}
                                    />
                                    <Nav gender={gender} list={navigation.list[gender].list} onClick={close} />
                                  </div>
                                </div>
                              </div>

                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}
                </div>
              </Popover.Group>

              <div className="ml-auto flex items-center">
                {/* Search */}
                {/* <div className="flex lg:ml-6">
                  <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                  </a>
                </div> */}

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <button type='button' onClick={openModal} className="relative group -m-2 flex items-center p-2">
                    <ShoppingBagIcon
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    {!!cart.totalCount &&
                      <span className="absolute top-2 right-2 translate-y-[-50%] translate-x-[50%] rounded-full bg-indigo-300 rounded shadow-[rgba(87,13,248,.5)_inset_0_0_5px_1px] w-6 leading-6 text-center text-gray-600 text-sm">{cart.totalCount}</span>
                    }
                    <span className="sr-only">items in cart, view bag</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <CartModal cart={cart} colors={colors}/>
    </header>
  )
}
