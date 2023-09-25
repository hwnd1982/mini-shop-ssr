import { combineReducers} from "@reduxjs/toolkit";
import colorsReducer from "./features/colorsSlice";
import goodsReducer from "./features/goodsSlice";
import navigationReducer from "./features/navgationSlice";
import productReducer from "./features/productSlice";

const rootReducer = combineReducers({
  colors: colorsReducer,
  navigation: navigationReducer,
  goods: goodsReducer,
  product: productReducer,
});



export default rootReducer;
