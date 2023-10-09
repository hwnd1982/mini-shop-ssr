import Pagination from "@/components/UI/Pagination/Pagination";
import { API_URL } from "@/store/const";
import { fetchGoods, GoodsState } from "@/store/features/goodsSlice";
import { NavigationState } from "@/store/features/navgationSlice";
import { wrapper } from "@/store/store";
import { AppThunkDispatch } from "@/types/types";
import { MainContainer } from "@/components/MainContainer/MainContainer";
import { ColorsState } from "@/store/features/colorsSlice";
import Link from "next/link";
import Filter from "@/components/UI/Filter/Filter";
import ColorsList from "@/components/UI/ColorsList/ColorsList";
import Image from "next/image";
import { rgbDataURL } from "@/utils/rgbDataURL";
import GoodsList from "@/components/GoodsList/GoodsList";

export default function Index({navigation, colors, goods}: {navigation: NavigationState, colors: ColorsState, goods: GoodsState}) {
  const {list, page, pages, totalCount} = goods;
  
  return (
    <MainContainer keywords={'main page'} navigation={navigation} colors={colors}>
      <main className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>
          <Filter min={100} max={10000} colors={colors} navigation={navigation} />
          <GoodsList colors={colors} goods={list} />
          <Pagination page={page} pages={pages} count={12} totalCount={totalCount} />
        </div>
      </main>
    </MainContainer>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const dispatch:AppThunkDispatch = store.dispatch;
  
  ctx.res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );

  await dispatch(fetchGoods(ctx.query));
  return ({props:store.getState()})
});
