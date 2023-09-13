import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  changeStatusOrderApi,
  fetchOrderApi,
  getUserInfoApi,
  statisticalFetchApi,
} from './homeApi';
import { BASEURL, MockColor } from '../../data/mock/mock';
import { PROP } from '../../components/PopupFilter';
import { Alert } from 'react-native';

const initialState = {
  data: [],
  value: 0,
  status: 'loading',
  valueOrderType: {
    warting: 0,
    cancel: 0,
    delivering: 0,
    finished: 0,
    total: 0,
  },
  timerFilterForm: {
    startTime: new Date(),
    endTime: new Date()
  },
  filterStatus: false,
  dataFilterTimer: [],
  selectedStatus: 0,
  dataStatistical: [],
  revenue: 0,
  sales: 0,
  dataStatisticalBar: [],
  storeStatisticalBar: [],
  dataFilter: [],
  dataAdvantedFilter: [],
  selectedDetailOrder: {},
  selectedTypeRevenue: 1,
  selectedTypeSale: 1,
  userInfo: {
    TenDoanhNghiep: '',
    Avatar: '',
    GianHang: [],
  },
  StoreSelected: [],
  selectedEcomId: 0,
  selectedStoreId: 0,
  EcomSelected: PROP,
};

export const statisticalFetch = createAsyncThunk(
  'statistical/statisticalFetch',
  async ({
    UserName = global.data.preferred_username,
    NgayBatDau = null,
    NgayKetThuc = null,
  }) => {
    var data = await statisticalFetchApi({
      UserName: UserName,
      NgayBatDau: NgayBatDau,
      NgayKetThuc: NgayKetThuc,
    });
    return data;
  },
);
export const fetchOrderAsync = createAsyncThunk('home/fetchOrder', async ({ statusId = null, ecomerceId = null, startDate = null, endDate = null, storeID = null }) => {
  var data = await fetchOrderApi({
    username: global.data.preferred_username,
    keyword: null,
    orderId: null,
    statusId: statusId,
    ecomerceId: ecomerceId,
    startDate: startDate,
    endDate: endDate,
    IdGianHang: storeID
  });
  return data;
});

export const fetchOrderAdvanted = createAsyncThunk('home/fetchOrderAdvanted', async ({ statusId = null, ecomerceId = null, startDate = null, endDate = null, storeID = null }) => {
  var data = await fetchOrderApi({
    username: global.data.preferred_username,
    keyword: null,
    orderId: null,
    statusId: statusId,
    ecomerceId: ecomerceId,
    startDate: startDate,
    endDate: endDate,
    IdGianHang: storeID
  });
  return data;
});

