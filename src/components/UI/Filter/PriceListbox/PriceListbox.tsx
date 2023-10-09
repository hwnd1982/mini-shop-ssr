import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { ArrowSmallDownIcon, ArrowSmallUpIcon, ArrowsUpDownIcon, CheckIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import DoubleRangeSlider, { DoubleRangeProps } from './DoubleRangeSlider/DoubleRangeSlider';



export default function PriceListbox({className = '', range, min, max, unit, step, setRange}: DoubleRangeProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
      <Listbox multiple>
        <div className={clsx("relative mt-1", className)} >
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span>Цена</span>
            {/* <span className=""> от {range.min}{unit}</span> */}
            {/* <span className=""> до {range.max}{unit}</span> */}
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDownIcon
                className={clsx("h-4 w-4 text-gray-400 duration-100", isOpen && 'rotate-180')}
                aria-hidden="true"
              />
            </span>
            {(range.max !== max || range.min !== min) &&
              <span className='absolute top-0 right-0 flex items-center justify-center translate-y-[-50%] translate-x-[50%] rounded-full bg-indigo-300 rounded shadow-[rgba(87,13,248,.5)_inset_0_0_5px_1px] w-6 h-6 leading-6 text-center text-gray-600 text-sm'>
                {range.max !== max && range.min === min &&
                  <ArrowSmallUpIcon className="h-5 w-5" />
                }
                {range.max === max && range.min !== min &&
                  <ArrowSmallDownIcon className="h-5 w-5" />
                }
                {range.max !== max && range.min !== min &&
                  <ArrowsUpDownIcon className="h-5 w-5" />
                }
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
            <div className='absolute w-full sm:w-auto top-full translate-y-1 z-10 rounded-md bg-white py-2 pr-1 left-0 ring-black ring-opacity-5 shadow-lg border border-[#e7e7e7]'>
              <Listbox.Options >
                <DoubleRangeSlider className='' range={range} min={min} max={max} unit={unit} step={step} setRange={setRange}/>
              </Listbox.Options>
            </div>
          </Transition>
        </div>
      </Listbox>
  )
}