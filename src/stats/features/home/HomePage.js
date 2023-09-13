/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Button,
  ActivityIndicator,
  RefreshControl,
  Alert,
  Modal,
  Platform,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {
  FontSize,
  FontFamily,
  Color,
  Padding,
  Border,
} from '../../../GlobalStyles';
import {useSelector, useDispatch} from 'react-redux';
import {
  dataStatisticalBar,
  fetchOrderAsync,
  fetchUserInfoAsync,
  filter,
  increment,
  revenue,
  sales,
  selectedButtonTypeRevenue,
  selectedButtonTypeSale,
  selectedCounter,
  selectedTypeRevenue,
  selectedTypeSale,
  statisticalFetch,
  status,
  storeStatisticalBar,
  userInfo,
  valueOrderType,
} from './homeSlice';
import SelectDropdown from 'react-native-select-dropdown';
// import {BarChart, LineChart, PieChart} from 'react-native-gifted-charts';
import Icon from 'react-native-vector-icons/AntDesign';
import {useState} from 'react';
import {BASEURL} from '../../data/mock/mock';

const screenWidth = Dimensions.get('window').width;
Icon.loadFont();
const chartConfig = {
  backgroundGradientFrom: '#Ffffff',
  backgroundGradientTo: '#ffffff',
  barPercentage: 0.8,
  decimalPlaces: 0, // optional, defaults to 2dp
  color: (opacity = 1) => 'rgba(1, 122, 205, 1)',
  labelColor: (opacity = 1) => 'rgba(0, 0, 0, 1)',
  style: {
    borderRadius: 16,
  },
  propsForBackgroundLines: {
    strokeWidth: 1,
    stroke: '#efefef',
    strokeDasharray: '0',
  },
};
const countries = ['Egypt', 'Canada', 'Australia', 'Ireland'];

