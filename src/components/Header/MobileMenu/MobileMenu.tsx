import { Fragment } from 'react'
import { Dialog, Tab, Transition } from '@headlessui/react'
import {  XMarkIcon } from '@heroicons/react/24/outline'
import { NavigationState } from '@/store/features/navgationSlice'
import MobileBanner from './MobileBanner/MobileBanner'
import Link from 'next/link'

type MobileMenuProps = {
  open: boolean,
  setOpen: (value: boolean) => void,
  navigation: NavigationState,
  classNames: Function
};

export default function MobileMenu({open, setOpen, navigation, classNames}:MobileMenuProps ) {
  return (
    <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>
  
            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                  <div className="flex px-4 pb-2 pt-5">
                    <button
                      type="button"
                      className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                      onClick={() => setOpen(false)}
                    >
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
  
                  {/* Links */}
                  <Tab.Group as="div" className="mt-2">
                    <div className="border-b border-gray-200">
                      <Tab.List className="-mb-px flex space-x-8 px-4">
                        {navigation.genderList.map(gender => (
                          <Tab
                            key={gender}
                            className={({ selected }) =>
                              classNames(
                                selected ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-900',
                                'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium'
                              )
                            }
                          >
                            {navigation.list[gender].title}
                          </Tab>
                        ))}
                      </Tab.List>
                    </div>
                    <Tab.Panels as={Fragment}>
                      {navigation.genderList.map(gender => (
                        <Tab.Panel key={`${gender}-list`} className="space-y-10 px-4 pb-8 pt-10">
                          <MobileBanner
                            productId={navigation.list[gender].banner.id}
                            imgSrc={navigation.list[gender].banner.bg.mobile}
                            title={navigation.list[gender].banner.description}
                          />
                          <ul
                            role="list"
                            aria-labelledby={`${gender}-heading-mobile`}
                            className="mt-6 flex flex-col space-y-6"
                          >
                            {navigation.list[gender].list.map((item) => (
                              <li key={item.title} className="flow-root">
                                <Link href={`/catalog/${gender}/${item.slug.toString()}`} onClick={() => setOpen(false)} className="-m-2 block p-2 text-gray-500">
                                  {item.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </Tab.Panel>
                      ))}
                    </Tab.Panels>
                  </Tab.Group>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
  )
}