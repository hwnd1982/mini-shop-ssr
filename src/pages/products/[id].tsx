import { MainContainer } from "@/components/MainContainer/MainContainer";
import ColorsFieldset from "@/components/UI/ColorsFieldset/ColorsFieldset";
import SizesFieldset from "@/components/UI/SizesFieldset/SizesFieldset";
import { API_URL } from "@/store/const";
import { CartState } from "@/store/features/cartSlice";
import { ColorsState } from "@/store/features/colorsSlice";
import { NavigationState } from "@/store/features/navgationSlice";
import { fetchProduct, ProductState } from "@/store/features/productSlice";
import { wrapper } from "@/store/store";
import { AppThunkDispatch } from "@/types/types";
import Image from "next/image";
import { useState } from "react";

export default ({navigation, colors, cart, product}: {navigation: NavigationState, colors: ColorsState, cart: CartState, product: ProductState}) => { 
  const {data} = product;
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  
  if (data === null || 'message' in data) {
    return <div></div>
  }

  return (
    <MainContainer keywords={data.title} navigation={navigation} cart={cart} colors={colors}>
      <section x-data="
        {
          productOne: true,
          productTwo: false,
          productThree: false,
          modalOpen: false
        }
      "className="bg-white md:pt-[60px] pt-[120px]">
        <div className="mx-auto max-w-7xl">
        {product.data !== null && 'id' in product.data &&
        <div className="flex justify-center lg:justify-between flex-wrap">
            <div className="w-full px-4 md:w-9/12 lg:w-5/12">
              <div className="relative aspect-h-1 aspect-w-1 lg:aspect-h-4 lg:aspect-w-3 mb-8 border border-[#e7e7e7]">
                  <Image width={600} height={800} src={`${API_URL}/${product.data?.pic}`} alt="products-details" className="h-full w-full object-cover object-top" />
              </div>
            </div>

            <div className="w-full px-4 md:w-9/12 lg:w-1/2">
              <div>
                <h1 className="mb-5 text-xl font-semibold text-black sm:text-4xl lg:text-3xl xl:text-4xl">
                  {data.title}
                </h1>
                <p className="mb-5 text-base font-medium text-body-color">
                  {product.data.description}
                </p>

                <div className="flex flex-wrap justify-between">
                  <div className="mr-5">
                    <h4 className="mb-4 text-lg font-semibold text-black">Цвета</h4>

                    <ColorsFieldset
                      productColors={product.data.colors}
                      colors={colors}
                      selectedColor={selectedColor}
                      setSelectedColor={setSelectedColor}
                    />

                  </div>
                  <div className="mr-5">

                    <h4 className="mb-4 text-lg font-semibold text-black">Размеры</h4>
                    <SizesFieldset
                      productSizes={product.data.size}
                      selectedSize={selectedSize}
                      setSelectedSize={setSelectedSize}
                    />
                  </div>
                </div>
                <div className="mb-9 pt-5">
                  <button onClick={() => {
                    console.log(product);
                  }} className="flex w-full items-center justify-center bg-black py-3 px-10 text-center text-base font-semibold text-white hover:bg-opacity-90" disabled={!selectedColor || !selectedSize}>
                    Add to Beg
                  </button>
                </div>

                <div className="mb-4 space-y-4" x-data="
                    {
                      tabOne: false,
                      tabTwo: false
                    }                
                  ">
                  <div className="border-b border-[#e7e7e7]">
                    <button className="mb-4 flex w-full items-center justify-between text-left">
                      <span className="text-base font-medium text-black">
                        Shipping and Returns
                      </span>
                      <span className="text-xl font-medium text-black" x-text=" tabOne ? ' - ' : ' + ' "> + </span>
                    </button>
                    <div x-show="tabOne" style={{display: 'none'}}>
                      <p className="mb-4 text-base font-medium text-body-color">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Earum animi pariatur hic fuga quidem labore repudiandae
                        sequi, molestias provident quisquam!
                      </p>
                    </div>
                  </div>

                  <div className="border-b border-[#e7e7e7]">
                    <button className="mb-4 flex w-full items-center justify-between text-left">
                      <span className="text-base font-medium text-black">
                        Details
                      </span>
                      <span className="text-xl font-medium text-black" x-text=" tabTwo ? ' - ' : ' + ' "> + </span>
                    </button>
                    <div x-show="tabTwo" style={{display: 'none'}}>
                      <p className="mb-4 text-base font-medium text-body-color">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Earum animi pariatur hic fuga quidem labore repudiandae
                        sequi, molestias provident quisquam!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
        </div>
      </section>
    </MainContainer>
  )
}

// export const getServerSideProps = async ({params}) => {
//   const response = await fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`);
//   const user = await response.json();

//   return {
//     props: {user}
//   }
// }

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx) => {
  const state: {
    props: {
      product: ProductState
    } | {}
  } = {props: {}};

  const dispatch:AppThunkDispatch = store.dispatch;
  
  if (ctx.query.id && !Array.isArray(ctx.query.id)) {
    await dispatch(fetchProduct(ctx.query.id));
  }

  state.props = store.getState();

  if (
    state.props === null ||
    !('product' in state.props) ||
    ('product' in state.props && state.props.product.data !== null && 'message' in state.props.product.data)
  ) {
    return {
        redirect: {
        permanent: false,
        destination: "/404"
      }
    }
  }

  return (state);
});
