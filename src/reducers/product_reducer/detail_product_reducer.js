import {
  DETAIL_PRODUCT_FAILURE,
  DETAIL_PRODUCT_REQUEST,
  DETAIL_PRODUCT_SUCCESS,
} from '../../actions/type';

const initialState = {
  loading: false,
  detailProduct: [],
  error: null,
};

const detailProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case DETAIL_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DETAIL_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        detailProduct: action.payload,
      };
    case DETAIL_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default detailProductReducer;
