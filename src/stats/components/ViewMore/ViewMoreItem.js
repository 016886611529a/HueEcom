import React, {useState, useCallback, useRef, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Modal,
  ActivityIndicator,
  // TouchableOpacity,
} from 'react-native';

import Toast from 'react-native-toast-message';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import PopupFilter from '../PopupFilter';
import {
  Padding,
  Color,
  FontFamily,
  FontSize,
  Border,
} from '../../../GlobalStyles';
import RBSheet from 'react-native-raw-bottom-sheet';
import ButtonOrder from '../button/ButtonOrder';
// import {
//   changeStatusOrderAsync,
//   dataFilter,
//   dataOrder,
//   fetchOrderAsync,
//   filter,
//   selectedOrderDetail,
//   selectedStatus,
//   status,
//   valueOrderType,
// } from '../home/homeSlice';
import {useDispatch, useSelector} from 'react-redux';
import {BASEURL} from '../../data/mock/mock';
import Icon from 'react-native-vector-icons/AntDesign';
import CollapsibleList from 'react-native-collapsible-list';

export const ViewMoreItem = ({e}) => {
  const [isMore, setIMore] = useState(false);

  return (
    <CollapsibleList
      onToggle={() => {
        setIMore(!isMore);
      }}
      numberOfVisibleItems={e.ChiTietDon.length == 2 ? 3 : 2}
      wrapperStyle={styles.wrapperCollapsibleList}
      buttonContent={
        <View
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            flexDirection: 'row',
          }}>
          {isMore != true ? (
            <View>
              <Text style={styles.buttonText}>
                Xem thêm <Icon name="down" />
              </Text>
            </View>
          ) : (
            <View>
              <Text style={styles.buttonText}>
                Thu gọn <Icon name="up" />
              </Text>
            </View>
          )}
        </View>
      }>
      {e.ChiTietDon.map((item, index) => {
        var avatar =
          'https://peugeot.navigation.com/static/WFS/Shop-Site/-/Shop/en_US/Product%20Not%20Found.png';
        const AvatarWidget = (
          <Image
            style={styles.productChild}
            resizeMode="cover"
            source={require('../../assets/notfound_product.png')}
          />
        );
        var code = item.MaSanPham;
        var price = item.DonGia;
        var amount = '';
        if (item.SanPham != null) {
          avatar = `${BASEURL}${item.SanPham.Avatar}`;
          code = item.SanPham.MaSanPham;
          price = item.SanPham.DonGia;
          amount = item.SoLuong;
        }
        return (
          <View
            key={item.IdSanPham}
            style={[styles.product, styles.mt8, {marginBottom: 8}]}>
            <Image
              style={styles.productChild}
              resizeMode="cover"
              source={
                item.SanPham == null
                  ? require('../../assets/notfound_product.png')
                  : {uri: avatar}
              }
            />
            <View style={[styles.content1, styles.ml16]}>
              <Text style={[styles.bnhInNg, styles.nHngTypo]}>
                {item.TenSanPham}
              </Text>
              <Text
                style={[
                  styles.mSnPhm,
                  styles.mt4,
                  styles.textLayout,
                  {width: '80%'},
                ]}
                numberOfLines={1}>
                Mã sản phẩm: {code}
              </Text>
              <View style={[styles.price, styles.mt4]}>
                <Text style={styles.text}>
                  <Text style={[styles.nHngTypo, styles.textLayout1]}>
                    {price
                      .toLocaleString('it-IT', {
                        style: 'currency',
                        currency: 'VND',
                      })
                      .replace('VND', 'đ')}
                  </Text>
                </Text>
                <Text style={[styles.x3, styles.ml12, styles.textLayout]}>
                  x{amount}
                </Text>
              </View>
            </View>
          </View>
        );
      })}
    </CollapsibleList>
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
  wrapperCollapsibleList: {
    flex: 1,
    // marginTop: 8,
    overflow: 'hidden',
    // backgroundColor: 'red',
    borderRadius: 5,
  },
  collapsibleItem: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#CCC',
    padding: 10,
  },
  topAppBarPosition: {
    backgroundColor: 'transparent',
    left: '0%',
    right: '0%',
    position: 'absolute',
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
    // bottom: '50%',
    position: 'absolute',
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
    fontWeight: '500',
  },
  textLayout1: {
    lineHeight: 16,
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
    lineHeight: 20,
    fontSize: FontSize.size_xs,
    textAlignVertical: 'bottom',
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
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
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
  buttonText: {
    color: '#003ECF',
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
    height: 100,
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
    top: 68,
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

    textAlignVertical: 'bottom',
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
    paddingTop: 120,
    paddingBottom: 24,
    alignItems: 'flex-end',
    left: '0%',
    right: '0%',
    paddingHorizontal: Padding.p_base,
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
