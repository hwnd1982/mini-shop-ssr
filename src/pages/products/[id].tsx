import { MainContainer } from "@/components/MainContainer/MainContainer";
import ColorsFieldset from "@/components/UI/ColorsFieldset/ColorsFieldset";
import FeatchIcon from "@/components/UI/FeatchButton/FeatchIcon";
import SizesFieldset from "@/components/UI/SizesFieldset/SizesFieldset";
import { API_URL } from "@/store/const";
import { fetchPostCart } from "@/store/features/cartSlice";
import { ColorsState } from "@/store/features/colorsSlice";
import { NavigationState } from "@/store/features/navgationSlice";
import { fetchProduct, ProductState } from "@/store/features/productSlice";
import { AppState, wrapper } from "@/store/store";
import { AppThunkDispatch } from "@/types/types";
import { Disclosure } from "@headlessui/react";
import { MinusCircleIcon, MinusSmallIcon, PlusIcon, PlusSmallIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default ({navigation, colors, product}: {navigation: NavigationState, colors: ColorsState, product: ProductState}) => { 
  const {data} = product;
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [addingToCart, setAddingToCart] = useState(false);
  const dispatch:AppThunkDispatch = useDispatch();
  const cartStatus = useSelector((state:AppState) => state.cart.status);

  const addItem = () => {
    if(product.data !== null && 'id' in product.data) {
      setAddingToCart(true);
      dispatch(fetchPostCart({id: product.data.id, color: selectedColor, size: selectedSize}))
    }
  };

  useEffect(() => {
    if(cartStatus !== 'loading') {
      setAddingToCart(false);
    }
  }, [cartStatus]);
  
  if (data === null || 'message' in data) {
    return <div></div>
  }

  return (
    <MainContainer keywords={data.title} navigation={navigation} colors={colors}>
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
                  <button onClick={addItem} className="flex w-full items-center justify-between bg-black py-3 px-10 text-center text-base font-semibold text-white hover:bg-opacity-90" disabled={!selectedColor || !selectedSize} >
                    {addingToCart ? 
                      <FeatchIcon className="h-[30px] w-[30px]" /> :
                      <PlusIcon height={30} width={30} />
                    }
                    <span className="grow">Add to Beg</span>
                  </button>
                </div>
                {product.data !== null && 'materials' in product.data &&
                  <div className="mb-4 space-y-4">
                    <div className="border-b border-[#e7e7e7]">
                      <Disclosure>
                        {({ open }) => (
                          <>
                            <Disclosure.Button className="mb-4 flex w-full items-center justify-between text-left">
                              <span className="text-base font-medium text-black">
                                Дополнительно:
                              </span>
                              <span className="text-xl font-medium text-black">
                                {open ? 
                                  <MinusSmallIcon height={25} width={25} /> :
                                  <PlusSmallIcon height={25} width={25} />
                                }
                              </span>
                            </Disclosure.Button>
                            <Disclosure.Panel>
                              <ul className="mb-4 text-base font-medium text-body-color">
                                {
                                  product.data !== null &&
                                  'materials' in product.data &&
                                  product.data.materials.split(',').map((item) => <li key={item}>{item}</li>)
                                }
                              </ul>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    </div>
                  </div>
                  }
              </div>
            </div>
          </div>
        }
        </div>
      </section>
    </MainContainer>
  )
}

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
