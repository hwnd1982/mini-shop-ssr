import Pagination from "@/components/Pagination/Pagination";
import { API_URL } from "@/store/const";
import { fetchGoods, GoodsState } from "@/store/features/goodsSlice";
import { NavigationState } from "@/store/features/navgationSlice";
import { wrapper } from "@/store/store";
import { AppThunkDispatch } from "@/types/types";
import { MainContainer } from "@/components/MainContainer/MainContainer";
import { ColorsState } from "@/store/features/colorsSlice";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import ColorListbox from "@/components/UI/ColorListbox/ColorListbox";
import PriceListbox from "@/components/UI/PriceListbox/PriceListbox";
import Link from "next/link";
import { useRouter } from "next/router";
import Filter from "@/components/Filter/Filter";



export default function Index({navigation, colors, goods}: {navigation: NavigationState, colors: ColorsState, goods: GoodsState}) {
  const {list, page, pages, totalCount} = goods;

  return (
    <MainContainer keywords={'main page'} navigation={navigation}>
      <main className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>
            <Filter min={100} max={10000} colors={colors} />
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 pb-10">
              {list.map((product) => (
                <div key={product.id} className="grid grid-rows-[min-content_1fr]">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                    <img
                      src={`${API_URL}/${product.pic}`}
                      alt={product.title}
                      className="h-full w-full object-cover object-top group-hover:opacity-75" />
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <h3 className="grow">
                      <Link href={`products/${product.id}`} className="mb-2 block text-lg font-semibold text-black hover:text-indigo-500 xs:text-xl sm:text-lg md:text-xl">
                        {product.title}
                      </Link>
                    </h3>
                    <p className="mb-4 text-base font-semibold text-black">
                      {product.price}₽
                    </p>
                    <div className="relative gap-2 mb-4 flex justify-center">
                      {product.colors.map(colorId => {
                        const color = colors.list.find(color => color.id === colorId);
                        
                        return <div key={`${product.id}-${color?.title}`} className={`w-5 h-5 bg-c-${color?.title} transition-all rounded-full block ring-c-${color?.title === 'white' ? 'slate-300' : color?.title} ring-offset-1${color?.title === 'white' ? ' border border-slate-300' : ''}`} ></div>
                      })}
                    </div>
                    <Link href={`products/${product.id}`} className="inline-flex items-center justify-center rounded-md border border-black py-2 px-5 text-center text-sm font-semibold text-black transition hover:bg-black hover:text-white">
                        Shop Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          <Pagination page={page} pages={pages} count={12} totalCount={totalCount} />
        </div>
      </main>
    </MainContainer>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const dispatch:AppThunkDispatch = store.dispatch;

  await dispatch(fetchGoods(ctx.query));
  return ({props:store.getState()})
});
