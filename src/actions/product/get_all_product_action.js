import {GET_ALL_PRODUCTS_URL} from '../../api/api-url';
import {
  GET_ALL_PRODUCTS_REQUEST,
  GET_ALL_PRODUCTS_SUCCESS,
  GET_ALL_PRODUCTS_FAILURE,
} from '../type';

export const getAllProductAction = () => {
  return async dispatch => {
    dispatch({type: GET_ALL_PRODUCTS_REQUEST});

    try {
      const response = await fetch(GET_ALL_PRODUCTS_URL);
      if (!response.ok) {
        throw new Error('Tải dữ liệu không thành công!');
      }
      const data = await response.json();
      dispatch({type: GET_ALL_PRODUCTS_SUCCESS, payload: data});
    } catch (error) {
      dispatch({type: GET_ALL_PRODUCTS_FAILURE, payload: error.message});
      console.log('LỖI LẤY SẢN PHẨM', error);
    }
  };
};
