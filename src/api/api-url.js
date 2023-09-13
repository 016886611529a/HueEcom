import {AppConfig, domain, domainDev, domains} from '../configs/app.config';

const API_URL = AppConfig.apiUrl;

// get all products
export const GET_ALL_PRODUCTS_URL = `${domains}/API/ThuongMaiDienTu/NganhHangApi/GetSanPham_ByNganhHangHueEcom?IdNganhHangHueEcom`;

// get danh mục
export const GET_CATEGORY_URL = `${domains}/API/ThuongMaiDienTu/NganhHangApi/GetNganhHangHueEcom`;

//get sàn thương mại điện tử
export const GET_ECOM_URL = `${domains}/API/QuanLyApi/QuanLySanTMDTApi/Gets`;
