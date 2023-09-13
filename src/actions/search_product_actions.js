// actions.js
import axios from 'axios';
import {
  CLEAR_DATA,
  SEARCH_PRODUCT_FAILURE,
  SEARCH_PRODUCT_REQUEST,
  SEARCH_PRODUCT_REQUEST_MORE,
  SEARCH_PRODUCT_SUCCESS,
  SEARCH_PRODUCT_SUCCESS_MORE,
  SEARCH_PRODUCT_FAILURE_MORE,
  MAIN_PRODUCT_FAILURE,
  MAIN_PRODUCT_REQUEST,
  MAIN_PRODUCT_REQUEST_MORE,
  MAIN_PRODUCT_SUCCESS,
  MAIN_PRODUCT_SUCCESS_MORE,
  MAIN_PRODUCT_FAILURE_MORE,
} from './type';
import {domain, domains} from '../configs/app.config';

export const clearData = () => ({
  type: CLEAR_DATA,
});

const MAX_RETRY_COUNT = 3;

const handleRequest = async (endpoint, data, retries) => {
  try {
    const response = await axios.post(endpoint, data);
    return response;
  } catch (error) {
    if (retries > 0) {
      // Retry the request with one less retry count
      return handleRequest(endpoint, data, retries - 1);
    } else {
      throw error; // Throw the error if it's not a 400 status or reached maximum retries
    }
  }
};

export const searchProductsAction = (keyword, page, perPage) => {
  return async dispatch => {
    dispatch({
      type: page == 0 ? SEARCH_PRODUCT_REQUEST : SEARCH_PRODUCT_REQUEST_MORE,
    });

    try {
      const response = await handleRequest(
        `${domains}/API/ThuongMaiDienTu/NganhHangApi/GetSanPhamFilter`,
        {
          TuKhoa: keyword,
          Page: page,
          PerPage: perPage,
        },
        MAX_RETRY_COUNT,
      );

      const searchProducts = response.data;
      dispatch({
        type: page == 0 ? SEARCH_PRODUCT_SUCCESS : SEARCH_PRODUCT_SUCCESS_MORE,
        payload: searchProducts,
      });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        dispatch({
          type: SEARCH_PRODUCT_FAILURE,
          payload: 'Lỗi không tải được dữ liệu',
        });
      } else
        dispatch({
          type:
            page == 0 ? SEARCH_PRODUCT_FAILURE : SEARCH_PRODUCT_FAILURE_MORE,
          payload: error.message,
        });
      // console.log('LỖI TÌM KIẾM', error);
    }
  };
};

export const mainProductsAction = (keyword, page, perPage) => {
  return async dispatch => {
    dispatch({
      type: page == 0 ? MAIN_PRODUCT_REQUEST : MAIN_PRODUCT_REQUEST_MORE,
    });

    try {
      const response = await handleRequest(
        `${domains}/API/ThuongMaiDienTu/NganhHangApi/GetSanPhamFilter`,
        {
          TuKhoa: keyword,
          Page: page,
          PerPage: perPage,
        },
        MAX_RETRY_COUNT,
      );
      const searchProducts = response.data;

      dispatch({
        type: page == 0 ? MAIN_PRODUCT_SUCCESS : MAIN_PRODUCT_SUCCESS_MORE,
        payload: searchProducts,
      });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        dispatch({
          type: MAIN_PRODUCT_FAILURE,
          payload: 'Lỗi không tải được dữ liệu',
        });
      } else
        dispatch({
          type: page == 0 ? MAIN_PRODUCT_FAILURE : MAIN_PRODUCT_FAILURE_MORE,
          payload: error.message,
        });
      // console.log('LỖI TÌM KIẾM', error);
    }
  };
};