// eslint-disable-next-line no-undef
export default Homepage = () => {
  const navigation = useNavigation();
  const orderNumber = useSelector(valueOrderType);
  const numberOfSales = useSelector(sales);
  const numberOfRevenue = useSelector(revenue);
  const orderDataBar = useSelector(dataStatisticalBar);
  const storeOrderDataBar = useSelector(storeStatisticalBar);
  const user = useSelector(userInfo);
  const dispatch = useDispatch();
  const statusItem = useSelector(status);
  const selectedSale = useSelector(selectedTypeSale);
  const selectedRevenue = useSelector(selectedTypeRevenue);

  // const dataFilter  = useSelector();
  //block code for selectedbox
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('all');
  const [items, setItems] = React.useState([
    {label: 'Tất cả', value: 'all'},
    {label: '7 ngày', value: 'weed'},
    {label: '30 ngày', value: 'month'},
    {label: '3 tháng', value: '3month'},
    {label: '6 tháng', value: '6month'},
    {label: '1 năm', value: 'year'},
  ]);
  const dataSelected = items.map(e => e.label);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  // };
  React.useEffect(() => {
    dispatch(fetchUserInfoAsync(global.data.preferred_username));
    dispatch(statisticalFetch({UserName: global.data.preferred_username}));
    dispatch(
      fetchOrderAsync({
        statusId: null,
        ecomerceId: null,
        startDate: null,
        endDate: null,
        storeID: null,
      }),
    );
  }, [dispatch]);
  const handleTapStatus = id => {
    navigation.navigate('ProcessingOrder');
    dispatch(filter(id));
  };
  const [refreshing, setRefreshing] = React.useState(false);

  const [selectedValue, setSelectedValue] = React.useState('all');
  const pickerRef = React.useRef();
  // function open() {
  //   pickerRef.current.focus();
  // }
  const handleTimerFilter = value => {
    var today = new Date();
    var fromTime = null;

    switch (value) {
      case 'all':
        fromTime = null;

        break;
      case 'weed':
        fromTime = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        fromTime = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '3month':
        fromTime = new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      case '6month':
        fromTime = new Date(today.getTime() - 180 * 24 * 60 * 60 * 1000);
        break;
      case 'year':
        fromTime = new Date(today.getTime() - 365 * 24 * 60 * 60 * 1000);
        break;
      default:
        break;
    }

    if (fromTime !== null) {
      fromTime = fromTime.toISOString('yyyy-MM-dd');
    }
    dispatch(
      statisticalFetch({
        UserName: global.data.preferred_username,
        NgayBatDau: fromTime,
        NgayKetThuc: today,
      }),
    );
    // setSelectedValue(value);
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(fetchUserInfoAsync(global.data.preferred_username));
    dispatch(statisticalFetch({UserName: global.data.preferred_username}));
    dispatch(fetchOrderAsync());
    setRefreshing(false);
  }, [dispatch]);

  // function close() {
  //   pickerRef.current.blur();
  // }
  const BarChartData = {
    labels: [...orderDataBar.map((e, index) => e.label)],
    datasets: [
      {
        data: [...orderDataBar.map((e, index) => e.value)],
      },
    ],
  };
  const BarChartDataStore = {
    labels: [...storeOrderDataBar.map((e, index) => e.label)],
    datasets: [
      {
        data: [...storeOrderDataBar.map((e, index) => e.value)],
      },
    ],
  };
  var numberRevenue = numberOfRevenue.toLocaleString('it-IT', {
    style: 'currency',
    currency: 'VND',
  });

  numberRevenue = numberRevenue.replace('₫', '');
  numberRevenue = numberRevenue.replace('VND', '');

  return (
    <>
      {statusItem === 'loading' ? (
        <View
          style={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <ActivityIndicator />
        </View>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}>
          <View style={styles.homepage}>
            <LinearGradient
              style={[styles.header, styles.headerBg, {width: screenWidth}]}
              locations={[0, 1]}
              colors={['#003ecf', '#550cb1']}
              useAngle={true}
              angle={70.26}>
              <View
                style={[
                  styles.topAppBar,
                  {display: 'flex', justifyContent: 'space-between'},
                ]}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}>
                  <Image
                    style={[styles.notificationsIcon, styles.iconLayout]}
                    resizeMode="cover"
                    source={require('../../assets/backicon2.png')}
                  />
                </TouchableOpacity>

                <Text
                  style={[styles.logo, styles.logoPosition, styles.textTypo1]}>
                  HueEcom
                </Text>
                <View style={{width: 24}} />
              </View>
              <View style={[styles.header1, {marginTop: 4}]}>
                <View style={styles.acount}>
                  <View style={styles.acount1}>
                    <Image
                      style={styles.avatarIcon}
                      resizeMode="cover"
                      source={{
                        uri: data.avatar,
                      }}
                    />
                    <View
                      style={[
                        // styles.name,
                        // styles.ml8,
                        {justifyContent: 'center', alignSelf: 'center'},
                      ]}>
                      <Text style={styles.title}>{user.TenDoanhNghiep}</Text>
                      {/* <Text style={styles.subtitle}>Nhân viên bán hàng</Text> */}
                    </View>
                  </View>
                  {/* <TouchableOpacity
                    style={[styles.noticeIcon, styles.ml16]}
                    onPress={() => navigation.navigate('Notification')}>
                    <Image
                      style={[styles.notificationsIcon, styles.iconLayout]}
                      resizeMode="cover"
                      source={require('../../assets/notifications.png')}
                    />
                    <Image
                      style={[
                        styles.noticeIconChild,
                        // styles.ml4,
                        styles.bar11Position,
                      ]}
                      resizeMode="cover"
                      source={require('../../assets/ellipse-1.png')}
                    />
                  </TouchableOpacity> */}
                </View>
                <View style={[styles.overview, styles.mt16, {width: 400}]}>
                  <View style={styles.name}>
                    <Text style={styles.label}>Doanh thu</Text>
                    <View style={[styles.total, styles.mt4, {display: 'flex'}]}>
                      <Text style={[styles.text, styles.textTypo1]}>
                        {numberRevenue}
                      </Text>
                      <Text style={[styles.text1, {lineHeight: 12}]}>đ</Text>
                    </View>
                  </View>
                  <View style={[styles.overviewChild, styles.ml16]} />
                  <View style={[styles.name, styles.ml16]}>
                    <Text style={styles.label}>Doanh số</Text>
                    <View style={[styles.total, styles.mt4]}>
                      <Text style={[styles.text, styles.textTypo1]}>
                        {numberOfSales}
                      </Text>
                      <Text
                        style={[styles.text1, styles.ml4, {lineHeight: 12}]}>
                        sp
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <Image
                style={styles.scheduleIcon}
                resizeMode="cover"
                source={require('../../assets/schedule1.png')}
              />
              <Image
                style={styles.storefrontIcon}
                resizeMode="cover"
                source={require('../../assets/storefront1.png')}
              />
              <Image
                style={styles.localMallIcon}
                resizeMode="cover"
                source={require('../../assets/local-mall.png')}
              />
              <Image
                style={styles.monetizationOnIcon}
                resizeMode="cover"
                source={require('../../assets/monetization-on.png')}
              />
            </LinearGradient>

            <View style={[styles.body]}>
              <View style={styles.orderShadowBox}>
                <TouchableOpacity
                  style={[styles.header2, styles.header2FlexBox]}
                  onPress={() => handleTapStatus('0')}>
                  <View style={styles.title1}>
                    <Image
                      style={styles.orderIcon}
                      resizeMode="cover"
                      source={require('../../assets/ordericon1.png')}
                    />
                    <Text
                      style={[
                        styles.header3,
                        styles.ml4,
                        styles.hngTypo,
                        styles.header3Typo,
                      ]}>
                      Đơn hàng
                    </Text>
                  </View>
                  <Image
                    style={styles.iconLayout}
                    resizeMode="cover"
                    source={require('../../assets/moreicon.png')}
                  />
                </TouchableOpacity>
                <View style={[styles.content, styles.mt16]}>
                  <TouchableOpacity
                    style={styles.status}
                    onPress={() => {
                      handleTapStatus('1');
                    }}>
                    <Text
                      style={[styles.text3, styles.text3Clr, styles.textTypo1]}>
                      {orderNumber.warting}
                    </Text>
                    <Text style={[styles.angXL, styles.mt8]}>Đang xử lý</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.status}
                    onPress={() => {
                      handleTapStatus('3');
                    }}>
                    <View style={[styles.status, styles.ml16]}>
                      <Text
                        style={[
                          styles.text4,
                          styles.text4Clr,
                          styles.textTypo1,
                        ]}>
                        {orderNumber.delivering}
                      </Text>

                      <Text style={[styles.angXL, styles.mt8]}>
                        Đang vận chuyển
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.status}
                    onPress={() => {
                      handleTapStatus('4');
                    }}>
                    <View style={[styles.status, styles.ml16]}>
                      <Text style={[styles.text5, styles.textTypo1]}>
                        {orderNumber.finished}
                      </Text>
                      <Text style={[styles.angXL, styles.mt8]}>
                        Đã giao hàng
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.status}
                    onPress={() => {
                      handleTapStatus('2');
                    }}>
                    <View style={[styles.status, styles.ml16]}>
                      <Text style={[styles.text6, styles.textTypo1]}>
                        {orderNumber.cancel}
                      </Text>
                      <Text style={[styles.angXL, styles.mt8]}>Đã hủy</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={[
                  styles.orderShadowBox,
                  styles.mt16,
                  {
                    paddingTop: 16,
                    paddingLeft: 16,
                    paddingRight: 16,
                    paddingBottom: 8,
                  },
                ]}>
                <View
                  style={{
                    justifyContent: 'space-between',
                    display: 'flex',
                  }}>
                  <View
                    style={[
                      styles.title1,
                      {
                        justifyContent: 'space-between',
                        display: 'flex',
                      },
                    ]}>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <Image
                        style={styles.orderIcon}
                        resizeMode="cover"
                        source={require('../../assets/staticsticicon1.png')}
                      />
                      <Text
                        style={[
                          styles.header3,
                          styles.ml4,
                          styles.hngTypo,
                          styles.header3Typo,
                        ]}>
                        Doanh thu bán hàng
                      </Text>
                    </View>

                    <View
                      style={{
                        width: 150,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',

                        //borderRadius: 12,
                        // borderColor: 'gray',
                        // borderWidth: 1,
                      }}>
                      <SelectDropdown
                        data={dataSelected}
                        onSelect={(selectedItem, index) => {
                          var item = items.filter(
                            (e, index) => e.label === selectedItem,
                          )[0];
                          // setSelectedValue(item.value);
                          handleTimerFilter(item.value);
                        }}
                        onChangeSearchInputText={value => {
                          console.log(value);
                        }}
                        buttonStyle={{
                          width: 80,
                          height: 30,
                          borderRadius: 8,
                          padding: 0,
                          backgroundColor: '#F3F7FF',
                        }}
                        buttonTextStyle={{
                          fontSize: 12,
                          color: '#003ECF',
                          fontWeight: '500',
                        }}
                        dropdownStyle={{
                          borderRadius: 8,
                          padding: 0,
                          margin: 0,
                        }}
                        rowTextStyle={{
                          fontSize: 12,
                          lineHeight: 14,
                          padding: 0,
                          margin: 0,
                        }}
                        dropdownIconPosition="right"
                        rowStyle={{
                          backgroundColor: 'white',
                          borderBottomColor: 'white',
                          padding: 0,
                          margin: 0,
                          height: 36,
                          // borderRadius: 8,
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                          // text represented after item is selected
                          // if data array is an array of objects then return selectedItem.property to render after item is selected
                          return selectedItem;
                        }}
                        rowTextForSelection={(item, index) => {
                          // text represented for each item in dropdown
                          // if data array is an array of objects then return item.property to represent item in dropdown
                          return item;
                        }}
                        defaultButtonText={'Tất cả'}
                      />
                    </View>
                  </View>
                </View>
                <View style={[styles.content1]}>
                  <View style={styles.filter}>
                    {selectedRevenue === 1 ? (
                      <TouchableOpacity
                        onPress={() => {
                          dispatch(selectedButtonTypeRevenue(1));
                        }}
                        style={[
                          styles.item,
                          styles.itemFlexBox,
                          styles.itemLayout,
                          {
                            margin: 4,
                          },
                        ]}>
                        <Text
                          style={[
                            styles.snTmt1,
                            styles.snTmt1Clr,
                            styles.hngTypo,
                          ]}>
                          Sàn TMĐT
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => {
                          dispatch(selectedButtonTypeRevenue(1));
                        }}
                        style={[
                          styles.item1,
                          // styles.ml8,
                          styles.itemFlexBox,
                          styles.itemLayout,
                          {
                            margin: 4,
                          },
                        ]}>
                        <Text style={[styles.gianHng, styles.hngTypo]}>
                          Sàn TMĐT
                        </Text>
                      </TouchableOpacity>
                    )}
                    {selectedRevenue === 2 ? (
                      <TouchableOpacity
                        onPress={() => {
                          dispatch(selectedButtonTypeRevenue(2));
                        }}
                        style={[
                          styles.item,
                          styles.itemFlexBox,
                          styles.itemLayout,
                          {
                            margin: 4,
                          },
                        ]}>
                        <Text
                          style={[
                            styles.snTmt1,
                            styles.snTmt1Clr,
                            //  styles.ml8,
                            styles.hngTypo,
                          ]}>
                          Gian hàng
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => {
                          dispatch(selectedButtonTypeRevenue(2));
                        }}
                        style={[
                          styles.item1,
                          //  styles.ml8,
                          styles.itemFlexBox,
                          styles.itemLayout,
                          {
                            margin: 4,
                          },
                        ]}>
                        <Text style={[styles.gianHng, styles.hngTypo]}>
                          Gian hàng
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                  <View style={[]}>
                    <View
                      style={{
                        paddingTop: 4,
                        // paddingBottom: 16,

                        //backgroundColor: "red",
                      }}>
                      <View>
                        {orderDataBar.map((e, index) => {
                          return (
                            <View
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                                paddingTop: 8,
                                paddingBottom: 8,
                              }}>
                              <View
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}>
                                <Image
                                  style={styles.orderIconAvatar}
                                  resizeMode="cover"
                                  source={{
                                    uri: BASEURL + e.avatar,
                                  }}
                                />
                                <Text
                                  style={{
                                    marginRight: 8,
                                    color: '#00123D',
                                    fontSize: 14,
                                    fontWeight: '500',
                                    marginLeft: 8,
                                  }}>
                                  {e.label}
                                </Text>
                              </View>

                              <View
                                style={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    marginRight: 4,
                                    color: '#00123D',
                                    fontSize: 16,
                                    fontWeight: '700',
                                  }}>
                                  {e.value}
                                </Text>
                                <Text
                                  style={{
                                    fontSize: 10,
                                    fontWeight: '400',
                                    color: 'rgba(0, 18, 61, 0.7)',
                                    lineHeight: 20,
                                  }}>
                                  triệu đồng
                                </Text>
                              </View>
                            </View>
                          );
                        })}
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={[
                  styles.orderShadowBox,
                  styles.mt16,
                  {
                    paddingTop: 16,
                    paddingLeft: 16,
                    paddingRight: 16,
                    paddingBottom: 8,
                  },
                ]}>
                <View style={styles.acount}>
                  <View style={styles.title1}>
                    <Image
                      style={styles.orderIcon}
                      resizeMode="cover"
                      source={require('../../assets/staticsticicon1.png')}
                    />
                    <Text
                      style={[
                        styles.header3,
                        styles.ml4,
                        styles.hngTypo,
                        styles.header3Typo,
                      ]}>
                      Doanh số bán hàng
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.dropdown,
                      styles.ml12,
                      styles.dropdownBorder,
                    ]}>
                    <Text style={styles.snTmt}>Tất cả</Text>
                    <Image
                      style={[styles.orderIcon, styles.ml4]}
                      resizeMode="cover"
                      source={require('../../assets/expandmoreicon1.png')}
                    />
                  </View>
                </View>

                <View style={[styles.content1, styles.mt16]}>
                  <View style={styles.filter}>
                    {selectedSale === 1 ? (
                      <TouchableOpacity
                        onPress={() => {
                          dispatch(selectedButtonTypeSale(1));
                        }}
                        style={[
                          styles.item,
                          styles.itemFlexBox,
                          styles.itemLayout,
                          {
                            margin: 4,
                          },
                        ]}>
                        <Text
                          style={[
                            styles.snTmt1,
                            styles.snTmt1Clr,
                            styles.hngTypo,
                          ]}>
                          Sàn TMĐT
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => {
                          dispatch(selectedButtonTypeSale(1));
                        }}
                        style={[
                          styles.item1,
                          //  styles.ml8,
                          styles.itemFlexBox,
                          styles.itemLayout,
                          {
                            margin: 4,
                          },
                        ]}>
                        <Text style={[styles.gianHng, styles.hngTypo]}>
                          Sàn TMĐT
                        </Text>
                      </TouchableOpacity>
                    )}
                    {selectedSale === 2 ? (
                      <TouchableOpacity
                        onPress={() => {
                          dispatch(selectedButtonTypeSale(2));
                        }}
                        style={[
                          styles.item,
                          styles.itemFlexBox,
                          styles.itemLayout,
                          {
                            margin: 4,
                          },
                        ]}>
                        <Text
                          style={[
                            styles.snTmt1,
                            styles.snTmt1Clr,
                            styles.hngTypo,
                          ]}>
                          Gian hàng
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => {
                          dispatch(selectedButtonTypeSale(2));
                        }}
                        style={[
                          styles.item1,
                          //  styles.ml8,
                          styles.itemFlexBox,
                          styles.itemLayout,
                          {
                            margin: 4,
                          },
                        ]}>
                        <Text style={[styles.gianHng, styles.hngTypo]}>
                          Gian hàng
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>

                  <View style={[]}>
                    <View
                      style={{
                        paddingTop: 4,
                        // paddingBottom: 20,
                      }}>
                      <View>
                        {storeOrderDataBar.map((e, index) => {
                          return (
                            <View
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                                paddingTop: 8,

                                paddingBottom: 8,
                              }}>
                              <View
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}>
                                <Image
                                  style={styles.orderIconAvatar}
                                  resizeMode="cover"
                                  source={{
                                    uri: BASEURL + e.avatar,
                                  }}
                                />
                                <Text
                                  style={{
                                    marginRight: 8,
                                    color: '#00123D',
                                    fontSize: 14,
                                    fontWeight: '500',
                                    marginLeft: 8,
                                    // lineHeight: 12,
                                  }}>
                                  {e.label}
                                </Text>
                              </View>

                              <View
                                style={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    marginRight: 4,
                                    color: '#00123D',
                                    fontSize: 16,
                                    fontWeight: '700',
                                  }}>
                                  {e.value}
                                </Text>
                                <Text
                                  style={{
                                    fontSize: 10,
                                    fontWeight: '400',
                                    color: 'rgba(0, 18, 61, 0.7)',
                                    lineHeight: 20,
                                  }}>
                                  sản phẩm
                                </Text>
                              </View>
                            </View>
                          );
                        })}
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={[styles.orderList, styles.mt16, styles.orderShadowBox]}>
                <TouchableOpacity
                  style={[styles.header2, styles.header2FlexBox]}
                  onPress={() => handleTapStatus('0')}>
                  <View style={styles.title1}>
                    <Image
                      style={styles.orderIcon}
                      resizeMode="cover"
                      source={require('../../assets/listicon.png')}
                    />
                    <Text
                      style={[
                        styles.header3,
                        styles.ml4,
                        styles.hngTypo,
                        styles.header3Typo,
                      ]}>
                      Đơn hàng mới nhất
                    </Text>
                  </View>
                  <Image
                    style={styles.iconLayout}
                    resizeMode="cover"
                    source={require('../../assets/moreicon.png')}
                  />
                </TouchableOpacity>
                <View style={styles.mt16}>
                  <View style={styles.oderItemBorder}>
                    <View style={[styles.header2, styles.header2FlexBox]}>
                      <View style={styles.title1}>
                        <Image
                          style={styles.orderIcon}
                          resizeMode="cover"
                          source={require('../../assets/personicon.png')}
                        />
                        <Text style={[styles.minhTrn, styles.ml4]}>
                          Minh Trần
                        </Text>
                      </View>
                      <Text style={[styles.status4, styles.text3Clr]}>
                        Đang xử lý
                      </Text>
                    </View>
                    <View style={[styles.content, styles.mt8]}>
                      <Image
                        style={styles.productChild}
                        resizeMode="cover"
                        source={require('../../assets/rectangle-23.png')}
                      />
                      <View style={[styles.content4, styles.ml16]}>
                        <Text
                          style={[
                            styles.bnhInNg,
                            styles.hngTypo,
                            styles.header3Typo,
                          ]}>
                          Bánh in ngũ sắc đặc sản tiến Vua
                        </Text>
                        <Text style={[styles.mSnPhm, styles.mt4]}>
                          Mã sản phẩm: 1746603586-164627...
                        </Text>
                        <View style={[styles.acount, styles.mt4]}>
                          <Text style={styles.text29}>
                            <Text style={[styles.textLayout, styles.hngTypo]}>
                              {'115.000 '}
                            </Text>
                            <Text style={styles.text31}>đ</Text>
                          </Text>
                          <Text style={[styles.x3, styles.ml12]}>x3</Text>
                        </View>
                      </View>
                    </View>
                    <View
                      style={[styles.price, styles.mt8, styles.buttonFlexBox]}>
                      <Text style={styles.x3}>Tổng đơn hàng:</Text>
                      <Text
                        style={[styles.text32, styles.ml8, styles.snTmt1Clr]}>
                        <Text style={styles.textLayout}>{'467.800 '}</Text>
                        <Text style={styles.text34}>đ</Text>
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.filter2,
                        styles.mt8,
                        styles.buttonFlexBox,
                      ]}>
                      <View style={[styles.button, styles.itemFlexBox]}>
                        <Text style={[styles.hyNHng, styles.textLayout]}>
                          Hủy đơn hàng
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.button1,
                          styles.ml8,
                          styles.itemFlexBox,
                        ]}>
                        <Text
                          style={[
                            styles.xcNhnN,
                            styles.textLayout,
                            styles.snTmt1Clr,
                          ]}>
                          Xác nhận đơn
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={[styles.oderItemBorder, styles.mt12]}>
                    <View style={[styles.orderId1, styles.header2FlexBox]}>
                      <View style={styles.title1}>
                        <Image
                          style={styles.orderIcon}
                          resizeMode="cover"
                          source={require('../../assets/personicon.png')}
                        />
                        <Text style={[styles.minhTrn, styles.ml4]}>
                          Trâm Trâm
                        </Text>
                      </View>
                      <Text style={[styles.status4, styles.text3Clr]}>
                        Đang xử lý
                      </Text>
                    </View>
                    <View style={[styles.productList, styles.mt8]}>
                      <LinearGradient
                        style={[styles.group2, styles.headerBg]}
                        locations={[0, 1]}
                        colors={['rgba(255, 255, 255, 0)', '#fff']}
                        useAngle={true}
                        angle={180}>
                        <View style={styles.content}>
                          <Image
                            style={styles.productChild}
                            resizeMode="cover"
                            source={require('../../assets/rectangle-2.png')}
                          />
                          <View style={[styles.name, styles.ml16]}>
                            <Text
                              style={[
                                styles.bnhInNg,
                                styles.hngTypo,
                                styles.header3Typo,
                              ]}>
                              Hạt sen Huế sấy ăn liền
                            </Text>
                            <Text style={[styles.mSnPhm, styles.mt4]}>
                              Mã sản phẩm: 1746603586-164627...
                            </Text>
                            <View style={[styles.acount, styles.mt4]}>
                              <Text style={styles.text29}>
                                <Text style={styles.hngTypo}>{'70.000 '}</Text>
                                <Text style={styles.text31}>đ</Text>
                              </Text>
                              <Text style={[styles.x3, styles.ml12]}>x1</Text>
                            </View>
                          </View>
                        </View>
                        <View style={[styles.content, styles.mt8]}>
                          <Image
                            style={styles.productChild}
                            resizeMode="cover"
                            source={require('../../assets/rectangle-21.png')}
                          />
                          <View style={[styles.name, styles.ml16]}>
                            <Text
                              style={[
                                styles.bnhInNg,
                                styles.hngTypo,
                                styles.header3Typo,
                              ]}>
                              Bánh sen chấy cuộn lò than hoa
                            </Text>
                            <Text style={[styles.mSnPhm, styles.mt4]}>
                              Mã sản phẩm: 8936193480157
                            </Text>
                            <View style={[styles.acount, styles.mt4]}>
                              <Text style={styles.text29}>
                                <Text style={styles.hngTypo}>{'54.000 '}</Text>
                                <Text style={styles.text31}>đ</Text>
                              </Text>
                              <Text style={[styles.x3, styles.ml12]}>x1</Text>
                            </View>
                          </View>
                        </View>
                        <View style={[styles.content, styles.mt8]}>
                          <Image
                            style={styles.productChild}
                            resizeMode="cover"
                            source={require('../../assets/rectangle-24.png')}
                          />
                          <View style={[styles.name, styles.ml16]}>
                            <Text
                              style={[
                                styles.bnhInNg,
                                styles.hngTypo,
                                styles.header3Typo,
                              ]}>
                              Bánh ép Huế tôm rào giòn rụm, đậm vị 5 bánh
                            </Text>
                            <Text style={[styles.mSnPhm, styles.mt4]}>
                              Mã sản phẩm: 8936193480157
                            </Text>
                            <View style={[styles.acount, styles.mt4]}>
                              <Text style={styles.text29}>
                                <Text style={styles.hngTypo}>{'62.000 '}</Text>
                                <Text style={styles.text31}>đ</Text>
                              </Text>
                              <Text style={[styles.x3, styles.ml12]}>x1</Text>
                            </View>
                          </View>
                        </View>
                      </LinearGradient>
                      <View style={styles.moreButton}>
                        <Text
                          style={[
                            styles.xcNhnN,
                            styles.textLayout,
                            styles.snTmt1Clr,
                          ]}>
                          Xem thêm
                        </Text>
                        <Image
                          style={[styles.orderIcon, styles.ml4]}
                          resizeMode="cover"
                          source={require('../../assets/expandmoreicon.png')}
                        />
                      </View>
                    </View>
                    <View
                      style={[styles.price, styles.mt8, styles.buttonFlexBox]}>
                      <Text style={styles.x3}>Tổng đơn hàng:</Text>
                      <Text
                        style={[styles.text32, styles.ml8, styles.snTmt1Clr]}>
                        <Text style={styles.textLayout}>{'215.500 '}</Text>
                        <Text style={styles.text34}>đ</Text>
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.filter2,
                        styles.mt8,
                        styles.buttonFlexBox,
                      ]}>
                      <View style={[styles.button, styles.itemFlexBox]}>
                        <Text style={[styles.hyNHng, styles.textLayout]}>
                          Hủy đơn hàng
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.button1,
                          styles.ml8,
                          styles.itemFlexBox,
                        ]}>
                        <Text
                          style={[
                            styles.xcNhnN,
                            styles.textLayout,
                            styles.snTmt1Clr,
                          ]}>
                          Xác nhận đơn
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={[styles.oderItemBorder, styles.mt12]}>
                    <View style={[styles.orderId1, styles.header2FlexBox]}>
                      <View style={styles.title1}>
                        <Image
                          style={styles.orderIcon}
                          resizeMode="cover"
                          source={require('../../assets/personicon.png')}
                        />
                        <Text style={[styles.minhTrn, styles.ml4]}>
                          Trần Thị Mỹ Bình
                        </Text>
                      </View>
                      <Text style={[styles.status4, styles.text3Clr]}>
                        Đang xử lý
                      </Text>
                    </View>
                    <View style={[styles.product1, styles.mt8]}>
                      <Image
                        style={styles.productChild}
                        resizeMode="cover"
                        source={require('../../assets/rectangle-25.png')}
                      />
                      <View style={[styles.content4, styles.ml16]}>
                        <Text
                          style={[
                            styles.bnhInNg,
                            styles.hngTypo,
                            styles.header3Typo,
                          ]}>
                          Tinh dầu Quế 10ml
                        </Text>
                        <Text style={[styles.mSnPhm, styles.mt4]}>
                          Mã sản phẩm: BDH119149
                        </Text>
                        <View style={[styles.acount, styles.mt4]}>
                          <Text style={styles.text29}>
                            <Text style={styles.hngTypo}>{'80.000 '}</Text>
                            <Text style={styles.text31}>đ</Text>
                          </Text>
                          <Text style={[styles.x3, styles.ml12]}>x1</Text>
                        </View>
                      </View>
                    </View>
                    <View
                      style={[styles.total3, styles.mt8, styles.buttonFlexBox]}>
                      <Text style={styles.x3}>Tổng đơn hàng:</Text>
                      <Text
                        style={[styles.text32, styles.ml8, styles.snTmt1Clr]}>
                        <Text style={styles.textLayout}>{'99.300 '}</Text>
                        <Text style={styles.text34}>đ</Text>
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.buttonAction2,
                        styles.mt8,
                        styles.buttonFlexBox,
                      ]}>
                      <View style={[styles.button, styles.itemFlexBox]}>
                        <Text style={[styles.hyNHng, styles.textLayout]}>
                          Hủy đơn hàng
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.button1,
                          styles.ml8,
                          styles.itemFlexBox,
                        ]}>
                        <Text
                          style={[
                            styles.xcNhnN,
                            styles.textLayout,
                            styles.snTmt1Clr,
                          ]}>
                          Xác nhận đơn
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={[styles.oderItemBorder, styles.mt12]}>
                    <View style={[styles.orderId1, styles.header2FlexBox]}>
                      <View style={styles.title1}>
                        <Image
                          style={styles.orderIcon}
                          resizeMode="cover"
                          source={require('../../assets/personicon.png')}
                        />
                        <Text style={[styles.minhTrn, styles.ml4]}>
                          Trần Thị Mỹ Bình
                        </Text>
                      </View>
                      <Text style={[styles.status4, styles.text3Clr]}>
                        Đang xử lý
                      </Text>
                    </View>
                    <View style={[styles.product1, styles.mt8]}>
                      <Image
                        style={styles.productChild}
                        resizeMode="cover"
                        source={require('../../assets/rectangle-25.png')}
                      />
                      <View style={[styles.content4, styles.ml16]}>
                        <Text
                          style={[
                            styles.bnhInNg,
                            styles.hngTypo,
                            styles.header3Typo,
                          ]}>
                          Tinh dầu Quế 10ml
                        </Text>
                        <Text style={[styles.mSnPhm, styles.mt4]}>
                          Mã sản phẩm: BDH119149
                        </Text>
                        <View style={[styles.acount, styles.mt4]}>
                          <Text style={styles.text29}>
                            <Text style={styles.hngTypo}>{'80.000 '}</Text>
                            <Text style={styles.text31}>đ</Text>
                          </Text>
                          <Text style={[styles.x3, styles.ml12]}>x1</Text>
                        </View>
                      </View>
                    </View>
                    <View
                      style={[styles.total3, styles.mt8, styles.buttonFlexBox]}>
                      <Text style={styles.x3}>Tổng đơn hàng:</Text>
                      <Text
                        style={[styles.text32, styles.ml8, styles.snTmt1Clr]}>
                        <Text style={styles.textLayout}>{'99.300 '}</Text>
                        <Text style={styles.text34}>đ</Text>
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.buttonAction2,
                        styles.mt8,
                        styles.buttonFlexBox,
                      ]}>
                      <View style={[styles.button, styles.itemFlexBox]}>
                        <Text style={[styles.hyNHng, styles.textLayout]}>
                          Hủy đơn hàng
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.button1,
                          styles.ml8,
                          styles.itemFlexBox,
                        ]}>
                        <Text
                          style={[
                            styles.xcNhnN,
                            styles.textLayout,
                            styles.snTmt1Clr,
                          ]}>
                          Xác nhận đơn
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={[styles.oderItemBorder, styles.mt12]}>
                    <View style={[styles.orderId1, styles.header2FlexBox]}>
                      <View style={styles.title1}>
                        <Image
                          style={styles.orderIcon}
                          resizeMode="cover"
                          source={require('../../assets/personicon.png')}
                        />
                        <Text style={[styles.minhTrn, styles.ml4]}>
                          Trần Thị Mỹ Bình
                        </Text>
                      </View>
                      <Text style={[styles.status4, styles.text3Clr]}>
                        Đang xử lý
                      </Text>
                    </View>
                    <View style={[styles.product1, styles.mt8]}>
                      <Image
                        style={styles.productChild}
                        resizeMode="cover"
                        source={require('../../assets/rectangle-25.png')}
                      />
                      <View style={[styles.content4, styles.ml16]}>
                        <Text
                          style={[
                            styles.bnhInNg,
                            styles.hngTypo,
                            styles.header3Typo,
                          ]}>
                          Tinh dầu Quế 10ml
                        </Text>
                        <Text style={[styles.mSnPhm, styles.mt4]}>
                          Mã sản phẩm: BDH119149
                        </Text>
                        <View style={[styles.acount, styles.mt4]}>
                          <Text style={styles.text29}>
                            <Text style={styles.hngTypo}>{'80.000 '}</Text>
                            <Text style={styles.text31}>đ</Text>
                          </Text>
                          <Text style={[styles.x3, styles.ml12]}>x1</Text>
                        </View>
                      </View>
                    </View>
                    <View
                      style={[styles.total3, styles.mt8, styles.buttonFlexBox]}>
                      <Text style={styles.x3}>Tổng đơn hàng:</Text>
                      <Text
                        style={[styles.text32, styles.ml8, styles.snTmt1Clr]}>
                        <Text style={styles.textLayout}>{'99.300 '}</Text>
                        <Text style={styles.text34}>đ</Text>
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.buttonAction2,
                        styles.mt8,
                        styles.buttonFlexBox,
                      ]}>
                      <View style={[styles.button, styles.itemFlexBox]}>
                        <Text style={[styles.hyNHng, styles.textLayout]}>
                          Hủy đơn hàng
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.button1,
                          styles.ml8,
                          styles.itemFlexBox,
                        ]}>
                        <Text
                          style={[
                            styles.xcNhnN,
                            styles.textLayout,
                            styles.snTmt1Clr,
                          ]}>
                          Xác nhận đơn
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={[
                      styles.oderItem5,
                      styles.mt12,
                      styles.oderItemBorder,
                    ]}>
                    <View style={[styles.orderId1, styles.header2FlexBox]}>
                      <View style={styles.title1}>
                        <Image
                          style={styles.orderIcon}
                          resizeMode="cover"
                          source={require('../../assets/personicon.png')}
                        />
                        <Text style={[styles.minhTrn, styles.ml4]}>
                          Ngô Hồng Phương Linh
                        </Text>
                      </View>
                      <Text style={[styles.status9, styles.text4Clr]}>
                        Đang vận chuyển
                      </Text>
                    </View>
                    <View style={[styles.content1, styles.mt8]}>
                      <View style={styles.content}>
                        <Image
                          style={styles.productChild}
                          resizeMode="cover"
                          source={require('../../assets/rectangle-2.png')}
                        />
                        <View style={[styles.name, styles.ml16]}>
                          <Text
                            style={[
                              styles.bnhInNg,
                              styles.hngTypo,
                              styles.header3Typo,
                            ]}>
                            Hạt sen Huế sấy ăn liền
                          </Text>
                          <Text style={[styles.mSnPhm, styles.mt4]}>
                            Mã sản phẩm: 1746603586-164627...
                          </Text>
                          <View
                            style={[
                              styles.header2,
                              styles.mt4,
                              styles.header2FlexBox,
                            ]}>
                            <Text style={styles.text29}>
                              <Text style={styles.hngTypo}>{'70.000 '}</Text>
                              <Text style={styles.text31}>đ</Text>
                            </Text>
                            <Text style={styles.x3}>x1</Text>
                          </View>
                        </View>
                      </View>
                      <View style={[styles.content, styles.mt8]}>
                        <Image
                          style={styles.productChild}
                          resizeMode="cover"
                          source={require('../../assets/rectangle-21.png')}
                        />
                        <View style={[styles.name, styles.ml16]}>
                          <Text
                            style={[
                              styles.bnhInNg,
                              styles.hngTypo,
                              styles.header3Typo,
                            ]}>
                            Bánh sen chấy cuộn lò than hoa
                          </Text>
                          <Text style={[styles.mSnPhm, styles.mt4]}>
                            Mã sản phẩm: 8936193480157
                          </Text>
                          <View
                            style={[
                              styles.header2,
                              styles.mt4,
                              styles.header2FlexBox,
                            ]}>
                            <Text style={styles.text29}>
                              <Text style={styles.hngTypo}>{'54.000 '}</Text>
                              <Text style={styles.text31}>đ</Text>
                            </Text>
                            <Text style={styles.x3}>x1</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                    <View
                      style={[styles.total3, styles.mt8, styles.buttonFlexBox]}>
                      <Text style={styles.x3}>Tổng đơn hàng:</Text>
                      <Text
                        style={[styles.text32, styles.ml8, styles.snTmt1Clr]}>
                        <Text style={styles.textLayout}>{'215.500 '}</Text>
                        <Text style={styles.text34}>đ</Text>
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.buttonAction5,
                        styles.mt8,
                        styles.buttonFlexBox,
                      ]}>
                      <View style={[styles.button, styles.itemFlexBox]}>
                        <Text style={[styles.hyNHng, styles.textLayout]}>
                          Hủy đơn hàng
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.button1,
                          styles.ml8,
                          styles.itemFlexBox,
                        ]}>
                        <Text
                          style={[
                            styles.xcNhnN,
                            styles.textLayout,
                            styles.snTmt1Clr,
                          ]}>
                          Xác nhận đơn
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={[styles.oderItem6, styles.mt12]}>
                    <View style={[styles.orderId1, styles.header2FlexBox]}>
                      <View style={styles.title1}>
                        <Image
                          style={styles.orderIcon}
                          resizeMode="cover"
                          source={require('../../assets/personicon.png')}
                        />
                        <Text style={[styles.minhTrn, styles.ml4]}>
                          Thanh Trúc
                        </Text>
                      </View>
                      <Text style={[styles.status9, styles.text4Clr]}>
                        Đang vận chuyển
                      </Text>
                    </View>
                    <View style={[styles.product1, styles.mt8]}>
                      <Image
                        style={styles.productChild}
                        resizeMode="cover"
                        source={require('../../assets/rectangle-22.png')}
                      />
                      <View style={[styles.content4, styles.ml16]}>
                        <Text
                          style={[
                            styles.bnhInNg,
                            styles.hngTypo,
                            styles.header3Typo,
                          ]}>
                          Trà vả gừng – Hộp 40g - 35 hộp/ thùng
                        </Text>
                        <Text style={[styles.mSnPhm, styles.mt4]}>
                          Mã sản phẩm: BDH65742
                        </Text>
                        <View
                          style={[
                            styles.header2,
                            styles.mt4,
                            styles.header2FlexBox,
                          ]}>
                          <Text style={styles.text29}>
                            <Text style={styles.hngTypo}>{'25.000 '}</Text>
                            <Text style={styles.text31}>đ</Text>
                          </Text>
                          <Text style={styles.x3}>x2</Text>
                        </View>
                      </View>
                    </View>
                    <View
                      style={[styles.total3, styles.mt8, styles.buttonFlexBox]}>
                      <Text style={styles.x3}>Tổng đơn hàng:</Text>
                      <Text
                        style={[styles.text32, styles.ml8, styles.snTmt1Clr]}>
                        <Text style={styles.textLayout}>{'69.300 '}</Text>
                        <Text style={styles.text34}>đ</Text>
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.buttonAction5,
                        styles.mt8,
                        styles.buttonFlexBox,
                      ]}>
                      <View style={[styles.button, styles.itemFlexBox]}>
                        <Text style={[styles.hyNHng, styles.textLayout]}>
                          Hủy đơn hàng
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.button1,
                          styles.ml8,
                          styles.itemFlexBox,
                        ]}>
                        <Text
                          style={[
                            styles.xcNhnN,
                            styles.textLayout,
                            styles.snTmt1Clr,
                          ]}>
                          Xác nhận đơn
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={[
                styles.navigationBar,
                styles.mt184,
                styles.dropdownBorder,
              ]}>
              <View style={styles.menuItem}>
                <Image
                  style={[styles.homeIcon, styles.iconLayout]}
                  resizeMode="cover"
                  source={require('../../assets/homeicon.png')}
                />
                <Image
                  style={[styles.iconLayout, styles.mt4]}
                  resizeMode="cover"
                  source={require('../../assets/homeiconactive.png')}
                />
                <Text
                  style={[
                    styles.snTmt1,
                    styles.mt4,
                    styles.snTmt1Clr,
                    styles.hngTypo,
                  ]}>
                  Trang chủ
                </Text>
              </View>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate('ProccessingOrder')}>
                <Image
                  style={styles.iconLayout}
                  resizeMode="cover"
                  source={require('../../assets/ordericon.png')}
                />
                <Image
                  style={[styles.homeIcon, styles.mt4, styles.iconLayout]}
                  resizeMode="cover"
                  source={require('../../assets/ordericonactive.png')}
                />
                <Text style={[styles.nHng, styles.mt4, styles.hngTypo]}>
                  Đơn hàng
                </Text>
              </TouchableOpacity>
              <View style={styles.menuItem}>
                <Image
                  style={styles.iconLayout}
                  resizeMode="cover"
                  source={require('../../assets/staticsticicon.png')}
                />
                <Image
                  style={[styles.homeIcon, styles.mt4, styles.iconLayout]}
                  resizeMode="cover"
                  source={require('../../assets/staticsticiconactive.png')}
                />
                <Text style={[styles.nHng, styles.mt4, styles.hngTypo]}>
                  Thống kê
                </Text>
              </View>
            </View>
          </View>
          <View>
            {/* <Modal visible={isModalVisible} animationType="fade">
              <View style={styles.container}>
                <DropDownPicker
                  style={{borderColor: 'gray'}}
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                />
                <View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      marginTop: 34,
                      width: screenWidth,
                    }}>
                    <TouchableOpacity
                      style={[styles.closeButton]}
                      onPress={toggleModal}
                      underlayColor="#fff">
                      <Text style={styles.closeText}>Đóng</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.loginScreenButton}
                      onPress={() => {
                        handleTimerFilter();
                        toggleModal();
                      }}
                      underlayColor="#fff">
                      <Text style={styles.loginText}>Xác nhận</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal> */}
          </View>
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  ml8: {
    marginLeft: 8,
  },
  ml4: {
    marginLeft: 4,
  },
  ml16: {
    marginLeft: 16,
  },
  mt4: {
    marginTop: 4,
  },
  mt16: {
    marginTop: 16,
  },
  mt8: {
    marginTop: 8,
  },
  ml12: {
    marginLeft: 12,
  },
  mt20: {
    marginTop: 20,
  },
  mt12: {
    marginTop: 12,
  },
  mt23: {
    marginTop: 23,
  },
  mt25: {
    marginTop: 25,
  },
  ml25: {
    marginLeft: 25,
  },
  ml70: {
    marginLeft: 70,
  },
  mt184: {
    marginTop: 184,
  },
  loginScreenButton: {
    // marginRight:40,
    marginLeft: 16,
    minWidth: 80,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#0263FF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  closeButton: {
    // marginRight:40,
    marginLeft: 16,
    minWidth: 80,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,

    borderRadius: 10,
    borderWidth: 1,

    backgroundColor: 'white',
    borderColor: '#0263FF',
  },
  closeText: {
    color: '#0263FF',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  loginText: {
    color: '#fff',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  container: {
    padding: 16,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerBg: {
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  iconLayout: {
    height: 24,
    width: 24,
  },
  bar11Position: {
    top: 12,
    position: 'absolute',
  },
  graphStyle: {
    flex: 1,
    paddingRight: 40,
    // marginLeft:
  },
  chartTitle: {
    paddingLeft: 20,
    paddingBottom: 20,
    paddingTop: 10,
    // fontFamily: 'Bogle-Regular',
    fontSize: 12,
  },
  textTypo1: {
    fontSize: FontSize.size_xl,
    fontWeight: '700',
  },
  logoPosition: {
    // left: screenWidth / 2,

    // position: 'absolute',
    // transform: [{ translateX: 50 }],
    top: 0,
  },
  header2FlexBox: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  hngTypo: {
    fontFamily: FontFamily.robotoMedium,
    fontWeight: '500',
  },
  header3Typo: {
    fontSize: FontSize.size_base,
    color: Color.midnightblue_100,
    fontWeight: '500',
    lineHeight: 24,
  },
  text3Clr: {
    color: Color.dodgerblue,
    textAlign: 'center',
    lineHeight: 20,
  },
  text4Clr: {
    color: Color.orange,
    textAlign: 'center',
    lineHeight: 20,
  },
  dropdownBorder: {
    borderColor: '#e6ebf1',
    borderStyle: 'solid',
    display: 'none',
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemFlexBox: {
    paddingVertical: Padding.p_5xs,
    justifyContent: 'center',
    paddingHorizontal: Padding.p_base,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemLayout: {
    borderRadius: Border.br_13xl,
    paddingVertical: Padding.p_5xs,
  },
  snTmt1Clr: {
    color: Color.mediumslateblue_200,
    textAlign: 'center',
  },
  texts1Position: {
    top: 10,
    position: 'absolute',
  },
  textLayout4: {
    display: 'flex',
    lineHeight: 16,
    fontSize: FontSize.size_xs,
  },
  textLayout3: {
    //width: 34,
    display: 'flex',
    lineHeight: 16,
    fontSize: FontSize.size_xs,
  },
  textLayout2: {
    //  / width: 27,
    display: 'flex',
    top: 0,
    color: Color.midnightblue_200,
    fontFamily: FontFamily.robotoRegular,
    lineHeight: 16,
    fontSize: FontSize.size_xs,
    position: 'absolute',
  },
  textLayout1: {
    left: 101,
    //  width: 34,
    display: 'flex',
    color: Color.midnightblue_200,
    fontFamily: FontFamily.robotoRegular,
    lineHeight: 16,
    fontSize: FontSize.size_xs,
  },
  bar1Position: {
    top: 8,
    position: 'absolute',
  },
  viewLayout1: {
    height: 20,
    borderBottomRightRadius: Border.br_9xs,
    borderTopRightRadius: Border.br_9xs,
  },
  viewPosition: {
    width: 80,
    top: 0,
    position: 'absolute',
  },
  view1Position: {
    top: 36,
    position: 'absolute',
  },
  view2Position: {
    top: 72,
    position: 'absolute',
  },
  view3Position: {
    top: 107,
    position: 'absolute',
  },
  view4Position: {
    top: 143,
    position: 'absolute',
  },
  trulyLayout: {
    width: 83,
    left: 0,
  },
  text22Position: {
    top: 86,
    display: 'flex',
    lineHeight: 16,
    fontSize: FontSize.size_xs,
    position: 'absolute',
    alignItems: 'center',
  },
  textTypo: {
    height: 14,
    display: 'flex',
    color: Color.midnightblue_200,
    fontFamily: FontFamily.robotoRegular,
    fontSize: FontSize.size_xs,
  },
  texts12Position: {
    left: 71,
    position: 'absolute',
  },
  viewLayout: {
    width: 21,
    borderTopLeftRadius: Border.br_9xs,
    borderTopRightRadius: Border.br_9xs,
  },
  buttonFlexBox: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  orderShadowBox: {
    padding: Padding.p_base,
    elevation: 4,
    shadowRadius: 12,
    borderRadius: Border.br_base,
    shadowOpacity: 12,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowColor: 'rgba(0, 62, 207, 0.12)',
    backgroundColor: Color.white,
    alignSelf: 'stretch',

    // height: 350,
  },
  textLayout: {
    lineHeight: 20,
    fontSize: FontSize.size_sm,
  },
  oderItemBorder: {
    paddingBottom: Padding.p_xs,
    borderBottomWidth: 1,
    borderColor: '#e6ebf1',
    borderStyle: 'solid',
  },
  avatarIcon: {
    borderRadius: Border.br_5xl,
    width: 40,
    height: 40,
    borderColor: '#FFFFFF',
    borderWidth: 1,
  },
  title: {
    color: Color.white,
    fontFamily: FontFamily.robotoBold,
    fontWeight: '700',
    lineHeight: 24,
    fontSize: FontSize.size_base,
    left: 50,
  },
  subtitle: {
    display: 'none',
    fontFamily: FontFamily.robotoRegular,
    lineHeight: 16,
    fontSize: FontSize.size_xs,
    textAlign: 'left',
    color: Color.white,
    alignSelf: 'stretch',
  },
  name: {
    flex: 1,
  },
  acount1: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  notificationsIcon: {
    zIndex: 0,
  },
  noticeIconChild: {
    width: 8,
    zIndex: 1,
    height: 8,
    left: 22,
  },
  noticeIcon: {
    borderRadius: Border.br_5xs,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    padding: Padding.p_5xs,
    borderWidth: 1,
    borderStyle: 'solid',
    flexDirection: 'row',
  },
  acount: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  label: {
    textAlign: 'left',
    fontFamily: FontFamily.robotoRegular,
    lineHeight: 16,
    fontSize: FontSize.size_xs,
    color: Color.white,
  },
  text: {
    textAlign: 'center',
    color: Color.white,
    fontFamily: FontFamily.robotoBold,
    lineHeight: 24,
  },
  text1: {
    fontSize: FontSize.size_3xs,
    color: Color.gray,
    textAlign: 'center',
    fontFamily: FontFamily.robotoRegular,
    lineHeight: 16,
  },
  totalChild: {
    borderRadius: Border.br_12xs,
    width: 12,
    height: 8,
  },
  total: {
    alignItems: 'baseline',
    flexDirection: 'row',
  },
  overviewChild: {
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderRightWidth: 1,
    height: 25,
    width: 1,
    borderStyle: 'solid',
  },
  overview: {
    borderRadius: Border.br_xs,
    paddingVertical: 0,
    paddingHorizontal: Padding.p_base,
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  header1: {
    marginLeft: 16,
    marginRight: 16,
    // right: 16,
    // bottom: 24,
    // left: 16,
    // position: 'absolute',
  },
  scheduleIcon: {
    top: 62,
    left: screenWidth - 25,
    width: 31,
    height: 43,
    position: 'absolute',
  },
  storefrontIcon: {
    top: 23,
    left: screenWidth - 150,
    width: 46,
    height: 46,
    position: 'absolute',
  },
  localMallIcon: {
    top: 73,
    left: screenWidth - 100,
    width: 44,
    height: 44,
    position: 'absolute',
  },
  monetizationOnIcon: {
    top: 29,
    left: screenWidth - 80,
    width: 36,
    height: 36,
    position: 'absolute',
  },
  header: {
    borderBottomRightRadius: Border.br_5xl,
    borderBottomLeftRadius: Border.br_5xl,
    height: 200,
    // width: screenWidth,
  },
  logo: {
    // marginTop: 11,
    // marginLeft: -48.5,
    // lineHeight: 22,
    fontFamily: FontFamily.uTMAvoBold,
    // top: '50%',
    textAlign: 'center',
    zIndex: 1,
    color: Color.white,
  },
  topAppBar: {
    paddingTop: 36,
    paddingBottom: 10,
    paddingHorizontal: Padding.p_base,
    flexDirection: 'row',
    // width: ,
    alignItems: 'center',
  },
  time: {
    marginTop: -8,
    left: 21,
    fontSize: FontSize.size_mini,
    letterSpacing: 0,
    fontWeight: '600',
    fontFamily: FontFamily.sofiaSansSemiCondensed,
    width: 54,
    top: '50%',
    textAlign: 'center',
    color: Color.white,
    position: 'absolute',
  },
  border: {
    marginTop: -5.67,
    right: 2,
    borderRadius: 3,
    borderColor: '#fff',
    opacity: 0.35,

    height: 11,
    top: '50%',
    borderWidth: 1,
    borderStyle: 'solid',
    position: 'absolute',
  },
  capIcon: {
    marginTop: -2,
    right: 0,
    height: 4,
    opacity: 0.4,
    top: '50%',
    width: 1,
    position: 'absolute',
  },
  capacity: {
    marginTop: -3.67,
    right: 4,
    borderRadius: 1,
    width: 18,
    height: 7,
    backgroundColor: Color.white,
    top: '50%',
    position: 'absolute',
  },
  battery: {
    marginTop: -4.67,
    right: 14,
    height: 11,
    top: '50%',
    width: 24,
    position: 'absolute',
  },
  wifiIcon: {
    width: 15,
    height: 11,
  },
  cellularConnectionIcon: {
    width: 17,
    height: 11,
  },
  systemLightStatusBar: {
    height: 44,
    width: 375,
  },
  orderIcon: {
    width: 16,
    height: 16,
  },
  orderIconAvatar: {
    width: 24,
    height: 24,
    borderRadius: 18,
  },
  header3: {
    color: Color.midnightblue_100,
    textAlign: 'center',
    lineHeight: 24,
  },
  title1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header2: {
    alignSelf: 'stretch',
  },
  text3: {
    fontFamily: FontFamily.robotoBold,
  },
  angXL: {
    color: Color.midnightblue_200,
    textAlign: 'center',
    fontFamily: FontFamily.robotoRegular,
    lineHeight: 16,
    fontSize: FontSize.size_xs,
    alignSelf: 'stretch',
  },
  status: {
    alignSelf: 'stretch',
    alignItems: 'center',
    flex: 1,
  },
  text4: {
    fontFamily: FontFamily.robotoBold,
  },
  text5: {
    color: Color.mediumseagreen_100,
    textAlign: 'center',
    lineHeight: 20,
    fontFamily: FontFamily.robotoBold,
  },
  text6: {
    color: Color.midnightblue_100,
    textAlign: 'center',
    lineHeight: 20,
    fontFamily: FontFamily.robotoBold,
  },
  content: {
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  snTmt: {
    color: Color.midnightblue_100,
    textAlign: 'center',
    fontFamily: FontFamily.robotoRegular,
    lineHeight: 16,
    fontSize: FontSize.size_xs,
  },
  dropdown: {
    paddingLeft: Padding.p_5xs,
    paddingTop: Padding.p_9xs,
    paddingRight: Padding.p_9xs,
    paddingBottom: Padding.p_9xs,
    borderRadius: Border.br_9xs,
    borderWidth: 1,
  },
  snTmt1: {
    lineHeight: 16,
    fontSize: FontSize.size_xs,
  },
  item: {
    backgroundColor: Color.aliceblue_100,
    borderRadius: Border.br_13xl,
  },
  gianHng: {
    color: Color.midnightblue_100,
    textAlign: 'center',
    lineHeight: 16,
    fontSize: FontSize.size_xs,
  },
  item1: {
    borderColor: '#f3f7ff',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  filter: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  verticalLinesIcon: {
    left: 64,
    width: 230,
    height: 180,
    top: 0,
    position: 'absolute',
  },
  postmart: {
    textAlign: 'right',
    // width: 51,
    color: Color.midnightblue_100,
    alignItems: 'center',
  },
  lazada: {
    // width: 39,
    textAlign: 'right',
    color: Color.midnightblue_100,
    alignItems: 'center',
  },
  shopee: {
    //width: 41,
    textAlign: 'right',
    color: Color.midnightblue_100,
    alignItems: 'center',
  },
  sendo: {
    textAlign: 'right',
    color: Color.midnightblue_100,
    alignItems: 'center',
  },
  tiki: {
    // width: 20,
    textAlign: 'right',
    color: Color.midnightblue_100,
    alignItems: 'center',
  },
  leftText: {
    height: 160,
    paddingRight: 0,
    alignItems: 'flex-end',
    // width: 51,
    left: 0,
  },
  text7: {
    alignItems: 'flex-end',
    left: 0,
    top: 0,
    justifyContent: 'center',
    color: Color.midnightblue_200,
    textAlign: 'center',
    fontFamily: FontFamily.robotoRegular,
    position: 'absolute',
  },
  text8: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    textAlign: 'center',
  },
  text9: {
    alignItems: 'flex-end',
    top: 0,
    justifyContent: 'center',
    textAlign: 'center',
    position: 'absolute',
  },
  text10: {
    left: 158,
    alignItems: 'flex-end',
    top: 0,
    justifyContent: 'center',
    color: Color.midnightblue_200,
    textAlign: 'center',
    fontFamily: FontFamily.robotoRegular,
    position: 'absolute',
  },
  text11: {
    left: 216,
    alignItems: 'flex-end',
    top: 0,
    justifyContent: 'center',
    color: Color.midnightblue_200,
    textAlign: 'center',
    fontFamily: FontFamily.robotoRegular,
    position: 'absolute',
  },
  bottomText: {
    top: 184,
    left: 61,
    width: 250,
    height: 16,
    position: 'absolute',
  },
  view: {
    backgroundColor: Color.mediumslateblue_100,
    left: 0,
  },
  view1: {
    backgroundColor: Color.darkorange,
    width: 183,
    left: 0,
  },
  view2: {
    width: 102,
    backgroundColor: Color.blueviolet,
    left: 0,
  },
  view3: {
    backgroundColor: '#171cce',
    width: 114,
    left: 0,
  },
  view4: {
    backgroundColor: '#37db9d',
    width: 181,
    left: 0,
  },
  bar1: {
    left: 63,
    height: 163,
    width: 183,
  },
  text12: {
    left: 0,
    textAlign: 'left',
    alignItems: 'center',
  },
  text13: {
    left: 103,
    color: Color.midnightblue_200,
    fontFamily: FontFamily.robotoRegular,
    textAlign: 'left',
    alignItems: 'center',
  },
  text14: {
    color: Color.midnightblue_200,
    left: 22,
    fontFamily: FontFamily.robotoRegular,
    textAlign: 'left',
    alignItems: 'center',
  },
  text15: {
    left: 34,
    color: Color.midnightblue_200,
    fontFamily: FontFamily.robotoRegular,
    textAlign: 'left',
    alignItems: 'center',
  },
  text16: {
    textAlign: 'left',
    alignItems: 'center',
  },
  texts1: {
    left: 149,
    width: 137,
    height: 159,
  },
  //   chart: {
  //     height: 200,
  //     width: 311,
  //   },
  content1: {
    alignSelf: 'stretch',
    marginTop: 16,
  },
  verticalLinesIcon1: {
    left: 96,
    width: 204,
    height: 130,
    top: 0,
    position: 'absolute',
  },
  cSnMc: {
    left: 3,
    textAlign: 'right',
    color: Color.midnightblue_100,
    alignItems: 'center',
  },
  mcTrulyHu: {
    top: 44,
    textAlign: 'right',
    color: Color.midnightblue_100,
    position: 'absolute',
    alignItems: 'center',
  },
  mcTrulyHu1: {
    textAlign: 'right',
    color: Color.midnightblue_100,
  },
  leftText1: {
    top: 7,
    height: 118,
    position: 'absolute',
  },
  text18: {
    left: 94,
    alignItems: 'flex-end',
    top: 0,
    justifyContent: 'center',
    color: Color.midnightblue_200,

    textAlign: 'center',
    fontFamily: FontFamily.robotoRegular,
    position: 'absolute',
  },
  text19: {
    left: 197,
    alignItems: 'flex-end',
    top: 0,
    justifyContent: 'center',
    color: Color.midnightblue_200,

    textAlign: 'center',
    fontFamily: FontFamily.robotoRegular,
    position: 'absolute',
  },
  bottomText1: {
    top: 134,
    left: 93,
    width: 218,
    height: 16,
    position: 'absolute',
  },
  view5: {
    width: 162,
    backgroundColor: Color.mediumslateblue_100,
  },
  view6: {
    width: 94,
    backgroundColor: Color.darkorange,
  },
  view7: {
    width: 150,
    backgroundColor: Color.blueviolet,
  },
  bar11: {
    left: 95,
    height: 106,
    width: 162,
  },
  text20: {
    left: 67,
    top: 0,
    color: Color.midnightblue_200,

    fontFamily: FontFamily.robotoRegular,
    textAlign: 'left',
    position: 'absolute',
    alignItems: 'center',
  },
  text21: {
    top: 43,
    left: 0,
    color: Color.midnightblue_200,

    fontFamily: FontFamily.robotoRegular,
    textAlign: 'left',
    position: 'absolute',
    alignItems: 'center',
  },
  text22: {
    left: 55,
    color: Color.midnightblue_200,

    fontFamily: FontFamily.robotoRegular,
    textAlign: 'left',
  },
  texts11: {
    top: 14,
    left: 196,
    width: 88,
    height: 102,
    position: 'absolute',
  },
  nbchartsHcolumncharts: {
    height: 150,
    width: 311,
  },
  horizontalLinesIcon: {
    left: 35,
    width: 276,
    height: 80,
  },
  text23: {
    textAlign: 'right',

    alignItems: 'center',
  },
  text25: {
    width: 7,
    textAlign: 'right',
    alignItems: 'center',
  },
  leftText2: {
    height: 94,
    paddingHorizontal: 0,
    alignItems: 'flex-end',
    left: 0,
    top: 0,

    paddingVertical: 0,
    position: 'absolute',
  },
  oDiOan: {
    width: 66,
    height: 49,
    alignItems: 'flex-end',
    justifyContent: 'center',
    color: Color.midnightblue_100,
    textAlign: 'center',
  },
  bottomText2: {
    top: 96,
    left: 48,
    width: 249,
    height: 49,
    flexDirection: 'row',
    position: 'absolute',
    alignItems: 'center',
  },
  view8: {
    height: 68,
    backgroundColor: Color.mediumslateblue_100,
  },
  view9: {
    height: 37,
    backgroundColor: Color.darkorange,
  },
  view10: {
    height: 69,
    backgroundColor: Color.blueviolet,
  },
  columns1: {
    top: 19,
    width: 205,
    height: 69,
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  text26: {
    top: 1,
    alignItems: 'flex-end',
    left: 0,
    justifyContent: 'center',

    textAlign: 'center',
    position: 'absolute',
  },
  text27: {
    top: 32,
    left: 91,
    alignItems: 'flex-end',
    justifyContent: 'center',

    textAlign: 'center',
    position: 'absolute',
  },
  text28: {
    left: 184,
    alignItems: 'flex-end',
    top: 0,
    justifyContent: 'center',

    textAlign: 'center',
    position: 'absolute',
  },
  texts12: {
    width: 206,
    top: 0,
    height: 46,
  },
  chart1: {
    height: 145,
    width: 311,
    display: 'none',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  filter2: {
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  minhTrn: {
    color: Color.midnightblue_100,
    fontFamily: FontFamily.robotoRegular,
    lineHeight: 16,
    fontSize: FontSize.size_xs,
    textAlign: 'left',
  },
  status4: {
    fontFamily: FontFamily.robotoRegular,
    fontSize: FontSize.size_xs,
  },
  productChild: {
    width: 58,
    height: 58,
    borderRadius: Border.br_9xs,
  },
  bnhInNg: {
    color: Color.midnightblue_100,
    textAlign: 'left',
    lineHeight: 24,
    alignSelf: 'stretch',
  },
  mSnPhm: {
    color: Color.midnightblue_200,
    fontFamily: FontFamily.robotoRegular,
    lineHeight: 16,
    fontSize: FontSize.size_xs,
    textAlign: 'left',
    alignSelf: 'stretch',
  },
  text31: {
    fontFamily: FontFamily.robotoRegular,
    lineHeight: 16,
    fontSize: FontSize.size_xs,
  },
  text29: {
    color: Color.midnightblue_100,
    textAlign: 'center',
  },
  x3: {
    color: Color.midnightblue_200,
    textAlign: 'center',
    fontFamily: FontFamily.robotoRegular,
    lineHeight: 16,
    fontSize: FontSize.size_xs,
  },
  content4: {
    width: 237,
  },
  text34: {
    lineHeight: 16,
    fontSize: FontSize.size_xs,
  },
  text32: {
    fontFamily: FontFamily.robotoRegular,
  },
  price: {
    alignItems: 'baseline',
    alignSelf: 'stretch',
  },
  hyNHng: {
    color: Color.orangered,
    textAlign: 'center',
    fontFamily: FontFamily.robotoRegular,
  },
  button: {
    borderColor: '#ffcbbe',
    borderRadius: Border.br_9xs,
    borderWidth: 1,
    borderStyle: 'solid',
  },
  xcNhnN: {
    fontFamily: FontFamily.robotoRegular,
  },
  button1: {
    borderColor: '#003ecf',
    borderRadius: Border.br_9xs,
    borderWidth: 1,
    borderStyle: 'solid',
  },
  orderId1: {
    width: 311,
  },
  group2: {
    height: 144,
    alignSelf: 'stretch',
  },
  moreButton: {
    paddingHorizontal: Padding.p_5xs,
    paddingVertical: Padding.p_9xs,
    justifyContent: 'center',
    backgroundColor: Color.white,
    flexDirection: 'row',
    alignItems: 'center',
  },
  productList: {
    alignItems: 'flex-end',
    alignSelf: 'stretch',
  },
  product1: {
    flexDirection: 'row',
  },
  total3: {
    width: 311,
    alignItems: 'baseline',
  },
  buttonAction2: {
    width: 311,
    alignItems: 'center',
  },
  status9: {
    fontFamily: FontFamily.robotoRegular,
    fontSize: FontSize.size_xs,
  },
  buttonAction5: {
    width: 311,
    display: 'none',
    alignItems: 'center',
  },
  oderItem5: {
    display: 'none',
  },
  oderItem6: {
    display: 'none',
  },
  orderList: {
    display: 'none',
  },
  body: {
    paddingTop: Padding.p_base,
    paddingBottom: Padding.p_5xl,
    paddingHorizontal: Padding.p_base,
    width: screenWidth,
  },
  homeIcon: {
    display: 'none',
  },
  menuItem: {
    alignItems: 'center',
    flex: 1,
  },
  nHng: {
    color: Color.midnightblue_200,
    textAlign: 'center',
    lineHeight: 16,
    fontSize: FontSize.size_xs,
  },
  navigationBar: {
    shadowRadius: 4,
    elevation: 4,
    borderTopWidth: 1,
    paddingTop: Padding.p_xs,
    paddingBottom: Padding.p_13xl,
    justifyContent: 'center',
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowColor: 'rgba(0, 62, 207, 0.12)',
    borderColor: '#e6ebf1',
    backgroundColor: Color.white,
    width: 375,
  },
  homeIndicator: {
    marginLeft: -66.5,
    bottom: 8,
    borderRadius: Border.br_81xl,
    backgroundColor: Color.black,
    width: 134,
    height: 5,
  },
  systemLightHomeIndicato: {
    height: 34,
    width: 375,
  },
  homepage: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    overflow: 'hidden',
    flex: 1,
    backgroundColor: Color.aliceblue_100,
  },
});

// To open a modal dropdown, we need to create a modal component and a dropdown component.
// The modal component should have a visible state that is toggled when the dropdown is clicked.
// The dropdown component should be positioned relative to the button that triggers it and should be rendered inside the modal component.

// Here is an example of how to create a modal component with a dropdown inside:

// import React, { useState } from 'react';
// import { Modal, TouchableOpacity, View } from 'react-native';

// const HomePage = () => {
// const [isModalVisible, setIsModalVisible] = useState(false);

// const toggleModal = () => {
//   setIsModalVisible(!isModalVisible);
// };

//   return (
//     <View>
//       <TouchableOpacity onPress={toggleModal}>
//         <Text>Open Dropdown</Text>
//       </TouchableOpacity>
//       <Modal visible={isModalVisible} animationType="slide">
//         <View>
//           {/* Dropdown component goes here */}
//         </View>
//       </Modal>
//     </View>
//   );
// };

// Replace ${INSERT_HERE} with the above code.
