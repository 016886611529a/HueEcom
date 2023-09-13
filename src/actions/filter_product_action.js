// actions.js
import axios from 'axios';
import {
  CLEAR_DATA,
  SEARCH_PRODUCT_FAILURE,
  SEARCH_PRODUCT_FAILURE_MORE,
  SEARCH_PRODUCT_REQUEST,
  SEARCH_PRODUCT_REQUEST_MORE,
  SEARCH_PRODUCT_SUCCESS,
  SEARCH_PRODUCT_SUCCESS_MORE,
} from './type';
import {domain, domains} from '../configs/app.config';
export const clearData = () => ({
  type: CLEAR_DATA,
});

export const filterProductAction = ({
  GiaBatDau = '',
  GiaKetThuc = '',
  IdSan = '',
  IdNganhHangHueecom = '',
  
},page, perPage) => {
  return async dispatch => {
    dispatch({
      type: page == 0 ? SEARCH_PRODUCT_REQUEST : SEARCH_PRODUCT_REQUEST_MORE,
    });

    let retryCount = 0;
    const maxRetries = 3; // Maximum number of retries

    while (retryCount < maxRetries) {
      try {
        if (GiaBatDau != '') {
          GiaBatDau = GiaBatDau.replace('.', '');
        }

        if (GiaKetThuc != '') {
          GiaKetThuc = GiaKetThuc.replace('.', '');
        }

        const response = await axios.post(
          `${domains}/API/ThuongMaiDienTu/NganhHangApi/GetSanPhamFilter`,
          {
            GiaBatDau,
            GiaKetThuc,
            IdSan,
            IdNganhHangHueecom,
            Page: page,
            PerPage: perPage,
          },
        );

        const searchProducts = response.data;

        dispatch({
          type: page == 0 ? SEARCH_PRODUCT_SUCCESS : SEARCH_PRODUCT_SUCCESS_MORE,
          payload: searchProducts,
        });
        return; // Exit the loop on successful response
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
      }
    }
  };
};
