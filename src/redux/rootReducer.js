import {combineReducers} from 'redux';
import getAllProductsReducer from '../reducers/product_reducer/get_all_product_reducer';
import categoryReducer from '../reducers/category_reducer/category_reducer';
import getProductsByIdCategoryReducer from '../reducers/product_by_id_category/product_by_id_category_reducer';
import detailProductReducer from '../reducers/product_reducer/detail_product_reducer';
import productByCompanyReducer from '../reducers/product_reducer/get_product_by_company_reducer';
import productSuggestReducer from '../reducers/product_reducer/get_product_suggest_reducer';
import searchProductsReducer from '../reducers/product_reducer/search_product_reducer';
import getEcomReducer from '../reducers/get_ecomer_reducer';

const rootReducer = combineReducers({
  getAllProducts: getAllProductsReducer,
  categories: categoryReducer,
  getProductsByIdCategory: getProductsByIdCategoryReducer,
  detailProduct: detailProductReducer,
  productByCompany: productByCompanyReducer,
  productSuggest: productSuggestReducer,
  searchProducts: searchProductsReducer,
  getEcom: getEcomReducer,
});

export default rootReducer;
