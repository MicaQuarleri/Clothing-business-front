import {
  GET_SALES_FETCHING,
  GET_SALES_FULFILLED,
  GET_SALES_REJECTED,
  ADD_SALE_FETCHING,
  ADD_SALE_FULFILLED,
  ADD_SALE_REJECTED,
  UPDATE_SALE_FETCHING,
  UPDATE_SALE_FULFILLED,
  UPDATE_SALE_REJECTED,
  ERROR_TO_DEFAULT,
} from "./constants";

const initialState = {
  isLoading: false,
  list: [],
  error: false,
  errorMessage: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SALES_FETCHING:
      return {
        ...state,
        error: false,
        isLoading: true,
      };
    case GET_SALES_FULFILLED:
      return {
        ...state,
        isLoading: false,
        error: false,
        list: action.payload,
      };
    case GET_SALES_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: action.payload,
      };
    case ADD_SALE_FETCHING:
      return {
        ...state,
        error: false,
        isLoading: true,
      };
    case ADD_SALE_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: [...state.list, action.payload],
      };
    case ADD_SALE_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: action.payload,
      };
    case UPDATE_SALE_FETCHING:
      return {
        ...state,
        error: false,
        isLoading: true,
      };
    case UPDATE_SALE_FULFILLED:
      return {
        ...state,
        isLoading: false,
        list: [...state.list],
      };
    case UPDATE_SALE_REJECTED:
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
