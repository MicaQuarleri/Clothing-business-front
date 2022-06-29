import {
  GET_CUSTOMERS_FETCHING,
  GET_CUSTOMERS_FULFILLED,
  GET_CUSTOMERS_REJECTED,
  GET_ONE_CUSTOMER_FETCHING,
  GET_ONE_CUSTOMER_FULFILLED,
  GET_ONE_CUSTOMER_REJECTED,
  ADD_CUSTOMER_FETCHING,
  ADD_CUSTOMER_FULFILLED,
  ADD_CUSTOMER_REJECTED,
  UPDATE_CUSTOMER_FETCHING,
  UPDATE_CUSTOMER_FULFILLED,
  UPDATE_CUSTOMER_REJECTED,
  DELETE_CUSTOMER_FETCHING,
  DELETE_CUSTOMER_FULFILLED,
  DELETE_CUSTOMER_REJECTED,
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
    case GET_CUSTOMERS_FETCHING:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case GET_CUSTOMERS_FULFILLED:
      return {
        ...state,
        isLoading: false,
        error: false,
        list: action.payload,
      };
    case GET_CUSTOMERS_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: action.payload,
      };
    case GET_ONE_CUSTOMER_FETCHING:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case GET_ONE_CUSTOMER_FULFILLED:
      return {
        ...state,
        isLoading: false,
        error: false,
        selected: action.payload,
      };
    case GET_ONE_CUSTOMER_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: action.payload,
      };
    case ADD_CUSTOMER_FETCHING:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case ADD_CUSTOMER_FULFILLED:
      return {
        ...state,
        isLoading: false,
        error: false,
        list: [...state.list, action.payload],
      };
    case ADD_CUSTOMER_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: action.payload,
      };
    case UPDATE_CUSTOMER_FETCHING:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case UPDATE_CUSTOMER_FULFILLED:
      return {
        ...state,
        isLoading: false,
        error: false,
        list: [...state.list],
      };
    case UPDATE_CUSTOMER_REJECTED:
      return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: action.payload,
      };
    case DELETE_CUSTOMER_FETCHING:
      return {
        ...state,
        isLoading: true,
        error: false,
      };
    case DELETE_CUSTOMER_FULFILLED:
      return {
        ...state,
        isLoading: false,
        error: false,
        list: state.list.filter((customer) => customer.dni !== action.payload),
      };
    case DELETE_CUSTOMER_REJECTED:
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
