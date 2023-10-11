import { useFiltersParams } from '@/hooks/useFiltersParams'
import { ColorsState } from '@/store/features/colorsSlice';
import { NavigationState } from '@/store/features/navgationSlice';
import Link from 'next/link';
import CategoriesListbox from './CategoriesListbox/CategoriesListbox';
import ColorListbox from './ColorsListbox/ColorsListbox'
import PriceListbox from './PriceListbox/PriceListbox';

export default function Filter({max, min, colors, navigation}: {
  max: number
  min: number
  colors: ColorsState
  navigation?: NavigationState
}) {
  const {
    baseUrl,
    filters,
    searchParams,
    selectedColors,
    setSelectedColors,
    priceRange,
    setPriceRange,
    selectedCategories,
    setSelectedCategories
} = useFiltersParams({max, min});
  
  return (
    <div className="-mx-4 pt-4 sm:pt-6 flex flex-wrap sm:flex-nowrap items-center justify-between">
      <div className="w-full px-4 md:w-9/12 lg:w-9/12 xl:w-8/12">
        <div className="items-center gap-4 sm:flex">
          <ColorListbox
            colors={colors.list}
            selectedColors={selectedColors}
            setSelectedColors={setSelectedColors} 
          />
          {!!navigation && <CategoriesListbox 
            navigation={navigation}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />}
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
      <div className="px-4 shrink-0 pt-4 sm:pt-0">
      { searchParams !== filters &&
        <Link href={`${baseUrl || '/'}?${filters}`} className="inline-flex items-center justify-center rounded-md border border-black py-2 px-5 text-center text-sm font-semibold text-black transition hover:bg-black hover:text-white">
        Применить фильтры
        </Link>
      }
        
      { !!filters && searchParams === filters &&
        <Link href={baseUrl || '/'} className="inline-flex items-center justify-center rounded-md border border-black py-2 px-5 text-center text-sm font-semibold text-black transition hover:bg-black hover:text-white">
        Сбросить фильтры
        </Link>
      }
      </div>
    </div>
  )
}