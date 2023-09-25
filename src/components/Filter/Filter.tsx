import { useFiltersParams } from '@/hooks/useFiltersParams'
import { ColorsState } from '@/store/features/colorsSlice';
import { getSearchParams } from '@/utils/getSearchParams';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import ColorListbox from '../UI/ColorsListbox/ColorsListbox'
import PriceListbox from '../UI/PriceListbox/PriceListbox';

export default function Filter({max, min, colors}: {max: number, min: number, colors: ColorsState}) {
  const {query} = useRouter();
  const except = ['page'];
  const searchParams = getSearchParams(query, except);
  const {filters, selectedColors, setSelectedColors, priceRange, setPriceRange} = useFiltersParams({query, max, min});

  return (
    <div className="mb-10 rounded-lg border border-[#e7e7e7] bg-[#f4f7ff] p-5">
      <div className="-mx-4 flex flex-wrap items-center justify-between">
        <div className="w-full px-4 md:w-9/12 lg:w-9/12 xl:w-8/12">
          <div className="items-center gap-4 sm:flex">
            <ColorListbox
              colors={colors.list}
              selectedColors={selectedColors}
              setSelectedColors={setSelectedColors} 
            />
            <PriceListbox
              range={priceRange}
              min={min}
              max={max}
              step={50}
              unit={'₽'}
              setRange={setPriceRange}
            />
          </div>
        </div>
        <div className="px-4">
        { searchParams.toString() !== filters &&
          <Link href={`/?${filters}`} className="inline-flex items-center justify-center rounded-md border border-black py-2 px-5 text-center text-sm font-semibold text-black transition hover:bg-black hover:text-white">
          Apply Filters
          </Link>
        }
        </div>
      </div>
    </div>
  )
}