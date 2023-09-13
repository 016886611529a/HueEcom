import {
  MAIN_CLEAR_DATA,
  MAIN_PRODUCT_FAILURE,
  MAIN_PRODUCT_REQUEST,
  MAIN_PRODUCT_REQUEST_MORE,
  MAIN_PRODUCT_SUCCESS,
  MAIN_PRODUCT_SUCCESS_MORE,
  MAIN_PRODUCT_FAILURE_MORE
} from '../../actions/type';

// reducer.js
const initialState = {
  loading: false,
  loadingMore: false,
  searchProducts: [],
  error: null,
  keyword: '',
};

const mainProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case MAIN_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case MAIN_PRODUCT_REQUEST_MORE:
      return {
        ...state,
        loading: false,
        loadingMore: true,
        error: null,
      };
    case MAIN_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        searchProducts: action.payload,
        error: null,
      };
    case MAIN_PRODUCT_SUCCESS_MORE: 
      return {
          ...state,
          loading: false,
          loadingMore: false,
          searchProducts: [...state.searchProducts,...action.payload],
          error: null,
      };
    case MAIN_PRODUCT_FAILURE_MORE:
      return {
        ...state,
        loading: false,
        loadingMore: false,
        error: null,
    };
    case MAIN_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        searchProducts: [],
        error: action.payload,
      };
    case MAIN_CLEAR_DATA:
      return {
        ...state,
        searchProducts: [],
        keyword: '',
      };
    default:
      return state;
  }
};

export default mainProductsReducer;
