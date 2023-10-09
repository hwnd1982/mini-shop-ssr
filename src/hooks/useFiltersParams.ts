import { getSearchParams } from "@/utils/getSearchParams";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useFiltersParams = ({min, max}: {min: number, max: number}) => {
  const except = ['page'];
  const {query, asPath} = useRouter();
  const [baseUrl] = asPath.split('?');
  const searchParams = getSearchParams(query, except);
  const [filters, setFilters] = useState<string>(searchParams.toString());
  const [priceRange, setPriceRange] = useState({
    min: +(searchParams.get('min') || min),
    max: +(searchParams.get('max') || max),
  });
  const colorsParam = searchParams.get('colors');
  const [selectedColors, setSelectedColors] = useState<string[]>(
    colorsParam ? Array.isArray(colorsParam) ? colorsParam : colorsParam.split(',') : []
  );
  const categoriesParam = searchParams.get('categories');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoriesParam ? Array.isArray(categoriesParam) ? categoriesParam : categoriesParam.split(',') : []
  );

  const resetFilters = () => {
    setPriceRange({max, min});
    setSelectedColors([]);
    setSelectedCategories([]);
  }

  useEffect(() => {
    if(!searchParams.toString()) {
      resetFilters();
    }
  }, [baseUrl, searchParams.toString()])

  useEffect(() => {
    const filters = getSearchParams(query, except);
    
    if(priceRange.max !== max) {
      filters.set('maxprice',  priceRange.max.toString());
    } else {
      filters.delete('maxprice');
    }

    if(priceRange.min !== min) {
      filters.set('minprice',  priceRange.min.toString());
    } else {
      filters.delete('minprice');
    }

    if (selectedColors.length) {
      filters.set('colors',  selectedColors.join(','));
    } else {
      filters.delete('colors');
    }

    if (selectedCategories.length) {
      filters.set('categories',  selectedCategories.join(','));
    } else {
      filters.delete('categories');
    }

    setFilters(filters.toString())
  }, [selectedCategories, selectedColors, priceRange, filters])

  return {
    baseUrl,
    searchParams: searchParams.toString(),
    filters,
    resetFilters,
    priceRange,
    setPriceRange,
    selectedColors,
    setSelectedColors,
    selectedCategories,
    setSelectedCategories,
  };
}