import {
  GET_PRODUCTS_FETCHING,
  GET_PRODUCTS_FULFILLED,
  GET_PRODUCTS_REJECTED,
  GET_ONE_PRODUCT_FETCHING,
  GET_ONE_PRODUCT_FULFILLED,
  GET_ONE_PRODUCT_REJECTED,
  ADD_PRODUCT_FETCHING,
  ADD_PRODUCT_FULFILLED,
  ADD_PRODUCT_REJECTED,
  UPDATE_PRODUCT_FETCHING,
  UPDATE_PRODUCT_FULFILLED,
  UPDATE_PRODUCT_REJECTED,
  DELETE_PRODUCT_FETCHING,
  DELETE_PRODUCT_FULFILLED,
  DELETE_PRODUCT_REJECTED,
  ERROR_TO_DEFAULT,
} from "./constants";

const initialState = {
  isLoading: false,
  list: [],
  error: false,
  errorMessage: "",
  selected: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_FETCHING:
      return {
        ...state,
        error: false,
        isLoading: true,
      };
    case GET_PRODUCTS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        error: false,
        list: action.payload,
      };
    case GET_PRODUCTS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: action.payload,
      };

    case GET_ONE_PRODUCT_FETCHING:
      return {
        ...state,
        error: false,
        isLoading: true,
      };
    case GET_ONE_PRODUCT_FULFILLED:
      return {
        ...state,
        selected: action.payload,
        isLoading: false,
      };
    case GET_ONE_PRODUCT_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: action.payload,
      };

    case ADD_PRODUCT_FETCHING:
      return {
        ...state,
        error: false,
        isLoading: true,
      };
    case ADD_PRODUCT_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: [...state.list, action.payload],
      };
    case ADD_PRODUCT_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: action.payload,
      };

    case UPDATE_PRODUCT_FETCHING:
      return {
        ...state,
        error: false,
        isLoading: true,
      };
    case UPDATE_PRODUCT_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: [...state.list],
      };
    case UPDATE_PRODUCT_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: action.payload,
      };

    case DELETE_PRODUCT_FETCHING:
      return {
        ...state,
        error: false,
        isLoading: true,
      };
    case DELETE_PRODUCT_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: state.list.filter((product) => product.sku !== action.payload),
      };
    case DELETE_PRODUCT_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: action.payload,
      };

    case ERROR_TO_DEFAULT: {
      return {
        ...state,
        error: false,
      };
    }
    default:
      return state;
  }
};

export default reducer;
