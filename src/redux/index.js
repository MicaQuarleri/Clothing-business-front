import { combineReducers } from "redux";
import productReducer from "./products/reducers";
import customerReducer from "./customers/reducers";
import saleReducer from "./sales/reducers";

const mainReducer = combineReducers({
  products: productReducer,
  customers: customerReducer,
  sales: saleReducer,
});
export default mainReducer;
