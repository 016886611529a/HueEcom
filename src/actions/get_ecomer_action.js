import axios from 'axios';

import {GET_ECOM_URL} from '../api/api-url';
import {GET_ECOM_FAILURE, GET_ECOM_SUCCESS} from './type';

export const getEcomAction = () => {
  return async dispatch => {
    const maxRetries = 3; // Maximum number of retry attempts
    let retryCount = 0;

    while (retryCount < maxRetries) {
      try {
        const response = await axios.get(GET_ECOM_URL);
        const ecomer = response.data;
        dispatch({type: GET_ECOM_SUCCESS, payload: ecomer});
        return; // Exit the loop on successful response
      } catch (error) {
        if (error.response && error.response.status === 400) {
          console.log(
            'LỖI LẤY DS SÀN (400 error), Thử lại lần',
            retryCount + 1,
          );
          retryCount++;
          // Wait for a brief period before retrying
          await new Promise(resolve => setTimeout(resolve, 1000));
        } else {
          dispatch({type: GET_ECOM_FAILURE, payload: error.message});
          console.log('LỖI LẤY DS SÀN', error);
          return; // Exit the loop on other errors
        }
      }
    }

    // If maxRetries reached without success, dispatch failure action
    dispatch({type: GET_ECOM_FAILURE, payload: 'Reached maximum retries'});
  };
};
