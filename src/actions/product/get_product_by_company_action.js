import axios from 'axios';
import {
  GET_PRODUCT_BY_ID_COMPANY_REQUEST,
  GET_PRODUCT_BY_ID_COMPANY_SUCCESS,
  GET_PRODUCT_BY_ID_COMPANY_FAILURE,
} from '../type';
import {domains} from '../../configs/app.config';

export const productByCompanyRequestRequest = () => ({
  type: GET_PRODUCT_BY_ID_COMPANY_REQUEST,
});

export const productByCompanyRequestSuccess = productByCompany => ({
  type: GET_PRODUCT_BY_ID_COMPANY_SUCCESS,
  payload: productByCompany,
});

export const productByCompanyRequestFailure = error => ({
  type: GET_PRODUCT_BY_ID_COMPANY_FAILURE,
  payload: error,
});

export const productByCompanyRequestByIdAction = idCompany => {
  return async dispatch => {
    const maxRetries = 3; // Maximum number of retry attempts
    let retryCount = 0;

    while (retryCount < maxRetries) {
      try {
        dispatch({type: GET_PRODUCT_BY_ID_COMPANY_REQUEST});

        const response = await axios.get(
          `https://hueecom.thuathienhue.gov.vn/API/ThuongMaiDienTu/NganhHangApi/GetSanPhamGroupDoanhNghiep?IdDoanhNghiep=${idCompany}`,
        );

        dispatch({
          type: GET_PRODUCT_BY_ID_COMPANY_SUCCESS,
          payload: response.data,
        });
        return; // Exit the loop on successful response
      } catch (error) {
        if (error.response && error.response.status === 400) {
          console.log(
            'LỖI SP DOANH NGHIỆP (400 error), Thử lại lần',
            retryCount + 1,
          );
          retryCount++;
          // Wait for a brief period before retrying
          await new Promise(resolve => setTimeout(resolve, 1000));
        } else {
          dispatch(productByCompanyRequestFailure('Tải dữ liệu lỗi'));
          console.log('LỖI SP DOANH NGHIỆP', error);
          return; // Exit the loop on other errors
        }
      }
    }

    // If maxRetries reached without success, dispatch failure action
    dispatch(productByCompanyRequestFailure('Reached maximum retries'));
  };
};
