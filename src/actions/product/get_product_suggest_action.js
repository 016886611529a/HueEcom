// actions.js
import axios from 'axios';
import {domain, domains} from '../../configs/app.config';
import {
  GET_PRODUCT_SUGGEST_FAILURE,
  GET_PRODUCT_SUGGEST_REQUEST,
  GET_PRODUCT_SUGGEST_SUCCESS,
} from '../type';
export const productSuggestRequestRequest = () => ({
  type: GET_PRODUCT_SUGGEST_REQUEST,
});

export const productSuggestRequestSuccess = productSuggest => ({
  type: GET_PRODUCT_SUGGEST_SUCCESS,
  payload: productSuggest,
});

export const productSuggestRequestFailure = error => ({
  type: GET_PRODUCT_SUGGEST_FAILURE,
  payload: error,
});

export const productSuggestAction = idNganhHangHueEcom => {
  return async dispatch => {
    try {
      dispatch({type: GET_PRODUCT_SUGGEST_REQUEST});

      let retryCount = 0;
      const maxRetries = 3;
      const retryDelay = 1000; // 1 second

      while (retryCount < maxRetries) {
        try {
          const response = await axios.get(
            `${domains}/API/ThuongMaiDienTu/NganhHangApi/GetSanPhamHueEcom?IdNganhHangHueEcom=${idNganhHangHueEcom}`,
          );
          const URL = `${domains}/API/ThuongMaiDienTu/NganhHangApi/GetSanPhamHueEcom?IdNganhHangHueEcom=${idNganhHangHueEcom}`;
          console.log('LINK', URL);
          dispatch({
            type: GET_PRODUCT_SUGGEST_SUCCESS,
            payload: response.data,
          });
          break; // Exit the loop if request is successful
        } catch (error) {
          if (error.response && error.response.status === 400) {
            retryCount++;
            console.log(`Retrying request (${retryCount} of ${maxRetries})...`);
            await new Promise(resolve => setTimeout(resolve, retryDelay));
          } else {
            dispatch({
              type: GET_PRODUCT_SUGGEST_FAILURE,
              payload: error.message,
            });
            console.log('LỖI SP GỢI Ý', error);
            break; // Exit the loop on other errors
          }
        }
      }
    } catch (error) {
      dispatch({
        type: GET_PRODUCT_SUGGEST_FAILURE,
        payload: error.message,
      });
      console.log('LỖI SP GỢI Ý', error);
    }
  };
};
