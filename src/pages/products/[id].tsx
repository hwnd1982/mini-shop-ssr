import { MainContainer } from "@/components/MainContainer/MainContainer";
import { ColorsState } from "@/store/features/colorsSlice";
import { NavigationState } from "@/store/features/navgationSlice";
import { fetchProduct, ProductState } from "@/store/features/productSlice";
import { wrapper } from "@/store/store";
import { AppThunkDispatch } from "@/types/types";
import { redirect } from 'next/navigation'

export default ({navigation, colors, product}: {navigation: NavigationState, colors: ColorsState, product: ProductState}) => { 
  const {data} = product;

  console.log(data);
  
  if (data === null || 'message' in data) {
    return <div></div>
  }

  return (
    <MainContainer keywords={data.title} navigation={navigation}>
      <h1>{data.title}</h1>
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
