// reducers.js
import {
  GET_PRODUCTS_BY_ID_CATEGORY_FAILURE,
  GET_PRODUCTS_BY_ID_CATEGORY_REQUEST,
  GET_PRODUCTS_BY_ID_CATEGORY_SUCCESS,
} from '../../actions/type';

const initialState = {
  productsByIdCategory: [],
  loading: false,
  error: null,
};

const getProductsByIdCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_BY_ID_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_PRODUCTS_BY_ID_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        productsByIdCategory: action.payload,
        error: null,
      };
    case GET_PRODUCTS_BY_ID_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default getProductsByIdCategoryReducer;
