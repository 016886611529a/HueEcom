import React, {useState, useCallback, useRef, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Modal,
  ActivityIndicator,
  Platform,
  Dimensions,
  // TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';

import Toast from 'react-native-toast-message';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import PopupFilter from '../../components/PopupFilter';
import {
  Padding,
  Color,
  FontFamily,
  FontSize,
  Border,
} from '../../../GlobalStyles';
import RBSheet from 'react-native-raw-bottom-sheet';
import ButtonOrder from '../../components/button/ButtonOrder';
import {
  FilterStatus,
  changeStatusFilter,
  changeStatusOrderAsync,
  dataAdvantedFilter,
  dataFilter,
  dataOrder,
  fetchOrderAdvanted,
  fetchOrderAsync,
  filter,
  selectedOrderDetail,
  selectedStatus,
  selectedStoreByEcom,
  status,
  valueOrderType,
} from '../home/homeSlice';
import {useDispatch, useSelector} from 'react-redux';
import {BASEURL} from '../../data/mock/mock';
import Icon from 'react-native-vector-icons/AntDesign';
import CollapsibleList from 'react-native-collapsible-list';
import {ViewMoreItem} from '../../components/ViewMore/ViewMoreItem';

const screenWidth = Dimensions.get('window').width;

const screenHeight = Dimensions.get('window').height;
Icon.loadFont().then();
const statusRender = id => {
  switch (id) {
    case 1:
      return (
        // eslint-disable-next-line react-native/no-inline-styles
        <Text style={[styles.status, styles.textLayout, {color: '#0084F2'}]}>
          Đang xử lý
        </Text>
      );
    case 2:
      return (
        // eslint-disable-next-line react-native/no-inline-styles
        <Text style={[styles.status, styles.textLayout, {color: '#00123D'}]}>
          Đã huỷ
        </Text>
      );
    case 3:
      return (
        // eslint-disable-next-line react-native/no-inline-styles
        <Text style={[styles.status, styles.textLayout, {color: '#FFB330'}]}>
          Đang vận chuyển
        </Text>
      );
    case 4:
      return (
        // eslint-disable-next-line react-native/no-inline-styles
        <Text style={[styles.status, styles.textLayout, {color: '#00BE8D'}]}>
          Đã giao hàng
        </Text>
      );
    default:
      break;
  }
};
const ProccessingOrder = () => {
  const [filterIconVisible, setFilterIconVisible] = useState(false);
  //const [selected, setSelected] = useState(0);
  const navigation = useNavigation();
  const refRBSheet = useRef();
  const [visible, setVisible] = useState(false);
  const [cancelVisible, setCancelVisible] = useState(false);
  const [selectItemId, setSelectedItemId] = useState(0);
  // const [filterStatus, setFilterStatus] = useState(false);
  const scrollViewRefContent = useRef();
  const isFilter = useSelector(FilterStatus);
  const togglePopup = id => {
    setSelectedItemId(id);
    setVisible(!visible);
  };
  const togglePopupCancel = id => {
    setSelectedItemId(id);
    setCancelVisible(!cancelVisible);
  };

  const orderNumber = useSelector(valueOrderType);
  const orders = useSelector(dataFilter);
  const selected = useSelector(selectedStatus);
  const dataFitler = useSelector(dataAdvantedFilter);
  const dispatch = useDispatch();
  const statusPage = useSelector(status);
  const selectedOrder = data => {
    //console.log(data);
    dispatch(selectedOrderDetail(data));
    navigation.navigate('OrderDetail');
  };

  const onTapHandle = id => {
    dispatch(filter(id));
  };
  const dataMocks = [
    {
      label: 'Tất cả',
      number: orderNumber.total,
      id: 0,
    },
    {
      label: 'Đang xử lý',
      number: orderNumber.warting,
      id: 1,
    },
    {
      label: 'Đang vận chuyển',
      number: orderNumber.delivering,
      id: 3,
    },
    {
      label: 'Đã giao hàng',
      number: orderNumber.finished,
      id: 4,
    },
    {
      label: 'Đã hủy',
      number: orderNumber.cancel,
      id: 2,
    },
  ];
  const acceptOrderHandle = () => {
    dispatch(changeStatusOrderAsync(selectItemId));
    setVisible(false);
    dispatch(fetchOrderAsync());
  };
  const cancelOrderHandler = () => {
    dispatch(changeStatusOrderAsync(selectItemId, false));
    setCancelVisible(false);
    dispatch(fetchOrderAsync());
  };
  const hanlderReset = () => {
    dispatch();
  };
  const handleFilter = ({ecomId, storeId, startTime, endTime}) => {
    //{ statusId = null, ecomerceId = null, startDate = null, endDate = null }
    dispatch(
      fetchOrderAsync({
        statusId: null,
        ecomerceId: ecomId == 0 ? null : ecomId,
        startDate: startTime,
        endDate: endTime,
        storeID: storeId == 0 ? null : storeId,
      }),
    );
    handleScrollToPosition(selected);
    //  setFilter(true);
  };
  const scrollViewRef = useRef();
  const handleScrollToPosition = index => {
    var item = 0;
    switch (Number(index)) {
      case 0:
        item = 0;
        break;
      case 1:
        item = 100;
        break;
      case 2:
        item = 500;
        break;
      case 3:
        item = 320;
        break;
      case 4:
        item = 400;
        break;
      default:
        break;
    }

    scrollViewRef.current.scrollTo({x: item, y: 0, animated: true});
    // console.log(item);
  };
  useEffect(() => {
    // console.log(selected);
    handleScrollToPosition(selected);
  }, [selected]);

  return (
    <>
      {statusPage === 'loading' ? (
        <View
          style={{
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size={50} />
        </View>
      ) : (
        <View style={styles.overlay}>
          <View style={[styles.proccessingorder]}>
            <LinearGradient
              style={[
                styles.topAppBar,
                styles.topAppBarPosition,
                styles.orderIdFlexBox,
                styles.contentSpaceBlock,
                Platform.OS == 'ios' ? styles.top20 : {},
              ]}
              locations={[0, 1]}
              colors={['#003ecf', '#550cb1']}
              useAngle={true}
              angle={70.26}>
              <TouchableOpacity
                style={[styles.backIcon, styles.iconLayout1]}
                onPress={() => {
                  navigation.navigate('Homepage');
                  if (isFilter) {
                    dispatch(
                      fetchOrderAsync({
                        statusId: null,
                        ecomerceId: null,
                        startDate: null,
                        endDate: null,
                        storeID: null,
                      }),
                    );
                    dispatch(selectedStoreByEcom(0));
                    dispatch(changeStatusFilter(false));
                  }
                }}>
                <Image
                  style={styles.iconLayout}
                  resizeMode="cover"
                  source={require('../../assets/backicon2.png')}
                />
              </TouchableOpacity>
              <Text style={[styles.logo, styles.logoPosition]}>
                Quản lý đơn hàng
              </Text>
              <View style={styles.productItem3Position}>
                <TouchableOpacity
                  style={styles.iconLayout1}
                  onPress={() => navigation.navigate('SearchOrder')}>
                  <Image
                    style={styles.iconLayout}
                    resizeMode="cover"
                    source={require('../../assets/searchicon.png')}
                  />
                </TouchableOpacity>
                {isFilter == false ? (
                  <TouchableOpacity
                    style={[styles.iconLayout1, styles.ml8]}
                    onPress={() => {
                      refRBSheet.current.open();
                      dispatch(changeStatusFilter(true));
                      //   setFilterStatus(!filterStatus)
                    }}>
                    {
                      <Image
                        style={styles.iconLayout}
                        resizeMode="cover"
                        source={require('../../assets/filtericon2.png')}
                      />
                    }
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={[styles.iconLayout1, styles.ml8]}
                    onPress={() => {
                      refRBSheet.current.open();
                      // setFilterStatus(!filterStatus)
                    }}>
                    {
                      <Image
                        style={styles.iconLayout}
                        resizeMode="cover"
                        source={require('../../assets/filter_icon_fill.png')}
                      />
                    }
                  </TouchableOpacity>
                )}
              </View>
            </LinearGradient>
            <View
              style={[
                styles.navTab,
                Platform.OS == 'ios' ? styles.navTabForIos : {},
              ]}>
              <ScrollView
                ref={scrollViewRef}
                scrollEnabled={true}
                horizontal
                nestedScrollEnabled={true}
                showsHorizontalScrollIndicator={false}>
                {dataMocks.map((e, index) => {
                  var textStyle =
                    e.id == selected ? styles.nHngClr : styles.ttC520;
                  var tapStyle = e.id === selected ? styles.tab1 : styles.tab;
                  return (
                    <TouchableOpacity
                      key={e.id}
                      style={[tapStyle, styles.tabFlexBox]}
                      onPress={() => {
                        onTapHandle(e.id);
                      }}>
                      <Text
                        style={[
                          textStyle,
                          styles.nHngTypo,
                          styles.textLayout1,
                        ]}>
                        {`${e.label} (${e.number})`}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
            <View>
              <FlatList
                style={{marginTop: 15, marginBottom: 50}}
                keyExtractor={item => item.IdDonHang}
                renderItem={item => {
                  let e = item.item;
                  return (
                    <TouchableOpacity
                      key={e.IdDonHang}
                      style={[styles.oderItemShadowBox, styles.mt8]}
                      onPress={() => selectedOrder(e)}>
                      <View style={[styles.orderId, styles.orderIdFlexBox]}>
                        <View style={styles.person}>
                          <Image
                            style={styles.filterIcon1}
                            resizeMode="cover"
                            source={require('../../assets/personicon.png')}
                          />
                          <Text
                            style={[
                              styles.minhTrn,
                              styles.ml4,
                              styles.textLayout,
                            ]}>
                            {e.TenKhachHang}
                          </Text>
                        </View>
                        {statusRender(e.IdTrangThai)}
                      </View>
                      <ViewMoreItem e={e} />

                      <View
                        style={[
                          styles.total,
                          // styles.mt8,
                          styles.buttonFlexBox,
                        ]}>
                        <Text style={[styles.x3, styles.textLayout]}>
                          Tổng đơn hàng:
                        </Text>
                        <Text
                          style={[styles.text3, styles.ml8, styles.nHngClr]}>
                          <Text style={styles.textLayout1}>
                            {e.TongTienHang.toLocaleString('it-IT', {
                              style: 'currency',
                              currency: 'VND',
                            }).replace('VND', 'đ')}
                          </Text>
                        </Text>
                      </View>
                      {e.IdTrangThai == 1 ? (
                        <View
                          style={[
                            styles.buttonAction,
                            styles.mt8,
                            styles.buttonFlexBox,
                          ]}>
                          <TouchableOpacity
                            onPress={() => {
                              togglePopupCancel(e.IdDonHang);
                            }}>
                            <ButtonOrder
                              type={'secondary-outline'}
                              text="Huỷ đơn hàng"
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => {
                              togglePopup(e.IdDonHang);
                            }}>
                            <ButtonOrder type={'primary'} text="Xác nhận đơn" />
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <></>
                      )}
                    </TouchableOpacity>
                  );
                }}
                data={orders}>
                {/* <View style={styles.navigationBar}>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => navigation.navigate('Homepage')}>
                  <Image
                    style={styles.iconLayout1}
                    resizeMode="cover"
                    source={require('../../assets/homeicon.png')}
                  />
                  <Image
                    style={[
                      styles.homeIconActive,
                      styles.mt4,
                      styles.iconLayout1,
                    ]}
                    resizeMode="cover"
                    source={require('../../assets/homeiconactive.png')}
                  />
                  <Text
                    style={[
                      styles.trangCh,
                      styles.mt4,
                      styles.textLayout,
                      styles.nHngTypo,
                    ]}>
                    Trang chủ
                  </Text>
                </TouchableOpacity>
                <View style={styles.menuItem}>
                  <Image
                    style={[styles.homeIconActive, styles.iconLayout1]}
                    resizeMode="cover"
                    source={require('../../assets/ordericon.png')}
                  />
                  <Image
                    style={[styles.iconLayout1, styles.mt4]}
                    resizeMode="cover"
                    source={require('../../assets/ordericonactive.png')}
                  />
                  <Text
                    style={[
                      styles.textLayout,
                      styles.mt4,
                      styles.nHngClr,
                      styles.nHngTypo,
                    ]}>
                    Đơn hàng
                  </Text>
                </View>
                <View style={styles.menuItem}>
                  <Image
                    style={styles.iconLayout1}
                    resizeMode="cover"
                    source={require('../../assets/staticsticicon.png')}
                  />
                  <Image
                    style={[
                      styles.homeIconActive,
                      styles.mt4,
                      styles.iconLayout1,
                    ]}
                    resizeMode="cover"
                    source={require('../../assets/staticsticiconactive.png')}
                  />
                  <Text
                    style={[
                      styles.trangCh,
                      styles.mt4,
                      styles.textLayout,
                      styles.nHngTypo,
                    ]}>
                    Thống kê
                  </Text>
                </View>
              </View> */}
              </FlatList>
            </View>
          </View>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Modal visible={visible} animationType="fade" transparent={true}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                }}>
                <View
                  style={{
                    backgroundColor: '#fff',
                    height: 200,
                    width: '80%',
                    padding: 20,
                    borderRadius: 16,
                    shadowColor: '#00123D',
                    shadowOffset: {
                      width: 0,
                      height: 0,
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 1.41,
                    elevation: 2,
                  }}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      width: '100%',
                    }}>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        width: '100%',
                      }}>
                      <TouchableOpacity onPress={togglePopup}>
                        <Icon name="close" color="#00123D" size={16} />
                      </TouchableOpacity>
                    </View>
                    <View style={{marginTop: 18}}>
                      <Text
                        style={{
                          fontSize: 16,
                          textAlign: 'center',
                          fontWeight: '700',
                          color: '#00123D',
                        }}>
                        Bạn có xác nhận đơn hàng?
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          textAlign: 'center',
                          // fontWeight: '600',
                          marginTop: 8,
                          color: '#00123D',
                          opacity: 0.7,
                        }}>
                        Nếu xác nhận đơn hàng, thì trạng thái trở thành đang vận
                        chuyển.
                      </Text>
                    </View>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginTop: 16,
                      }}>
                      <TouchableOpacity onPress={togglePopup}>
                        <ButtonOrder type={'secondary-outline'} text="Huỷ" />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={acceptOrderHandle}>
                        <ButtonOrder type={'primary'} text="Xác nhận" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Modal
              visible={cancelVisible}
              animationType="fade"
              transparent={true}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                }}>
                <View
                  style={{
                    backgroundColor: '#fff',
                    height: 200,
                    width: '80%',
                    padding: 20,
                    borderRadius: 16,
                    shadowColor: '#00123D',
                    shadowOffset: {
                      width: 0,
                      height: 0,
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 1.41,
                    elevation: 2,
                  }}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      width: '100%',
                    }}>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        width: '100%',
                      }}>
                      <TouchableOpacity onPress={() => setCancelVisible(false)}>
                        <Icon name="close" color="#00123D" size={16} />
                      </TouchableOpacity>
                    </View>
                    <View style={{marginTop: 18}}>
                      <Text
                        style={{
                          fontSize: 16,
                          textAlign: 'center',
                          fontWeight: '700',
                          color: '#00123D',
                        }}>
                        Bạn có muốn huỷ đơn hàng?
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          textAlign: 'center',
                          // fontWeight: '600',
                          marginTop: 8,
                          color: '#00123D',
                          opacity: 0.7,
                        }}>
                        Nếu xác nhận đơn hàng, thì trạng thái trở thành đã huỷ.
                      </Text>
                    </View>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginTop: 16,
                      }}>
                      <TouchableOpacity onPress={togglePopupCancel}>
                        <ButtonOrder type={'secondary-outline'} text="Huỷ" />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={cancelOrderHandler}>
                        <ButtonOrder type={'primary'} text="Xác nhận" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
          <RBSheet
            ref={refRBSheet}
            height={563}
            openDuration={250}
            customStyles={{
              container: {
                borderTopRightRadius: Border.br_5xl,
                borderTopLeftRadius: Border.br_5xl,
                justifyContent: 'center',
                alignItems: 'center',
              },
            }}>
            <PopupFilter
              onFilter={handleFilter}
              onClose={() => {
                refRBSheet.current.close();
              }}
            />
          </RBSheet>
        </View>
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
  ml12: {
    marginLeft: 12,
  },
  mt4: {
    marginTop: 4,
  },
  ml16: {
    marginLeft: 16,
  },
  mt8: {
    marginTop: 8,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  overlay: {
    flex: 1,
    // position: 'absolute',
    left: 0,
    top: 0,
    //  opacity: 0.3,
    // backgroundColor: 'black',
  },
  wrapperCollapsibleList: {
    flex: 1,
    marginTop: 20,
    overflow: 'hidden',
    backgroundColor: '#FFF',
    borderRadius: 5,
  },
  collapsibleItem: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#CCC',
    padding: 10,
  },
  topAppBarPosition: {
    backgroundColor: 'transparent',
  },
  orderIdFlexBox: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  contentSpaceBlock: {
    paddingHorizontal: Padding.p_base,
    width: '100%',
  },
  iconLayout1: {
    height: 24,
    width: 24,
  },
  logoPosition: {
    color: Color.white,
    textAlign: 'center',
    marginBottom: 24,
  },
  tabFlexBox: {
    justifyContent: 'center',
    paddingVertical: Padding.p_xs,
    alignItems: 'center',
    paddingHorizontal: Padding.p_base,
    flexDirection: 'row',
  },
  nHngTypo: {
    fontFamily: FontFamily.robotoMedium,
    fontWeight: '600',
  },
  textLayout1: {
    lineHeight: 20,
    fontSize: FontSize.size_sm,
  },
  buttonFlexBox1: {
    paddingVertical: Padding.p_9xs,
    paddingHorizontal: Padding.p_5xs,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  textLayout: {
    lineHeight: 16,
    fontSize: FontSize.size_xs,
  },
  buttonFlexBox: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  nHngClr: {
    color: Color.mediumslateblue_200,
    textAlign: 'center',
  },
  buttonBorder1: {
    borderColor: '#ffcbbe',
    paddingVertical: Padding.p_5xs,
  },
  buttonBorder: {
    paddingVertical: Padding.p_5xs,
    borderWidth: 1,
    borderRadius: Border.br_9xs,
    justifyContent: 'center',
    borderStyle: 'solid',
    alignItems: 'center',
    paddingHorizontal: Padding.p_base,
    flexDirection: 'row',
  },
  productItem3Position: {
    zIndex: 2,
    flexDirection: 'row',
  },
  iconLayout: {
    height: '100%',
    width: '100%',
  },
  oderItemShadowBox: {
    padding: Padding.p_xs,
    borderRadius: Border.br_5xs,
    elevation: 4,
    shadowRadius: 12,

    shadowOpacity: 12,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowColor: 'rgba(0, 62, 207, 0.12)',
    backgroundColor: Color.white,
    alignSelf: 'stretch',
  },
  systemPosition: {
    left: 0,
    right: 0,
    position: 'absolute',
  },
  batteryPosition: {
    top: '50%',
    position: 'absolute',
  },
  backIcon: {
    zIndex: 0,
  },
  logo: {
    marginTop: 20,
    marginLeft: -79.5,
    fontSize: FontSize.size_xl,
    lineHeight: 40,
    fontWeight: '700',
    fontFamily: FontFamily.robotoBold,
    zIndex: 1,
    textAlign: 'center',
    left: '50%',
  },
  filterIconOverlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(113, 113, 113, 0.3)',
  },
  filterIconBg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0,
  },
  topAppBar: {
    zIndex: 10,

    // paddingBottom: //for ios
    // height: 100,
  },

  top20: {
    paddingTop: 20,
  },
  ttC520: {
    textAlign: 'left',
    color: Color.midnightblue_200,
  },
  tab: {
    // width: 125,
    backgroundColor: 'white',
  },
  tab1: {
    borderBottomWidth: 2,
    borderColor: '#003ecf',
    borderStyle: 'solid',
    justifyContent: 'center',
    paddingVertical: Padding.p_xs,
  },
  navTab: {
    top: 68, //for ios
    borderBottomWidth: 1,
    backgroundColor: 'white',
    borderColor: '#e6ebf1',
    borderStyle: 'solid',
    flexDirection: 'row',
    left: '0%',
    right: '0%',
    position: 'absolute',
    width: '100%',
    zIndex: 10,
  },
  navTabForIos: {
    top: 90,
  },
  bLc: {
    fontFamily: FontFamily.robotoRegular,
    color: Color.midnightblue_200,
    textAlign: 'center',
  },
  filterIcon1: {
    width: 16,
    height: 16,
  },
  filterButton: {
    display: 'none',
  },
  minhTrn: {
    color: Color.midnightblue_100,
    fontFamily: FontFamily.robotoRegular,
    textAlign: 'left',
  },
  person: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  status: {
    //color: Color.dodgerblue,
    fontFamily: FontFamily.robotoRegular,
    textAlign: 'center',
  },
  orderId: {
    alignSelf: 'stretch',
  },
  productChild: {
    width: 58,
    height: 58,
    borderRadius: Border.br_9xs,
    resizeMode: 'cover',
  },
  bnhInNg: {
    fontSize: FontSize.size_base,
    lineHeight: 24,
    color: Color.midnightblue_100,
    alignSelf: 'stretch',
    textAlign: 'left',
  },
  mSnPhm: {
    alignSelf: 'stretch',
    fontFamily: FontFamily.robotoRegular,
    textAlign: 'left',
    color: Color.midnightblue_200,
  },
  text2: {
    fontFamily: FontFamily.robotoRegular,
  },
  text: {
    color: Color.midnightblue_100,
    textAlign: 'center',
  },
  x3: {
    fontFamily: FontFamily.robotoRegular,
    color: Color.midnightblue_200,
    textAlign: 'center',
    // fontSize: 20,
  },
  price: {
    alignSelf: 'stretch',
    alignItems: 'center',
    flexDirection: 'row',
  },
  content1: {
    flex: 1,
  },
  product: {
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  text3: {
    fontFamily: FontFamily.robotoRegular,
  },
  total: {
    alignItems: 'baseline',
    alignSelf: 'stretch',
  },
  hyNHng: {
    color: Color.orangered,
    fontFamily: FontFamily.robotoRegular,
    textAlign: 'center',
  },
  xcNhnN: {
    fontFamily: FontFamily.robotoRegular,
  },
  button1: {
    borderColor: '#003ecf',
  },
  buttonAction: {
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  productItem1: {
    alignSelf: 'stretch',
    zIndex: 0,
    flexDirection: 'row',
  },
  productItem2: {
    alignSelf: 'stretch',
    zIndex: 1,
    flexDirection: 'row',
  },
  productItem3: {
    alignSelf: 'stretch',
  },
  groupChild: {
    top: '0%',
    bottom: '0%',
    zIndex: 3,
  },
  group: {
    height: 144,
    alignSelf: 'stretch',
    overflow: 'hidden',
  },
  moreButton: {
    backgroundColor: Color.white,
  },
  productList: {
    alignSelf: 'stretch',
    alignItems: 'flex-end',
  },
  status5: {
    color: Color.orange,
    fontFamily: FontFamily.robotoRegular,
    textAlign: 'center',
  },
  productList1: {
    alignSelf: 'stretch',
  },
  button10: {
    display: 'none',
  },
  buttonAction5: {
    width: 311,
    alignItems: 'center',
  },
  oderItem5: {
    display: 'none',
  },
  content: {
    // top: 134,
    paddingTop: 40,
    paddingBottom: 200,
    // alignItems: 'flex-end',

    paddingHorizontal: Padding.p_base,
    // height: 5000,

    // position: "absolute",
  },
  homeIconActive: {
    display: 'none',
  },
  trangCh: {
    color: Color.midnightblue_200,
    textAlign: 'center',
  },
  menuItem: {
    alignItems: 'center',
    flex: 1,
  },
  navigationBar: {
    marginLeft: -187.5,
    borderTopWidth: 1,
    width: 375,
    paddingTop: Padding.p_xs,
    paddingBottom: Padding.p_13xl,
    bottom: 0,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowColor: 'rgba(0, 62, 207, 0.12)',
    backgroundColor: Color.white,
    display: 'none',
    justifyContent: 'center',
    borderColor: '#e6ebf1',
    borderStyle: 'solid',
    left: '50%',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
  },
  homeIndicator: {
    marginLeft: -66.5,
    bottom: 8,
    borderRadius: Border.br_81xl,
    backgroundColor: Color.black,
    width: 134,
    height: 5,
    left: '50%',
    position: 'absolute',
  },
  systemLightHomeIndicato: {
    height: 34,
    bottom: 0,
  },
  time: {
    marginTop: -8,
    left: 21,
    fontSize: FontSize.size_mini,
    letterSpacing: 0,
    fontWeight: '600',
    fontFamily: FontFamily.sofiaSansSemiCondensed,
    width: 54,
    textAlign: 'center',
  },
  border: {
    marginTop: -5.67,
    right: 2,
    borderRadius: 3,
    borderColor: '#fff',
    width: 22,
    opacity: 0.35,
    height: 11,
    borderWidth: 1,
    borderStyle: 'solid',
    top: '50%',
    position: 'absolute',
  },
  capIcon: {
    marginTop: -2,
    width: 1,
    height: 4,
    opacity: 0.4,
    right: 0,
    top: '50%',
    position: 'absolute',
  },
  capacity: {
    marginTop: -3.67,
    right: 4,
    borderRadius: 1,
    width: 18,
    height: 7,
    backgroundColor: Color.white,
  },
  battery: {
    marginTop: -4.67,
    right: 14,
    height: 11,
    width: 24,
    top: '50%',
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
    top: 0,
    height: 44,
  },
  proccessingorder: {
    backgroundColor: Color.aliceblue_100,
    // height: 1246,
    overflow: 'hidden',
    width: '100%',
    flex: 1,
  },
});

export default ProccessingOrder;
export {statusRender};
