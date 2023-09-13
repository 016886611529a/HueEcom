import {applyMiddleware, combineReducers, createStore} from 'redux';

import thunk from 'redux-thunk';
import {configureStore} from '@reduxjs/toolkit';
import getAllProductsReducer from '../reducers/product_reducer/get_all_product_reducer';
import categoryReducer from '../reducers/category_reducer/category_reducer';
import getProductsByIdCategoryReducer from '../reducers/product_by_id_category/product_by_id_category_reducer';
import detailProductReducer from '../reducers/product_reducer/detail_product_reducer';
import productByCompanyReducer from '../reducers/product_reducer/get_product_by_company_reducer';
import productSuggestReducer from '../reducers/product_reducer/get_product_suggest_reducer';
import searchProductsReducer from '../reducers/product_reducer/search_product_reducer';
import getEcomReducer from '../reducers/get_ecomer_reducer';
import mainProductsReducer from '../reducers/product_reducer/main_product_reducer';

import homeReducer from '../stats/features/home/homeSlice';
import {searchReducer} from '../stats/features/search/searchSlice';


const rootReducer = combineReducers({
  getAllProducts: getAllProductsReducer,
  categories: categoryReducer,
  getProductsByIdCategory: getProductsByIdCategoryReducer,
  detailProduct: detailProductReducer,
  productByCompany: productByCompanyReducer,
  productSuggest: productSuggestReducer,
  searchProducts: searchProductsReducer,
  mainProducts: mainProductsReducer,
  getEcom: getEcomReducer,
  home: homeReducer,
  search: searchReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
