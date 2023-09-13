import * as React from 'react';
import {
  Image,
  StyleSheet,
  Pressable,
  Text,
  View,
  Dimensions,
  Platform,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {Padding, Color, FontFamily, FontSize, Border} from '../../GlobalStyles';
import {useDispatch, useSelector} from 'react-redux';
import {
  changeStatusOrderAsync,
  dataSelectedOrder,
  fetchOrderAsync,
  statisticalFetch,
} from '../features/home/homeSlice';
import Moment from 'moment';
// import {statusRender} from '../features/orders/OrderPage';
import {BASEURL} from '../data/mock/mock';
import Dot from '../components/Dot';
import Icon from 'react-native-vector-icons/AntDesign';
import ButtonOrder from '../components/button/ButtonOrder';

const statusRender = (id, status = true) => {
  switch (id) {
    case 1:
      return (
        <View style={styles.itemFlexBox}>
          {status === true ? <Dot color={'#0084F2'} /> : <></>}
          <Text style={[styles.status, , {color: '#0084F2', marginLeft: 8}]}>
            Đang xử lý
          </Text>
        </View>
      );
    case 2:
      return (
        <View style={styles.itemFlexBox}>
          {status === true ? <Dot color={'#00123D'} /> : <></>}

          <Text
            style={[
              styles.status,
              styles.textLayout,
              {color: '#00123D', marginLeft: 8},
            ]}>
            Đã hủy
          </Text>
        </View>
      );
    case 3:
      return (
        <View style={styles.itemFlexBox}>
          {/* <Dot color={'#FFB330'} /> */}
          {status === true ? <Dot color={'#FFB330'} /> : <></>}
          <Text style={[styles.status, {color: '#FFB330', marginLeft: 8}]}>
            Đang vận chuyển
          </Text>
        </View>
      );
    case 4:
      return (
        <View style={styles.itemFlexBox}>
          {status === true ? <Dot color={'#00BE8D'} /> : <></>}
          {/* <Dot color={'#00BE8D'} /> */}
          <Text
            style={[
              styles.status,
              styles.textLayout,
              {color: '#00BE8D', marginLeft: 4},
            ]}>
            Đã giao hàng
          </Text>
        </View>
      );
    default:
      break;
  }
};

const screenWidth = Dimensions.get('window').width;
const OrderDetail = () => {
  const navigation = useNavigation();
  const data = useSelector(dataSelectedOrder);
  const [visible, setVisible] = React.useState(false);
  const [cancelVisible, setCancelVisible] = React.useState(false);
  const [selectItemId, setSelectedItemId] = React.useState(0);
  const dispatch = useDispatch();
  // console.log(data);
  const togglePopup = id => {
    setSelectedItemId(id);
    setVisible(!visible);
  };
  const togglePopupCancel = id => {
    setSelectedItemId(id);
    setCancelVisible(!cancelVisible);
  };
  const acceptOrderHandle = () => {
    dispatch(changeStatusOrderAsync(selectItemId));
    setVisible(false);
    dispatch(statisticalFetch());
  };
  const cancelOrderHandler = () => {
    dispatch(changeStatusOrderAsync(selectItemId, false));
    setCancelVisible(false);
    dispatch(statisticalFetch());
  };
  return (
    <View style={styles.orderdetail}>
      <LinearGradient
        style={[styles.topAppBar, styles.topAppBarSpaceBlock]}
        locations={[0, 1]}
        colors={['#003ecf', '#550cb1']}
        useAngle={true}
        angle={70.26}>
        <Pressable
          style={styles.backIcon}
          onPress={() => {
            navigation.navigate('ProcessingOrder');
          }}>
          <Image
            style={styles.icon}
            resizeMode="cover"
            source={require('../assets/backicon2.png')}
          />
        </Pressable>
        <Text style={[styles.logo, styles.ml8, styles.logoPosition]}>
          Chi tiết đơn hàng
        </Text>
      </LinearGradient>
      <ScrollView
        style={{position: 'relative'}}
        showsVerticalScrollIndicator={false}>
        <View style={[styles.inforSectionParent, styles.topAppBarSpaceBlock]}>
          <View style={styles.inforSection}>
            <View style={styles.title}>
              <Image
                style={styles.inforIcon}
                resizeMode="cover"
                source={require('../assets/inforicon.png')}
              />
              <Text
                style={[
                  styles.header,
                  styles.ml4,
                  styles.textTypo,
                  styles.headerTypo,
                ]}>
                Thông tin đơn hàng
              </Text>
            </View>
            <View style={[styles.content, styles.mt16]}>
              <View style={[styles.item, styles.itemFlexBox]}>
                <Text style={[styles.idNHng, styles.idNHngTypo]}>
                  ID đơn hàng:
                </Text>
                <Text
                  style={[styles.textClr, styles.textLayout, styles.textTypo]}>
                  {data.IdDonHang}
                </Text>
              </View>
              <View style={[styles.item, styles.mt8, styles.itemFlexBox]}>
                <Text style={[styles.idNHng, styles.idNHngTypo]}>
                  Ngày đặt hàng:
                </Text>
                <Text style={[styles.text1, styles.textLayout]}>
                  {Moment(data.NgayDatHang).format('DD/MM/yyyy HH:mm:ss')}
                </Text>
              </View>
              <View style={[styles.item, styles.mt8, styles.itemFlexBox]}>
                <Text style={[styles.idNHng, styles.idNHngTypo]}>
                  Gian hàng:
                </Text>
                <Text
                  style={[styles.cSnMc, styles.textLayout, styles.textTypo]}>
                  {data.TenGianHang}
                </Text>
              </View>
              <View style={[styles.item, styles.mt8, styles.itemFlexBox]}>
                <Text style={[styles.idNHng, styles.idNHngTypo]}>Tên sàn:</Text>
                <Text
                  style={[styles.cSnMc, styles.textLayout, styles.textTypo]}>
                  {data.TenSan}
                </Text>
              </View>
              <View style={[styles.item, styles.mt8, styles.itemFlexStart]}>
                {statusRender(data.IdTrangThai)}
              </View>
            </View>
          </View>
          <View style={[styles.inforSection, styles.mt8]}>
            <View style={styles.title}>
              <Image
                style={styles.inforIcon}
                resizeMode="cover"
                source={require('../assets/addressicon.png')}
              />
              <Text
                style={[
                  styles.header,
                  styles.ml4,
                  styles.textTypo,
                  styles.headerTypo,
                ]}>
                Thông tin người mua
              </Text>
            </View>
            <View style={[styles.content, styles.mt16]}>
              <View style={[styles.item, styles.itemFlexBox]}>
                <Text style={[styles.idNHng, styles.idNHngTypo]}>
                  Tên khách hàng:
                </Text>
                <Text
                  style={[
                    {
                      fontWeight: '400',
                      fontSize: 14,
                      textAlign: 'right',
                      color: '#003ECF',
                    },
                  ]}>
                  {data.TenKhachHang}
                </Text>
              </View>

              <View style={[styles.item, styles.mt8, styles.itemFlexBox]}>
                <Text style={[styles.idNHng, styles.idNHngTypo]}>
                  Số điện thoại:
                </Text>
                <Text style={[styles.text1, styles.textLayout]}>
                  {data.SoDienThoai}
                </Text>
              </View>
              <View style={[styles.content, styles.mt8]}>
                <Text style={[{textAlign: 'left'}, styles.idNHngTypo]}>
                  Địa chỉ giao hàng:
                </Text>
                <Text
                  style={[
                    styles.text1,
                    styles.mt4,
                    styles.textLayout,
                    {textAlign: 'left'},
                  ]}>
                  {data.DiaChi}
                </Text>
              </View>
              <View style={[styles.content, styles.mt8]}>
                <Text style={[styles.idNHng, styles.idNHngTypo]}>Ghi chú:</Text>
                <Text
                  style={[
                    styles.text1,
                    styles.mt4,
                    styles.textLayout,
                    {textAlign: 'left'},
                  ]}>
                  {data.note == null ? '(không có lời nhắn)' : data.note}
                </Text>
              </View>
            </View>
          </View>
          <View style={[styles.inforSection, styles.mt8]}>
            <View style={styles.title}>
              <Image
                style={styles.inforIcon}
                resizeMode="cover"
                source={require('../assets/producticon.png')}
              />
              <Text
                style={[
                  styles.header,
                  styles.ml4,
                  styles.textTypo,
                  styles.headerTypo,
                ]}>
                Thông tin sản phẩm
              </Text>
            </View>
            <View style={[styles.content, styles.mt16]}>
              {data.ChiTietDon.map((item, index) => {
                var avatar = '';
                var code = data.MaSanPham;
                var price = data.DonGia ?? '';
                var amount = data.SoLuong;
                var name = data.TenSanPham;
                if (item.SanPham != null) {
                  avatar = item.SanPham.Avatar;
                  code = item.SanPham.MaSanPham;
                  price = item.SanPham.DonGia;
                  amount = item.SoLuong;
                  name = item.SanPham.TenSanPham;
                  return (
                    <View key={item.IdSanPham}>
                      <View style={styles.product}>
                        <Image
                          style={styles.productChild}
                          resizeMode="cover"
                          source={{
                            uri: BASEURL + avatar,
                          }}
                        />
                        <View style={[styles.content3, styles.ml16]}>
                          <Text
                            style={[
                              styles.bnhInNg,
                              styles.textTypo,
                              styles.headerTypo,
                            ]}>
                            {name}
                          </Text>
                          <Text
                            style={[
                              styles.mSnPhm,
                              styles.mt4,
                              styles.idNHngTypo,
                            ]}>
                            {item.SanPham == null
                              ? ''
                              : ` Mã sản phẩm: ${code}`}
                          </Text>
                          <View style={[styles.title, styles.mt4]}>
                            <Text style={styles.text4}>
                              <Text
                                style={[styles.textLayout, styles.textTypo]}>
                                {price
                                  .toLocaleString('it-IT', {
                                    style: 'currency',
                                    currency: 'VND',
                                  })
                                  .replace('VND', 'đ')}
                              </Text>
                            </Text>
                            {item.SanPham != null ? (
                              <Text
                                style={[
                                  styles.idNHng,
                                  styles.ml12,
                                  styles.idNHngTypo,
                                ]}>
                                x{item.SoLuong}
                              </Text>
                            ) : (
                              <></>
                            )}
                          </View>
                        </View>
                      </View>
                    </View>
                  );
                }
                return <></>;
              })}
              <View style={[styles.total, styles.mt8, styles.buttonFlexBox]}>
                <Text style={[styles.idNHng, styles.idNHngTypo]}>
                  Tổng đơn hàng:
                </Text>
                <Text style={[styles.text7, styles.ml8, styles.textClr]}>
                  <Text style={styles.textLayout}>
                    {data.TongTienHang.toLocaleString('it-IT', {
                      style: 'currency',
                      currency: 'VND',
                    }).replace('VND', 'đ')}
                  </Text>
                </Text>
              </View>
              {data.IdTrangThai === 1 ? (
                <View
                  style={[
                    styles.buttonAction1,
                    styles.mt8,
                    styles.buttonFlexBox,
                  ]}>
                  <TouchableOpacity
                    onPress={() => {
                      togglePopupCancel(data.IdDonHang);
                    }}>
                    <ButtonOrder
                      type={'secondary-outline'}
                      text="Huỷ đơn hàng"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      togglePopup(data.IdDonHang);
                    }}>
                    <ButtonOrder type={'primary'} text="Xác nhận đơn" />
                  </TouchableOpacity>
                </View>
              ) : (
                <></>
              )}
            </View>
          </View>
          <View style={[styles.inforSection, styles.mt8]}>
            <View style={styles.title}>
              <Image
                style={styles.inforIcon}
                resizeMode="cover"
                source={require('../assets/shippingicon.png')}
              />
              <Text
                style={[
                  styles.header,
                  styles.ml4,
                  styles.textTypo,
                  styles.headerTypo,
                ]}>
                Thông tin vận chuyển
              </Text>
            </View>
            <View style={[styles.content, styles.mt16]}>
              <View style={[styles.item, styles.itemFlexBox]}>
                <Text style={[styles.idNHng, styles.idNHngTypo]}>
                  Mã vận chuyển:
                </Text>
                <Text
                  style={[
                    styles.textTypo,
                    {fontWeight: '500', color: '#003ECF'},
                  ]}>
                  GHN1251271
                </Text>
              </View>
              <View style={[styles.item, styles.mt8, styles.itemFlexBox]}>
                <Text style={[styles.idNHng, styles.idNHngTypo]}>
                  Đơn vị vận chuyển:
                </Text>
                <Text style={[{fontWeight: '400', color: '#003ECF'}]}>
                  Giao hàng nhanh
                </Text>
              </View>
              <View style={[styles.item, styles.mt8, styles.itemFlexBox]}>
                <Text style={[styles.idNHng, styles.idNHngTypo]}>
                  Tổng khối lượng:
                </Text>
                <Text style={[styles.text1, styles.textLayout]}>10,00 kg</Text>
              </View>
              <View style={[styles.item, styles.mt8, styles.itemFlexBox]}>
                <Text style={[styles.idNHng, styles.idNHngTypo]}>
                  Trạng thái vận chuyển:
                </Text>
                <View style={styles.status2}>
                  {/* <Image
                    style={styles.statusChild}
                    resizeMode="cover"
                    source={require("../assets/ellipse-2.png")}
                  /> */}
                  {statusRender(data.IdTrangThai, true)}
                </View>
              </View>
            </View>
          </View>
          <View style={[styles.inforSection, styles.mt8]}>
            <View style={styles.title}>
              <Image
                style={styles.inforIcon}
                resizeMode="contain"
                source={require('../assets/cash-icon.png')}
              />
              <Text
                style={[
                  styles.header,
                  styles.ml4,
                  styles.textTypo,
                  styles.headerTypo,
                ]}>
                Thông tin thanh toán
              </Text>
            </View>
            <View style={[styles.content, styles.mt16]}>
              <View style={[styles.itemFlexBox, styles.mt8]}>
                <Text style={[styles.idNHng, styles.idNHngTypo]}>
                  Phương thức thanh toán:
                </Text>
                <Text style={[styles.cod, styles.textClr, styles.textLayout]}>
                  COD
                </Text>
              </View>
              <View style={[styles.item, styles.mt8, styles.itemFlexBox]}>
                <Text style={[styles.idNHng, styles.idNHngTypo]}>
                  Tổng tiền hàng:
                </Text>
                <Text
                  style={[styles.cSnMc, styles.textLayout, styles.textTypo]}>
                  {data.TongTienHang.toLocaleString('it-IT', {
                    style: 'currency',
                    currency: 'VND',
                  }).replace('VND', 'đ')}
                </Text>
              </View>
              <View style={[styles.item, styles.mt8, styles.itemFlexBox]}>
                <Text style={[styles.idNHng, styles.idNHngTypo]}>
                  Phí vận chuyển:
                </Text>
                <Text style={[styles.text1, styles.textLayout]}>
                  {data.PhiVanChuyen.toLocaleString('it-IT', {
                    style: 'currency',
                    currency: 'VND',
                  }).replace('VND', 'đ')}
                </Text>
              </View>
              <View style={[styles.item, styles.mt8, styles.itemFlexBox]}>
                <Text style={[styles.idNHng, styles.idNHngTypo]}>
                  Giá khách trả:
                </Text>
                <Text style={[styles.text1, styles.textLayout]}>
                  {data.TienKhachTra.toLocaleString('it-IT', {
                    style: 'currency',
                    currency: 'VND',
                  }).replace('VND', 'đ')}
                </Text>
              </View>
              <View style={[styles.item, styles.mt8, styles.itemFlexBox]}>
                <Text style={[styles.idNHng, styles.idNHngTypo]}>
                  Tiền shop nhận:
                </Text>
                <Text style={[styles.text1, styles.textLayout]}>
                  {data.TienShopNhan.toLocaleString('it-IT', {
                    style: 'currency',
                    currency: 'VND',
                  }).replace('VND', 'đ')}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
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
        <Modal visible={cancelVisible} animationType="fade" transparent={true}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  ml8: {
    marginLeft: 8,
  },
  ml4: {
    marginLeft: 4,
  },
  mt8: {
    marginTop: 8,
  },
  mt16: {
    marginTop: 16,
  },
  mt4: {
    marginTop: 4,
  },
  ml12: {
    marginLeft: 12,
  },
  ml16: {
    marginLeft: 16,
  },
  topAppBarSpaceBlock: {
    zIndex: 10,
    paddingHorizontal: Padding.p_base,
  },
  logoPosition: {
    color: Color.white,
    textAlign: 'center',
    left: 0,
    right: 0,
    position: 'absolute',
    bottom: 10,
  },
  textTypo: {
    fontFamily: FontFamily.robotoMedium,
    fontWeight: '500',
  },
  headerTypo: {
    lineHeight: 24,
    fontSize: FontSize.size_base,
    textAlign: 'left',
    color: Color.midnightblue_100,
    fontWeight: '500',
  },
  itemFlexStart: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  itemFlexBox: {
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
  },
  idNHngTypo: {
    color: Color.midnightblue_200,
    fontFamily: FontFamily.robotoRegular,
    lineHeight: 16,
    fontSize: FontSize.size_xs,
    fontWeight: '400',
  },
  textLayout: {
    lineHeight: 20,
    fontSize: FontSize.size_sm,
    fontWeight: '400',
  },
  status: {
    //color: Color.dodgerblue,
    fontFamily: FontFamily.robotoRegular,
    textAlign: 'center',
    lineHeight: 16,
    fontSize: FontSize.size_xs,
  },
  textClr: {
    color: Color.mediumslateblue_200,
    textAlign: 'center',
    fontWeight: '700',
  },
  textLayout1: {
    lineHeight: 16,
    fontSize: FontSize.size_xs,
  },
  item3FlexBox: {
    display: 'none',
    alignItems: 'center',
  },
  buttonBorder1: {
    justifyContent: 'center',
    paddingVertical: Padding.p_5xs,
    borderColor: '#003ecf',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: Border.br_9xs,
    alignItems: 'center',
    paddingHorizontal: Padding.p_base,
    flexDirection: 'row',
  },
  buttonBorder: {
    borderColor: '#ffcbbe',
    justifyContent: 'center',
    paddingVertical: Padding.p_5xs,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: Border.br_9xs,
    alignItems: 'center',
    paddingHorizontal: Padding.p_base,
    flexDirection: 'row',
  },
  buttonFlexBox: {
    justifyContent: 'flex-end',
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  systemPosition: {
    right: 0,
    position: 'absolute',
  },
  icon: {
    height: '100%',
    width: '100%',
  },
  backIcon: {
    height: 24,
    zIndex: 10,
    width: 24,
  },
  logo: {
    //  marginTop: 11.5,
    // marginLeft: -77.5,
    fontSize: FontSize.size_xl,
    lineHeight: 40,
    fontWeight: '700',
    fontFamily: FontFamily.robotoBold,
    zIndex: 1,
    textAlign: 'center',
    left: '50%',
  },
  topAppBar: {
    // height: 100,
    // paddingTop: 30,
    // paddingBottom: 30,
    // backgroundColor: 'transparent',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    paddingTop: Platform.OS == 'ios' ? 50 : 20,
    paddingBottom: Platform.OS == 'ios' ? 16 : 20,
  },
  inforIcon: {
    width: 16,
    height: 16,
  },
  header: {
    textAlign: 'left',
    color: Color.midnightblue_100,
    flex: 1,
  },
  title: {
    alignSelf: 'stretch',
    alignItems: 'center',
    flexDirection: 'row',
  },
  idNHng: {
    textAlign: 'left',
  },
  item: {
    alignItems: 'center',
  },
  text1: {
    fontFamily: FontFamily.robotoRegular,
    color: Color.midnightblue_100,
    textAlign: 'center',
  },
  cSnMc: {
    color: Color.midnightblue_100,
    textAlign: 'center',
  },
  angXLTypo: {
    color: Color.dodgerblue,
    fontFamily: FontFamily.robotoRegular,
    textAlign: 'center',
  },
  cod: {
    fontFamily: FontFamily.robotoRegular,
  },
  statusChild: {
    width: 8,
    height: 8,
  },
  content: {
    alignSelf: 'stretch',
  },
  button: {
    flex: 1,
  },
  hyNHng: {
    color: Color.orangered,
    fontFamily: FontFamily.robotoRegular,
    textAlign: 'center',
  },
  button1: {
    flex: 1,
  },
  inforSection: {
    borderRadius: Border.br_5xs,
    shadowColor: 'rgba(0, 62, 207, 0.12)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 8,
    elevation: 8,
    shadowOpacity: 1,
    padding: Padding.p_xs,
    backgroundColor: Color.white,
    alignSelf: 'stretch',
  },
  productChild: {
    width: 58,
    height: 58,
    borderRadius: Border.br_9xs,
  },
  bnhInNg: {
    textAlign: 'left',
    color: Color.midnightblue_100,
    alignSelf: 'stretch',
  },
  mSnPhm: {
    textAlign: 'left',
    alignSelf: 'stretch',
  },
  text6: {
    fontFamily: FontFamily.robotoRegular,
  },
  text4: {
    color: Color.midnightblue_100,
    textAlign: 'center',
  },
  content3: {
    flex: 1,
  },
  product: {
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  text7: {
    fontFamily: FontFamily.robotoRegular,
  },
  total: {
    alignItems: 'baseline',
  },
  buttonAction1: {
    alignItems: 'center',
  },
  status2: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  inforSectionParent: {
    width: screenWidth,
    paddingTop: Padding.p_base,
    paddingBottom: Padding.p_5xl,
    left: 0,
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
    bottom: 0,
    height: 34,
    left: 0,
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
    top: '50%',
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
    top: 0,
    height: 44,
    left: 0,
  },
  orderdetail: {
    backgroundColor: Color.aliceblue_100,
    // height: 1098,
    overflow: 'hidden',

    flex: 1,
  },
});

export default OrderDetail;
