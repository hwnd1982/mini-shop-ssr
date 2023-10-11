import { Dispatch, Fragment, SetStateAction, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { Color } from '@/store/features/colorsSlice'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import s from './ColorsListbox.module.sass';
import clsx from 'clsx';

export type SetSelectedColors = Dispatch<SetStateAction<string[]>>

interface ColorListboxProps {
  className?: string
  colors: Color[]
  selectedColors: string[]
  setSelectedColors: SetSelectedColors
}

export default function ColorListbox({className = '', colors, selectedColors, setSelectedColors}: ColorListboxProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
      <Listbox value={selectedColors} onChange={setSelectedColors} multiple>
        <div className={clsx("relative mt-1", className)} >
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">Цвета</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDownIcon
                className={clsx("h-4 w-4 text-gray-400 duration-100", isOpen && 'rotate-180')}
                aria-hidden="true"
              />
            </span>
            {!!selectedColors.length && <span className='absolute top-0 right-0 translate-y-[-50%] translate-x-[50%] rounded-full bg-indigo-300 rounded shadow-[rgba(87,13,248,.5)_inset_0_0_5px_1px] w-6 leading-6 text-center text-gray-600 text-sm'>
              {selectedColors.length}
            </span>}
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            beforeEnter={() => setIsOpen(true)}
            afterLeave={() => setIsOpen(false)}
          >
            <div className='absolute w-full sm:w-auto top-full translate-y-1 z-10 rounded-md bg-white/50 backdrop-blur-md py-2 pr-1 left-0 ring-black ring-opacity-5 shadow-lg'>
            <Listbox.Options className={clsx("max-h-60 text-base overflow-auto focus:outline-none sm:text-sm", s.optionsList)}>
              {colors.map((color) => (
                <Listbox.Option
                  key={`color-option-${color.id}`}
                  value={color.title}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {color.title}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                  
                </Listbox.Option>
              ))}
            </Listbox.Options>
            </div>
          </Transition>
        </div>
      </Listbox>
  )
}