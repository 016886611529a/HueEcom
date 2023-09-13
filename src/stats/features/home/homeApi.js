import axios from 'axios';
import {Platform, Alert} from 'react-native';

export const fetchOrderApi = async ({
  username,
  keyword = null,
  orderId = null,
  statusId = null,
  ecomerceId = null,
  startDate = null,
  endDate = null,
  IdGianHang = null,
}) => {
  const MAX_RETRIES = 3; // Số lần thử lại tối đa
  let retryCount = 0;

  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({
      UserName: username,
      TuKhoa: keyword,
      IdDonHang: null,
      IdTrangThai: statusId,
      IdSanTMDT: ecomerceId,
      NgayBatDau: startDate,
      NgayKetThuc: endDate,
      IdGianHang: IdGianHang,
      PageNumber: null,
      RowPerPage: null,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  while (retryCount < MAX_RETRIES) {
    try {
      const response = await fetch(
        'https://hueecom.thuathienhue.gov.vn/api/QuanLyAPI/AppApi/Filter',
        requestOptions,
      );

      if (response.status === 200) {
        const data = await response.json();
        return data;
      } else if (response.status === 400) {
        // Ghi log lỗi 400 nếu bạn muốn
        console.log('Error 400 received, retrying...');
      } else {
        // Xử lý các lỗi khác (nếu có) ở đây
        throw new Error(`API Error: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching API:', error);
      retryCount++;
    }
  }

  throw new Error('Max retries reached');
};
export const statisticalFetchApi = async ({
  UserName = global.data.preferred_username,
  NgayBatDau = null,
  NgayKetThuc = null,
}) => {
  const MAX_RETRIES = 3; // Số lần thử lại tối đa
  let retryCount = 0;

  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({
      UserName: global.data.preferred_username,
      NgayBatDau: NgayBatDau,
      NgayKetThuc: NgayKetThuc,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  while (retryCount < MAX_RETRIES) {
    try {
      const response = await fetch(
        'https://hueecom.thuathienhue.gov.vn/api/QuanLyAPI/AppApi/ThongKe',
        requestOptions,
      );

      if (response.status === 200) {
        const data = await response.json();
        return data;
      } else if (response.status === 400) {
        // Ghi log lỗi 400 nếu bạn muốn
        console.log('Error 400 received, retrying...');
      } else {
        // Xử lý các lỗi khác (nếu có) ở đây
        throw new Error(`API Error: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching API:', error);
      retryCount++;
    }
  }

  throw new Error('Max retries reached');
};

export const changeStatusOrderApi = async (id, status = true) => {
  const MAX_RETRIES = 3; // Số lần thử lại tối đa
  let retryCount = 0;

  const url = status
    ? `https://hueecom.huecit.com/api/QuanLyAPI/AppApi/XacNhanDon?DonHangID=${id}`
    : `https://hueecom.huecit.com/api/QuanLyAPI/AppApi/HuyDonHang?DonHangID=${id}`;

  while (retryCount < MAX_RETRIES) {
    try {
      const response = await fetch(url);

      if (response.status === 200) {
        const platform = Platform.OS;

        Alert.alert(
          `${status === true ? 'Xác nhận' : 'Huỷ'} đơn hàng thành công`,
        );

        return response.status;
      } else if (response.status === 400) {
        // Ghi log lỗi 400 nếu bạn muốn
        console.log('Error 400 received, retrying...');
      } else {
        // Xử lý các lỗi khác (nếu có) ở đây
        throw new Error(`API Error: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching API:', error);
      retryCount++;
    }
  }

  throw new Error('Max retries reached');
};

export const getUserInfoApi = async username => {
  const MAX_RETRIES = 3; // Số lần thử lại tối đa
  let retryCount = 0;

  while (retryCount < MAX_RETRIES) {
    try {
      const response = await axios.post(
        `https://hueecom.huecit.com/api/QuanLyAPI/AppApi/GetUserInfo?UserName=${username}`,
      );

      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Ghi log lỗi 400 nếu bạn muốn
        console.log('Error 400 received, retrying...');
      } else {
        // Xử lý các lỗi khác (nếu có) ở đây
        console.error('Error fetching API:', error);
        throw error;
      }
    }

    retryCount++;
  }

  throw new Error('Max retries reached');
};
