import { Fragment, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import { NavigationState } from '@/store/features/navgationSlice';
import MobileMenu from './MobileMenu/MobileMenu';
import Logo from './Logo/Logo';
import ActualPanelShadow from './ActualPanelShadow/ActualPanelShadow';
import Banner from './Banner/Banner';
import Nav from './Nav/Nav';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Header(props: {navigation: NavigationState}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white relative z-50">
        {/* Mobile menu */}
        {props?.navigation ?
          <MobileMenu open={open} setOpen={setOpen} navigation={props.navigation} classNames={classNames}/> : ''
        }

        <header className="relative bg-white ">
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
                    {props.navigation.genderList.map((gender) => (
                      <Popover key={`${gender}-header-nav`} className="flex">
                        {({ open }) => (
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
                                {props.navigation.list[gender].title}
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
                                        productId={props.navigation.list[gender].banner.id}
                                        imgSrc={props.navigation.list[gender].banner.bg.desktop}
                                        title={props.navigation.list[gender].banner.description}
                                      />
                                      <Nav gender={gender} list={props.navigation.list[gender].list}/>
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
                  <div className="flex lg:ml-6">
                    <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                      <span className="sr-only">Search</span>
                      <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                    </a>
                  </div>
  
                  {/* Cart */}
                  <div className="ml-4 flow-root lg:ml-6">
                    <a href="#" className="group -m-2 flex items-center p-2">
                      <ShoppingBagIcon
                        className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                      <span className="sr-only">items in cart, view bag</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>
    </div>
  )
}
