import {
  CLEAR_DATA,
  SEARCH_PRODUCT_FAILURE,
  SEARCH_PRODUCT_REQUEST,
  SEARCH_PRODUCT_REQUEST_MORE,
  SEARCH_PRODUCT_SUCCESS,
  SEARCH_PRODUCT_SUCCESS_MORE,
  SEARCH_PRODUCT_FAILURE_MORE
} from '../../actions/type';

// reducer.js
const initialState = {
  loading: false,
  loadingMore: false,
  searchProducts: [],
  error: null,
  keyword: '',
};

const searchProductsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SEARCH_PRODUCT_REQUEST_MORE:
      return {
        ...state,
        loading: false,
        loadingMore: true,
        error: null,
      };
    case SEARCH_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        searchProducts: action.payload,
        error: null,
      };
    case SEARCH_PRODUCT_SUCCESS_MORE: 
      return {
          ...state,
          loading: false,
          loadingMore: false,
          searchProducts: [...state.searchProducts,...action.payload],
          error: null,
      };
    case SEARCH_PRODUCT_FAILURE_MORE:
      return {
        ...state,
        loading: false,
        loadingMore: false,
        error: null,
    };
    case SEARCH_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        searchProducts: [],
        error: action.payload,
      };
    case CLEAR_DATA:
      return {
        ...state,
        searchProducts: [],
        keyword: '',
      };
    default:
      return state;
  }
};

export default searchProductsReducer;
