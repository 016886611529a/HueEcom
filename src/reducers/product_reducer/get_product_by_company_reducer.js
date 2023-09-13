import {
  GET_PRODUCT_BY_ID_COMPANY_REQUEST,
  GET_PRODUCT_BY_ID_COMPANY_SUCCESS,
  GET_PRODUCT_BY_ID_COMPANY_FAILURE,
} from '../../actions/type';

const initialState = {
  loading: false,
  productByCompany: [],
  error: null,
};

const productByCompanyReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT_BY_ID_COMPANY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_PRODUCT_BY_ID_COMPANY_SUCCESS:
      return {
        ...state,
        loading: false,
        productByCompany: action.payload,
      };
    case GET_PRODUCT_BY_ID_COMPANY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default productByCompanyReducer;
