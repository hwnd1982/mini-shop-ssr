import Pagination from "@/components/UI/Pagination/Pagination";
import { fetchGoods, GoodsState } from "@/store/features/goodsSlice";
import { NavigationState } from "@/store/features/navgationSlice";
import { wrapper } from "@/store/store";
import { AppThunkDispatch } from "@/types/types";
import { MainContainer } from "@/components/MainContainer/MainContainer";
import { ColorsState } from "@/store/features/colorsSlice";
import Filter from "@/components/UI/Filter/Filter";
import { filterParams } from "@/utils/filterParams";
import GoodsList from "@/components/GoodsList/GoodsList";
import Empty from "@/components/Empty/Empty";

export default function Catalog({navigation, colors, goods}: {
  navigation: NavigationState
  colors: ColorsState
  goods: GoodsState
}) {
  const {list, page, pages, totalCount} = goods;
  
  return (
    <MainContainer keywords={'main page'} navigation={navigation} colors={colors}>      
      <section className="flex flex-col w-full shrink grow mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="sr-only">Products</h2>
        <Filter min={100} max={10000} colors={colors} />
        {list.length ?
          <>
            <GoodsList colors={colors} goods={list} className="grow" />
            <Pagination page={page} pages={pages} count={12} totalCount={totalCount} />
          </> : <Empty />
        }
      </section>
    </MainContainer>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const dispatch:AppThunkDispatch = store.dispatch;
  const [gender, category] = ctx?.params?.slug ?
    Array.isArray(ctx.params.slug) ?
      ctx.params.slug : [ctx.params.slug] : [];
  const query = filterParams({...ctx.query, gender, category}, ['slug']);


  ctx.res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );
  
  await dispatch(fetchGoods(query));
  return ({props: store.getState()})
});