export const changeStatusOrderAsync = createAsyncThunk(
  'status/changeStatus',
  async (id, status = true) => {
    var response = await changeStatusOrderApi(id, status);
    return response;
  },
);
export const fetchUserInfoAsync = createAsyncThunk(
  'fetch/userInfo',
  async username => {
    // console.log('loading again');
    var data = await getUserInfoApi(username);
    return data;
  },
);
const setDataBarRevenue = data => {
  data.map((e, index) => {
    return {
      value: e.DoanhThu / 1000000,
      label: e.TenSan,
      frontColor: MockColor[index],
    };
  });
};
const setDataBarSell = data => {
  var dataSend = [];
  data.forEach((e, index) => {
    var stores = e.ThongKe.forEach(item => {
      var item = {
        value: item.DoanhSo,
        label: item.TenGianHang,
        // frontColor: MockColor[index],
      };
      dataSend = [...dataSend, item];
    });
  });
  return dataSend;
};

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    changeStatusFilter: (state, action) => {
      state.filterStatus = action.payload;
    },
    changeTimeFilter: (state, action) => {
      console.log(action.payload);
      state.timerFilterForm = action.payload;
    },
    increment: state => {
      state.value += 1;
    },
    filter: (state, action) => {
      state.status = 'loading';
      state.selectedStatus = action.payload;
      if (action.payload !== 0) {
        state.dataFilter = state.data.filter((e, index) => {
          return e.IdTrangThai == action.payload;
        });
        // console.log(state.dataFilter);
      } else {
        state.dataFilter = state.data;
      }
      state.status = 'idle';
    },
    selectedOrderDetail: (state, action) => {
      //  / console.log(action.payload);
      state.status = 'loading';
      state.selectedDetailOrder = action.payload;
      state.status = 'idle';
    },
    selectedButtonTypeRevenue: (state, action) => {
      state.selectedTypeRevenue = action.payload;
      if (action.payload === 1) {
        state.dataStatisticalBar = state.dataStatistical.map((e, index) => {
          return {
            value:
              e.DoanhThu !== 0
                ? (e.DoanhThu / 1000000).toFixed(2).replace('.', ',')
                : 0,
            label: e.TenSan,
            frontColor: MockColor[index],
            avatar: e.Avt,
          };
        });
      } else {
        state.dataStatisticalBar = [];
        state.dataStatistical.forEach((e, index) => {
          // eslint-disable-next-line no-shadow
          var stores = e.ThongKe.forEach((item, index) => {
            var item = {
              value:
                item.DoanhThu !== 0
                  ? (item.DoanhThu / 1000000).toFixed(2).replace('.', ',')
                  : 0,
              label: item.TenGianHang,
              frontColor: MockColor[index],
              avatar: item.Avt,
            };
            state.dataStatisticalBar = [...state.dataStatisticalBar, item];
          });
        });
      }
    },
    selectedButtonTypeSale: (state, action) => {
      state.selectedTypeSale = action.payload;
      state.storeStatisticalBar = [];
      if (action.payload === 1) {
        state.storeStatisticalBar = state.dataStatistical.map((e, index) => {
          return {
            value: e.DoanhSo,
            label: e.TenSan,
            frontColor: MockColor[index],
            avatar: e.Avt,
          };
        });
        // console.log(state.storeStatisticalBar);
      } else {
        //  state.storeStatisticalBar = [];
        state.dataStatistical.forEach((e, index) => {
          var stores = e.ThongKe.forEach((item, index) => {
            var item = {
              value: item.DoanhSo,
              label: item.TenGianHang,
              frontColor: MockColor[index],
              avatar: item.Avt,
            };
            state.storeStatisticalBar = [...state.storeStatisticalBar, item];
          });
        });
      }
    },
    getDateByTime: (state, action) => {
      var data = [];
      var today = new Date();
      var sevenDaysAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

      switch (action.payload) {
        case 'all':
          var data = state.data.filter((e, index) => {
            var orderDate = new Date(e.NgayDatHang);
            return orderDate >= sevenDaysAgo && orderDate <= today;
          });
          break;

        default:
          break;
      }
    },
    selectedStoreByEcom: (state, action) => {
      state.selectedEcomId = action.payload;
      state.EcomSelected = state.EcomSelected.map((e, index) => {
        var status = action.payload == e.key;
        return {
          key: e.key,
          text: e.text,
          active: status,
        };
      });

      var data = [];
      if (action.payload == 0) {
        data = [{ "active": true, "key": 0, "TenGianHang": "Tất cả" }, ...state.userInfo.GianHang];
        console.log(data);
      } else {
        data = state.userInfo.GianHang.filter((e, index) => {
          return e.IdSanTMDT == action.payload;
        });
      }


      state.StoreSelected = data.map((e, index) => {
        var itemReturn = {
          key: e.ID,
          text: e.TenGianHang,
          active: e.key == 0,
        };
        return itemReturn;
      });

    },
    selectedEcomByStore: (state, action) => {
      state.selectedStoreId = action.payload;
      state.StoreSelected = state.StoreSelected.map((e, index) => {
        var status = action.payload === e.key;
        return {
          key: e.key,
          text: e.text,
          active: status,
        };
      });
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchOrderAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchUserInfoAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(statisticalFetch.pending, (state, action) => {
        // state.status = 'loading';
      })
      .addCase(fetchOrderAdvanted.fulfilled, (state, action) => {
        state.dataAdvantedFilter = action.payload;
        console.log('====================================');
        console.log(action.payload);
        console.log('====================================');
      })
      .addCase(statisticalFetch.fulfilled, (state, action) => {
        state.dataStatistical = action.payload;

        state.revenue = action.payload.reduce(
          (total, currentValue) => total + currentValue.DoanhThu,
          0,
        );
        state.sales = action.payload.reduce(
          (total, currentValue) => total + currentValue.DoanhSo,
          0,
        );
        if (state.selectedTypeRevenue == 1) {
          state.dataStatisticalBar = action.payload.map((e, index) => {
            return {
              value:
                e.DoanhThu != 0
                  ? (e.DoanhThu / 1000000).toFixed(2).replace('.', ',')
                  : 0,
              label: e.TenSan,
              frontColor: MockColor[index],
              avatar: e.Avt,
            };
          });
        } else {
          state.dataStatisticalBar = [];
          state.dataStatistical.forEach((e, index) => {
            // eslint-disable-next-line no-shadow
            var stores = e.ThongKe.forEach((item, index) => {
              var item = {
                value:
                  item.DoanhThu !== 0
                    ? (item.DoanhThu / 1000000).toFixed(2).replace('.', ',')
                    : 0,
                label: item.TenGianHang,
                frontColor: MockColor[index],
                avatar: item.Avt,
              };
              state.dataStatisticalBar = [...state.dataStatisticalBar, item];
            });
          });
        }
        state.storeStatisticalBar = [];
        if (state.selectedTypeSale === 1) {
          state.storeStatisticalBar = state.dataStatistical.map((e, index) => {
            return {
              value: e.DoanhSo,
              label: e.TenSan,
              frontColor: MockColor[index],
              avatar: e.Avt,
            };
          });
          // console.log(state.storeStatisticalBar);
        } else {
          //  state.storeStatisticalBar = [];
          state.dataStatistical.forEach((e, index) => {
            var stores = e.ThongKe.forEach((item, index) => {
              var item = {
                value: item.DoanhSo,
                label: item.TenGianHang,
                frontColor: MockColor[index],
                avatar: item.Avt,
              };
              state.storeStatisticalBar = [...state.storeStatisticalBar, item];
            });
          });
        }

        state.status = 'done';
        // console.log(state.storeStatisticalBar);
      })
      .addCase(fetchOrderAsync.fulfilled, (state, action) => {
        // state.status='ide'
        state.valueOrderType = {
          warting: 0,
          cancel: 0,
          delivering: 0,
          finished: 0,
        };

        state.status = 'idle';
        state.data = action.payload;
        state.dataFilter = action.payload;
        state.valueOrderType.total = action.payload.length;
        // state.selectedStatus = action.payload;

        if (state.selectedStatus != 0) {
          state.dataFilter = state.data.filter((e, index) => {
            return e.IdTrangThai == state.selectedStatus;
          });
          // console.log(state.dataFilter);
        } else {
          state.dataFilter = state.data;
        }
        //console.log(action.payload);
        state.data.forEach((e, index) => {
          switch (e.IdTrangThai) {
            case 1:
              state.valueOrderType.warting++;
              break;
            case 2:
              state.valueOrderType.cancel++;
              break;
            case 3:
              state.valueOrderType.delivering++;
              break;
            case 4:
              state.valueOrderType.finished++;
              break;
            default:
              break;
          }
        });
        state.status = 'done';
      })
      .addCase(fetchUserInfoAsync.fulfilled, (state, action) => {
        //https://png.pngtree.com/png-clipart/20220602/original/pngtree-administrator-account-avatar-boss-business-png-image_7856879.png
        var avatar =
          'https://png.pngtree.com/png-clipart/20220602/original/pngtree-administrator-account-avatar-boss-business-png-image_7856879.png';

        if (
          action.payload.GianHang != null &&
          action.payload.GianHang.length > 0
        ) {
          avatar = action.payload.GianHang[0].avatar;
        }
        state.userInfo = {
          TenDoanhNghiep: action.payload.TenDoanhNghiep,
          Avatar: BASEURL + avatar,
          GianHang: action.payload.GianHang,
        };
        state.StoreSelected = [
          {
            key: 0,
            text: 'Tất cả',
            active: true,
          },
        ];
        var itemMap = state.userInfo.GianHang.map((e, index) => {
          var dataReturn = {
            key: e.ID,
            text: e.TenGianHang,
            active: false,
          };
          state.StoreSelected.push(dataReturn);
          return dataReturn;
        });
      });
  },
});
export default homeSlice.reducer;
export const valueOrderType = state => state.home.valueOrderType;
export const dataOrder = state => state.home.data;
export const selectedCounter = state => state.home.value;
export const revenue = state => state.home.revenue;
export const sales = state => state.home.sales;
export const {
  increment,
  filter,
  selectedOrderDetail,
  selectedButtonTypeSale,
  selectedButtonTypeRevenue,
  selectedStoreByEcom,
  selectedEcomByStore,
  changeTimeFilter,
  changeStatusFilter
} = homeSlice.actions;
export const dataStatisticalBar = state => state.home.dataStatisticalBar;
export const storeStatisticalBar = state => state.home.storeStatisticalBar;
export const dataFilter = state => state.home.dataFilter;
export const selectedStatus = state => state.home.selectedStatus;
export const dataSelectedOrder = state => state.home.selectedDetailOrder;
export const userInfo = state => state.home.userInfo;
export const status = state => state.home.status;
export const selectedTypeRevenue = state => state.home.selectedTypeRevenue;
export const selectedTypeSale = state => state.home.selectedTypeSale;
export const StoreSelected = state => state.home.StoreSelected;
export const selectedEcomId = state => state.home.selectedEcomId;
export const selectedStoreId = state => state.home.selectedStoreId;
export const EcomSelected = state => state.home.EcomSelected;
export const dataAdvantedFilter = state => state.home.dataAdvantedFilter;
export const TimerFilterForm = state => state.home.timerFilterForm;
export const FilterStatus = state => state.home.filterStatus;