import * as React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Pressable,
  Platform,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {Border, FontSize, Color, FontFamily, Padding} from '../../GlobalStyles';
import Icon from 'react-native-vector-icons/AntDesign';

const Notification1 = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.notification}>
      <LinearGradient
        style={[styles.topAppBar, styles.bgHeaderPosition]}
        locations={[0, 1]}
        colors={['#003ecf', '#550cb1']}
        useAngle={true}
        angle={70.26}>
        <TouchableOpacity
          // style={[styles.notificationsIcon]}

          onPress={() => {
            //console.log('press');
            navigation.goBack();
          }}>
          <Image
            style={[styles.notificationsIcon]}
            resizeMode="cover"
            source={require('../assets/backicon2.png')}
          />
        </TouchableOpacity>
        <Text
          style={[
            styles.logo,
            styles.logoPosition,
            styles.textTypo1,
            {textAlign: 'center'},
          ]}>
          Thông báo
        </Text>
      </LinearGradient>
      <View style={[styles.content, styles.headerPosition1]}>
        <ScrollView
          style={{marginTop: 20}}
          showsVerticalScrollIndicator={false}>
          <Pressable
            style={[styles.oderItemShadowBox, styles.mt8]}
            onPress={() => navigation.navigate('OrderDetail')}>
            <Text style={[styles.cNHngContainer, styles.htSenHuTypo]}>
              <Text style={styles.cNHng}>{'Có đơn hàng mới '}</Text>
              <Text style={styles.textTypo}>#384278744991168</Text>
              <Text style={styles.cNHng}>{' đã được đặt vào ngày '}</Text>
              <Text style={styles.textTypo}>30/11/2022 23:47:31</Text>
            </Text>
            <Text
              style={[
                styles.text5,
                styles.mt8,
                styles.x1Clr,
                styles.textTypo2,
              ]}>
              12/09/2022
            </Text>
          </Pressable>
          <View style={[styles.oderItemShadowBox, styles.mt8]}>
            <Text style={[styles.cNHngContainer, styles.htSenHuTypo]}>
              <Text style={styles.cNHng}>{'Có đơn hàng mới '}</Text>
              <Text style={styles.textTypo}>#1497131299</Text>
              <Text style={styles.cNHng}>{' đã được đặt vào ngày '}</Text>
              <Text style={styles.textTypo}>08/09/2022 22:07:25</Text>
            </Text>
            <Text
              style={[
                styles.text5,
                styles.mt8,
                styles.x1Clr,
                styles.textTypo2,
              ]}>
              08/09/2022
            </Text>
          </View>
          <View style={[styles.oderItemShadowBox, styles.mt8]}>
            <Text style={[styles.cNHngContainer, styles.htSenHuTypo]}>
              <Text style={styles.cNHng}>{'Có đơn hàng mới '}</Text>
              <Text style={styles.textTypo}>#16512224299</Text>
              <Text style={styles.cNHng}>{' đã được đặt vào ngày '}</Text>
              <Text style={styles.textTypo}>12/08/2022 22:07:25</Text>
            </Text>
            <Text
              style={[
                styles.text5,
                styles.mt8,
                styles.x1Clr,
                styles.textTypo2,
              ]}>
              12/08/2022
            </Text>
          </View>
          <View style={[styles.oderItemShadowBox, styles.mt8]}>
            <Text style={[styles.cNHngContainer, styles.htSenHuTypo]}>
              <Text style={styles.cNHng}>{'Có đơn hàng mới '}</Text>
              <Text style={styles.textTypo}>#14468224299</Text>
              <Text style={styles.cNHng}>{' đã được đặt vào ngày '}</Text>
              <Text style={styles.textTypo}>09/08/2022 09:07:25</Text>
            </Text>
            <Text
              style={[
                styles.text5,
                styles.mt8,
                styles.x1Clr,
                styles.textTypo2,
              ]}>
              09/08/2022
            </Text>
          </View>
          <View style={[styles.oderItemShadowBox, styles.mt8]}>
            <Text style={[styles.cNHngContainer, styles.htSenHuTypo]}>
              <Text style={styles.cNHng}>{'Có đơn hàng mới '}</Text>
              <Text style={styles.textTypo}>#16213224299</Text>
              <Text style={styles.cNHng}>{' đã được đặt vào ngày '}</Text>
              <Text style={styles.textTypo}>16/07/2022 22:07:25</Text>
            </Text>
            <Text
              style={[
                styles.text5,
                styles.mt8,
                styles.x1Clr,
                styles.textTypo2,
              ]}>
              16/07/2022
            </Text>
          </View>
          <View style={[styles.oderItemShadowBox, styles.mt8]}>
            <Text style={[styles.cNHngContainer, styles.htSenHuTypo]}>
              <Text style={styles.cNHng}>{'Có đơn hàng mới '}</Text>
              <Text style={styles.textTypo}>#14468224299</Text>
              <Text style={styles.cNHng}>{' đã được đặt vào ngày '}</Text>
              <Text style={styles.textTypo}>10/07/2022 22:07:25</Text>
            </Text>
            <Text
              style={[
                styles.text5,
                styles.mt8,
                styles.x1Clr,
                styles.textTypo2,
              ]}>
              10/07/2022
            </Text>
          </View>
          <View style={[styles.oderItemShadowBox, styles.mt8]}>
            <Text style={[styles.cNHngContainer, styles.htSenHuTypo]}>
              <Text style={styles.cNHng}>{'Có đơn hàng mới '}</Text>
              <Text style={styles.textTypo}>#14468224299</Text>
              <Text style={styles.cNHng}>{' đã được đặt vào ngày '}</Text>
              <Text style={styles.textTypo}>10/07/2022 22:07:25</Text>
            </Text>
            <Text
              style={[
                styles.text5,
                styles.mt8,
                styles.x1Clr,
                styles.textTypo2,
              ]}>
              10/07/2022
            </Text>
          </View>
          <View
            style={[styles.oderItem7, styles.mt8, styles.oderItemShadowBox]}>
            <View style={styles.acount}>
              <View style={styles.acount1}>
                <Image
                  style={styles.filterIcon}
                  resizeMode="cover"
                  source={require('../assets/personicon.png')}
                />
                <Text style={[styles.ngHngPhng, styles.ml4, styles.textTypo2]}>
                  Ngô Hồng Phương Linh
                </Text>
              </View>
              <Text style={[styles.status, styles.textTypo2]}>
                Đang vận chuyển
              </Text>
            </View>
            <View style={[styles.productList, styles.mt8]}>
              <View style={styles.productItem}>
                <Image
                  style={styles.productItemChild}
                  resizeMode="cover"
                  source={require('../assets/rectangle-2.png')}
                />
                <View style={[styles.group, styles.ml16]}>
                  <Text
                    style={[
                      styles.htSenHu,
                      styles.textTypo,
                      styles.htSenHuTypo,
                    ]}>
                    Hạt sen Huế sấy ăn liền
                  </Text>
                  <Text
                    style={[
                      styles.text5,
                      styles.mt4,
                      styles.x1Clr,
                      styles.textTypo2,
                    ]}>
                    Mã sản phẩm: 1746603586-164627...
                  </Text>
                  <View style={[styles.price, styles.mt4]}>
                    <Text style={styles.text24}>
                      <Text style={[styles.textTypo, styles.textLayout]}>
                        {'70.000 '}
                      </Text>
                      <Text style={[styles.text26, styles.textTypo2]}>đ</Text>
                    </Text>
                    <Text
                      style={[
                        styles.x1,
                        styles.ml12,
                        styles.x1Clr,
                        styles.textTypo2,
                      ]}>
                      x1
                    </Text>
                  </View>
                </View>
              </View>
              <View style={[styles.productItem, styles.mt8]}>
                <Image
                  style={styles.productItemChild}
                  resizeMode="cover"
                  source={require('../assets/rectangle-21.png')}
                />
                <View style={[styles.group, styles.ml16]}>
                  <Text
                    style={[
                      styles.htSenHu,
                      styles.textTypo,
                      styles.htSenHuTypo,
                    ]}>
                    Bánh sen chấy cuộn lò than hoa
                  </Text>
                  <Text
                    style={[
                      styles.text5,
                      styles.mt4,
                      styles.x1Clr,
                      styles.textTypo2,
                    ]}>
                    Mã sản phẩm: 8936193480157
                  </Text>
                  <View style={[styles.price, styles.mt4]}>
                    <Text style={styles.text24}>
                      <Text style={styles.textLayout}>{'54.000 '}</Text>
                      <Text style={[styles.text26, styles.textTypo2]}>đ</Text>
                    </Text>
                    <Text
                      style={[
                        styles.x1,
                        styles.ml12,
                        styles.x1Clr,
                        styles.textTypo2,
                      ]}>
                      x1
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={[styles.total2, styles.mt8, styles.total2FlexBox]}>
              <Text style={[styles.x1, styles.x1Clr, styles.textTypo2]}>
                Tổng đơn hàng:
              </Text>
              <Text style={[styles.inHaNTypo, styles.ml8]}>
                <Text style={styles.textLayout}>{'215.500 '}</Text>
                <Text style={[styles.text32, styles.textTypo2]}>đ</Text>
              </Text>
            </View>
            <View
              style={[styles.buttonAction, styles.mt8, styles.total2FlexBox]}>
              <View style={[styles.button, styles.buttonBorder]}>
                <Text style={[styles.hyNHng, styles.textLayout]}>
                  Hủy đơn hàng
                </Text>
              </View>
              <View style={[styles.button1, styles.ml8, styles.buttonBorder]}>
                <Text style={[styles.inHaNTypo, styles.textLayout]}>
                  In hóa đơn
                </Text>
              </View>
            </View>
          </View>
          <View
            style={[styles.oderItem7, styles.mt8, styles.oderItemShadowBox]}>
            <View style={styles.acount}>
              <View style={styles.acount1}>
                <Image
                  style={styles.filterIcon}
                  resizeMode="cover"
                  source={require('../assets/personicon.png')}
                />
                <Text style={[styles.ngHngPhng, styles.ml4, styles.textTypo2]}>
                  Thanh Trúc
                </Text>
              </View>
              <Text style={[styles.status, styles.textTypo2]}>
                Đang vận chuyển
              </Text>
            </View>
            <View style={[styles.productItem, styles.mt8]}>
              <Image
                style={styles.productItemChild}
                resizeMode="cover"
                source={require('../assets/rectangle-22.png')}
              />
              <View style={[styles.group, styles.ml16]}>
                <Text
                  style={[styles.htSenHu, styles.textTypo, styles.htSenHuTypo]}>
                  Trà vả gừng – Hộp 40g - 35 hộp/ thùng
                </Text>
                <Text
                  style={[
                    styles.text5,
                    styles.mt4,
                    styles.x1Clr,
                    styles.textTypo2,
                  ]}>
                  Mã sản phẩm: BDH65742
                </Text>
                <View style={[styles.price, styles.mt4]}>
                  <Text style={styles.text24}>
                    <Text style={styles.textLayout}>{'25.000 '}</Text>
                    <Text style={[styles.text26, styles.textTypo2]}>đ</Text>
                  </Text>
                  <Text
                    style={[
                      styles.x1,
                      styles.ml12,
                      styles.x1Clr,
                      styles.textTypo2,
                    ]}>
                    x2
                  </Text>
                </View>
              </View>
            </View>
            <View style={[styles.total2, styles.mt8, styles.total2FlexBox]}>
              <Text style={[styles.x1, styles.x1Clr, styles.textTypo2]}>
                Tổng đơn hàng:
              </Text>
              <Text style={[styles.inHaNTypo, styles.ml8]}>
                <Text style={styles.textLayout}>{'69.300 '}</Text>
                <Text style={[styles.text32, styles.textTypo2]}>đ</Text>
              </Text>
            </View>
            <View
              style={[styles.buttonAction, styles.mt8, styles.total2FlexBox]}>
              <View style={[styles.button, styles.buttonBorder]}>
                <Text style={[styles.hyNHng, styles.textLayout]}>
                  Hủy đơn hàng
                </Text>
              </View>
              <View style={[styles.button1, styles.ml8, styles.buttonBorder]}>
                <Text style={styles.textLayout}>In hóa đơn</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ml16: {
    marginLeft: 16,
  },
  ml4: {
    marginLeft: 4,
  },
  mt4: {
    marginTop: 4,
  },
  mt16: {
    marginTop: 16,
  },
  ml8: {
    marginLeft: 8,
  },
  mt8: {
    marginTop: 8,
  },
  ml12: {
    marginLeft: 12,
  },
  headerPosition: {
    borderBottomLeftRadius: Border.br_5xl,
    borderBottomRightRadius: Border.br_5xl,
  },
  headerPosition1: {
    left: '0%',
    right: '0%',
    // position: 'absolute',
    width: '100%',
  },
  bgHeaderPosition: {
    // backgroundColor: 'transparent',
    left: '0%',
    right: '0%',
    position: 'absolute',
    width: '100%',
  },
  textTypo2: {
    fontSize: FontSize.size_xs,
    lineHeight: 16,
  },
  borderBorder: {
    borderWidth: 1,
    borderStyle: 'solid',
  },
  textTypo1: {
    fontSize: FontSize.size_xl,
    textAlign: 'center',
    color: Color.white,
    fontFamily: FontFamily.robotoBold,
    fontWeight: '700',
  },
  iconLayout: {
    height: 36,
    width: 36,
    position: 'absolute',
  },
  logoPosition: {
    left: '55%',
    transform: [{translateX: -50}],
    position: 'absolute',
    bottom: 16,
  },
  x1Clr: {
    color: Color.midnightblue_200,
    fontFamily: FontFamily.robotoRegular,
  },
  textLayout: {
    lineHeight: 20,
    fontSize: FontSize.size_sm,
  },
  htSenHuTypo: {
    fontSize: FontSize.size_base,
    color: Color.midnightblue_100,
    textAlign: 'left',
    lineHeight: 24,
    alignSelf: 'stretch',
  },
  oderItemShadowBox: {
    padding: Padding.p_xs,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowColor: 'rgba(0, 62, 207, 0.12)',
    backgroundColor: Color.white,
    borderRadius: Border.br_5xs,
    alignSelf: 'stretch',
  },
  textTypo: {
    fontFamily: FontFamily.robotoMedium,
    fontWeight: '500',
  },
  total2FlexBox: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  buttonBorder: {
    paddingVertical: Padding.p_5xs,
    borderRadius: Border.br_9xs,
    justifyContent: 'center',
    paddingHorizontal: Padding.p_base,
    borderWidth: 1,
    borderStyle: 'solid',
    alignItems: 'center',
    flexDirection: 'row',
  },
  systemPosition: {
    left: 0,
    right: 0,
    position: 'absolute',
  },
  bgHeader: {
    top: '-0.44%',
    bottom: '0%',
  },
  avatarIcon: {
    borderRadius: Border.br_5xl,
    width: 40,
    height: 40,
  },
  title: {
    textAlign: 'left',
    color: Color.white,
    fontFamily: FontFamily.robotoBold,
    fontWeight: '700',
    lineHeight: 24,
    fontSize: FontSize.size_base,
    alignSelf: 'stretch',
  },
  subtitle: {
    fontFamily: FontFamily.robotoRegular,
    lineHeight: 16,
    textAlign: 'left',
    color: Color.white,
    alignSelf: 'stretch',
  },
  name: {
    width: 123,
  },
  acount1: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  notificationsIcon: {
    height: 24,
    zIndex: 1,
    width: 24,
    // width: 100,
    // backgroundColor: 'red',
  },
  noticeIconChild: {
    top: 12,
    left: 22,
    width: 8,
    zIndex: 1,
    height: 8,
    position: 'absolute',
  },
  noticeIcon: {
    borderColor: 'rgba(255, 255, 255, 0.4)',
    padding: Padding.p_5xs,
    borderRadius: Border.br_5xs,
    borderStyle: 'solid',
    flexDirection: 'row',
  },
  acount: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  label: {
    textAlign: 'center',
    fontFamily: FontFamily.robotoRegular,
    lineHeight: 16,
    color: Color.white,
  },
  text: {
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
  group: {
    flex: 1,
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
    // paddingHorizontal: Padding.p_base,
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  header1: {
    right: 16,
    bottom: 24,
    left: 16,
    position: 'absolute',
  },
  scheduleIcon: {
    top: 69,
    left: 344,
  },
  storefrontIcon: {
    top: 35,
    left: 240,
  },
  localMallIcon: {
    top: 73,
    left: 287,
  },
  monetizationOnIcon: {
    top: 29,
    left: 300,
  },
  header: {
    height: 228,
    display: 'none',
    top: 0,
    overflow: 'hidden',
  },
  icon: {
    height: 24,
    width: 24,
  },
  logo: {
    lineHeight: 22,
    zIndex: 1,
  },
  topAppBar: {
    // // height: 68,
    // display: 'flex',
    paddingHorizontal: Padding.p_base,
    // alignItems: 'center',
    // flexDirection: 'row',
    zIndex: 2,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingBottom: Platform.OS === 'ios' ? 16 : 20,
  },
  bLc: {
    textAlign: 'center',
  },
  filterIcon: {
    width: 16,
    height: 16,
  },
  filterButton: {
    paddingHorizontal: Padding.p_5xs,
    paddingVertical: Padding.p_9xs,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    display: 'none',
  },
  cNHng: {
    fontFamily: FontFamily.robotoRegular,
  },
  cNHngContainer: {
    color: Color.midnightblue_100,
    textAlign: 'left',
    lineHeight: 24,
  },
  text5: {
    lineHeight: 16,
    textAlign: 'left',
    alignSelf: 'stretch',
  },
  ngHngPhng: {
    color: Color.midnightblue_100,
    fontFamily: FontFamily.robotoRegular,
    lineHeight: 16,
    textAlign: 'left',
  },
  status: {
    color: Color.orange,
    textAlign: 'center',
    fontFamily: FontFamily.robotoRegular,
    lineHeight: 16,
  },
  productItemChild: {
    width: 58,
    height: 58,
    borderRadius: Border.br_9xs,
  },
  htSenHu: {
    color: Color.midnightblue_100,
    textAlign: 'left',
    lineHeight: 24,
  },
  text26: {
    fontFamily: FontFamily.robotoRegular,
    lineHeight: 16,
  },
  text24: {
    color: Color.midnightblue_100,
    textAlign: 'center',
  },
  x1: {
    textAlign: 'center',
    lineHeight: 16,
  },
  price: {
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  productItem: {
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  productList: {
    alignSelf: 'stretch',
  },
  text32: {
    lineHeight: 16,
  },
  inHaNTypo: {
    color: Color.mediumslateblue_200,
    textAlign: 'center',
    fontFamily: FontFamily.robotoRegular,
  },
  total2: {
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
    display: 'none',
  },
  button1: {
    borderColor: '#003ecf',
  },
  buttonAction: {
    width: 311,
    alignItems: 'center',
  },
  oderItem7: {
    display: 'none',
  },
  content: {
    top: 60,
    paddingTop: Padding.p_base,
    paddingBottom: Padding.p_5xl,
    // alignItems: 'flex-end',
    paddingHorizontal: 12,
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
    bottom: 0,
    height: 34,
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
    width: 22,
    opacity: 0.35,
    height: 11,
    top: '50%',
    position: 'absolute',
  },
  capIcon: {
    marginTop: -2,
    height: 4,
    opacity: 0.4,
    right: 0,
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
    top: 0,
  },
  notification: {
    backgroundColor: Color.aliceblue_100,
    height: 846,
    overflow: 'hidden',
    // width: '100%',
    flex: 1,
    //paddingBottom: 240,
  },
});

export default Notification1;
