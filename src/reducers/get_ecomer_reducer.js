import {GET_ECOM_FAILURE, GET_ECOM_SUCCESS} from '../actions/type';

const initialState = {
  getEcom: [],
  loading: false,
  error: null,
};

const getEcomReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ECOM_SUCCESS:
      return {
        ...state,
        getEcom: action.payload,
        loading: false,
        error: null,
      };
    case GET_ECOM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default getEcomReducer;
