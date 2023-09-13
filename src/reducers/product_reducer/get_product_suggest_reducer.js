import {
  GET_PRODUCT_SUGGEST_FAILURE,
  GET_PRODUCT_SUGGEST_REQUEST,
  GET_PRODUCT_SUGGEST_SUCCESS,
} from '../../actions/type';

// reducer.js
const initialState = {
  productSuggest: [],
  error: null,
  loading: false,
};

const productSuggestReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT_SUGGEST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_PRODUCT_SUGGEST_SUCCESS:
      return {
        ...state,
        productSuggest: action.payload,
        error: null,
        loading: false,
      };
    case GET_PRODUCT_SUGGEST_FAILURE:
      return {
        ...state,
        productSuggest: null,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
};

export default productSuggestReducer;
