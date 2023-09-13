// categoryActions.js

import axios from 'axios';
import {
  GET_CATEGORY_FAILURE,
  GET_CATEGORY_SUCCESS,
  GET_PRODUCTS_BY_ID_CATEGORY_FAILURE,
  GET_PRODUCTS_BY_ID_CATEGORY_REQUEST,
  GET_PRODUCTS_BY_ID_CATEGORY_SUCCESS,
} from '../type';
import {GET_ALL_PRODUCTS_URL, GET_CATEGORY_URL} from '../../api/api-url';

export const categoryAction = () => {
  return async dispatch => {
    try {
      const response = await axios.get(GET_CATEGORY_URL);
      const categories = response.data;
      dispatch({type: GET_CATEGORY_SUCCESS, payload: categories});
    } catch (error) {
      dispatch({type: GET_CATEGORY_FAILURE, payload: error.message});
    }
  };
};

// get sp by danh mục ID
export const getProductsByCategoryIdActions = categoryId => {
  return async dispatch => {
    dispatch({type: GET_PRODUCTS_BY_ID_CATEGORY_REQUEST});
    const maxRetries = 3; // Maximum number of retries
    let retries = 0;

    while (retries < maxRetries) {
      try {
        const response = await fetch(`${GET_ALL_PRODUCTS_URL}=${categoryId}`);
        if (!response.ok) {
          throw new Error('Tải dữ liệu không thành công!');
        }
        const URL = `${GET_ALL_PRODUCTS_URL}=${categoryId}`;
        console.log('LINK', URL);
        const data = await response.json();
        dispatch({type: GET_PRODUCTS_BY_ID_CATEGORY_SUCCESS, payload: data});
        console.log('SẢN PHẨM BY ID CATEGORY', data);
        return; // Success, exit the loop
      } catch (error) {
        console.error('Error:', error);
        retries++;
        if (retries < maxRetries) {
          console.log(`Retrying... Attempt ${retries}`);
        } else {
          dispatch({
            type: GET_PRODUCTS_BY_ID_CATEGORY_FAILURE,
            payload: error.message,
          });
          return; // Max retries reached, exit the loop
        }
      }
    }
  };
};
