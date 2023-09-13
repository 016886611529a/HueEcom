// import axios from 'axios';
// import {
//   DETAIL_PRODUCT_FAILURE,
//   DETAIL_PRODUCT_REQUEST,
//   DETAIL_PRODUCT_SUCCESS,
// } from '../type';
// import {domains} from '../../configs/app.config';

// export const detailProductRequestRequest = () => ({
//   type: DETAIL_PRODUCT_REQUEST,
// });

// export const detailProductRequestSuccess = product => ({
//   type: DETAIL_PRODUCT_SUCCESS,
//   payload: product,
// });

// export const detailProductRequestFailure = error => ({
//   type: DETAIL_PRODUCT_FAILURE,
//   payload: error,
// });

// export const detailProductRequestByIdAction = id => {
//   return async dispatch => {
//     dispatch(detailProductRequestRequest());

//     try {
//       const response = await axios.post(
//         `${domains}/API/ThuongMaiDienTu/NganhHangApi/ChiTietSanPham_ByID?Id=${id}`,
//       );

//       const product = await response.data; // Adjust this line based on the API response structure

//       dispatch(detailProductRequestSuccess(product));
//     } catch (error) {
//       dispatch(detailProductRequestFailure(error.message));
//       console.log('LOI CHI TIET', error);
//     }
//   };
// };

import axios from 'axios';
import {
  DETAIL_PRODUCT_FAILURE,
  DETAIL_PRODUCT_REQUEST,
  DETAIL_PRODUCT_SUCCESS,
} from '../type';
import {domains} from '../../configs/app.config';

const MAX_RETRY_COUNT = 3; // Maximum number of retries

export const detailProductRequestRequest = () => ({
  type: DETAIL_PRODUCT_REQUEST,
});

export const detailProductRequestSuccess = product => ({
  type: DETAIL_PRODUCT_SUCCESS,
  payload: product,
});

export const detailProductRequestFailure = error => ({
  type: DETAIL_PRODUCT_FAILURE,
  payload: error,
});

const handleRequest = async (id, retries) => {
  try {
    const response = await axios.post(
      `${domains}/API/ThuongMaiDienTu/NganhHangApi/ChiTietSanPham_ByID?Id=${id}`,
    );

    return response.data; // Adjust this line based on the API response structure
  } catch (error) {
    if (error.response && error.response.status === 400 && retries > 0) {
      // Retry the request with one less retry count
      return handleRequest(id, retries - 1);
    } else {
      throw error; // Throw the error if it's not a 400 status or reached maximum retries
    }
  }
};

export const detailProductRequestByIdAction = id => {
  return async dispatch => {
    dispatch(detailProductRequestRequest());

    try {
      const product = await handleRequest(id, MAX_RETRY_COUNT);

      dispatch(detailProductRequestSuccess(product));
    } catch (error) {
      dispatch(detailProductRequestFailure(error.message));
      console.log('LOI CHI TIET', error);
    }
  };
};
