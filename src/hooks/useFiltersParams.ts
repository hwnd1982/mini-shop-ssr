import { getSearchParams } from "@/utils/getSearchParams";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

const except = ['page'];

export const useFiltersParams = ({min, max}: {min: number, max: number}) => {  
  const {query, asPath} = useRouter();
  const [baseUrl] = asPath.split('?');
  const searchParams = getSearchParams(query, except);
  const searchParamsStr = searchParams.toString();
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

  const resetFilters = useCallback(() => {
    setPriceRange({max, min});
    setSelectedColors([]);
    setSelectedCategories([]);
  }, [max, min]);

  useEffect(() => {
    if(!searchParamsStr) {
      resetFilters();
    }
  }, [baseUrl, resetFilters, searchParamsStr])

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
  }, [selectedCategories, selectedColors, priceRange, query, filters, min, max])

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