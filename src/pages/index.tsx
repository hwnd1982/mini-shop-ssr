import Pagination from "@/components/UI/Pagination/Pagination";
import { API_URL } from "@/store/const";
import { fetchGoods, GoodsState } from "@/store/features/goodsSlice";
import { NavigationState } from "@/store/features/navgationSlice";
import { wrapper } from "@/store/store";
import { AppThunkDispatch } from "@/types/types";
import { MainContainer } from "@/components/MainContainer/MainContainer";
import { ColorsState } from "@/store/features/colorsSlice";
import Link from "next/link";
import Filter from "@/components/Filter/Filter";
import ColorsList from "@/components/UI/ColorsList/ColorsList";
import Image from "next/image";
import { rgbDataURL } from "@/utils/rgbDataURL";
import { CartState } from "@/store/features/cartSlice";

export default function Index({navigation, colors, cart, goods}: {navigation: NavigationState, colors: ColorsState, cart: CartState, goods: GoodsState}) {
  const {list, page, pages, totalCount} = goods;
  const rgbData = rgbDataURL(200,200,200);

  return (
    <MainContainer keywords={'main page'} navigation={navigation} colors={colors}>
      <main className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>
            <Filter min={100} max={10000} colors={colors} navigation={navigation} />
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 pb-10">
              {list.map((product, index) => (
                <div key={product.id} className="grid grid-rows-[min-content_1fr]">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                    <Image
                      width={600}
                      height={600}
                      src={`${API_URL}/${product.pic}`}
                      alt={product.title}
                      priority={index < 8}
                      loading={index > 7 ? 'lazy' : undefined}
                      placeholder="blur"
                      blurDataURL={rgbData}
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

                    <ColorsList product={product} colors={colors} />

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
  
  ctx.res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  );

  await dispatch(fetchGoods(ctx.query));
  return ({props:store.getState()})
});
