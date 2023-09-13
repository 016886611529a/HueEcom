import * as React from 'react';
import {Image, StyleSheet, Pressable, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {Color, Padding, FontFamily, FontSize, Border} from '../../GlobalStyles';

const Result = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.result}>
      <LinearGradient
        style={[styles.topAppBar, styles.topAppBarPosition]}
        locations={[0, 1]}
        colors={['#003ecf', '#550cb1']}
        useAngle={true}
        angle={70.26}>
        <Pressable
          style={[styles.backIcon, styles.iconLayout1]}
          // onPress={() => navigation.navigate("AllOrder")}
        >
          <Image
            style={styles.iconLayout}
            resizeMode="cover"
            source={require('../assets/backicon1.png')}
          />
        </Pressable>
        <Text style={[styles.logo, styles.ml8, styles.logoPosition]}>
          Tìm kiếm đơn hàng
        </Text>
      </LinearGradient>
      <View
        style={[
          styles.topAppBar1,
          styles.labelSpaceBlock,
          styles.oderItemBorder,
          styles.barPosition,
        ]}>
        <View style={styles.searchBar}>
          <Image
            style={[styles.search1Icon, styles.iconLayout1]}
            resizeMode="cover"
            source={require('../assets/search-1.png')}
          />
          <Text style={[styles.bnh, styles.ml8]}>bánh</Text>
        </View>
        <Pressable
          style={[styles.button, styles.ml16, styles.buttonFlexBox2]}
          // onPress={() => navigation.navigate("AllOrder")}
        >
          <Text style={[styles.hy, styles.hyTypo, styles.labelLayout]}>
            Hủy
          </Text>
        </Pressable>
      </View>
      <View style={[styles.labelResultParent, styles.barPosition]}>
        <View style={[styles.labelResult, styles.labelSpaceBlock]}>
          <Text style={[styles.labelSearchResult, styles.labelLayout]}>
            Đơn hàng tìm thấy với từ “bánh”
          </Text>
        </View>
        <View style={styles.content}>
          <View style={[styles.filterButton, styles.buttonFlexBox1]}>
            <Text style={[styles.bLc, styles.x3Clr, styles.textTypo]}>
              Bộ lọc
            </Text>
            <Image
              style={[styles.filterIcon, styles.ml4]}
              resizeMode="cover"
              source={require('../assets/filtericon.png')}
            />
          </View>
          <Pressable
            style={[styles.oderItem, styles.mt8, styles.oderItemBorder]}
            onPress={() => navigation.navigate('OrderDetail')}>
            <View style={styles.orderId}>
              <View style={styles.person}>
                <Image
                  style={styles.filterIcon}
                  resizeMode="cover"
                  source={require('../assets/personicon.png')}
                />
                <Text style={[styles.minhTrn, styles.ml4, styles.textLayout]}>
                  Minh Trần
                </Text>
              </View>
              <Text style={[styles.status, styles.textLayout]}>Đang xử lý</Text>
            </View>
            <View style={[styles.product, styles.mt8]}>
              <Image
                style={styles.productChild}
                resizeMode="cover"
                source={require('../assets/rectangle-23.png')}
              />
              <View style={[styles.content1, styles.ml16]}>
                <Text
                  style={[styles.bnhInNg, styles.hyTypo, styles.labelLayout]}>
                  Bánh in ngũ sắc đặc sản tiến Vua
                </Text>
                <Text
                  style={[
                    styles.mSnPhm,
                    styles.mt4,
                    styles.textLayout,
                    styles.x3Clr,
                  ]}>
                  Mã sản phẩm: 1746603586-164627...
                </Text>
                <View style={[styles.price, styles.mt4]}>
                  <Text style={styles.text}>
                    <Text
                      style={[
                        styles.textTypo,
                        styles.hyTypo,
                      ]}>{`115.000 `}</Text>
                    <Text style={[styles.text2, styles.textLayout]}>đ</Text>
                  </Text>
                  <Text
                    style={[
                      styles.x3,
                      styles.ml12,
                      styles.textLayout,
                      styles.x3Clr,
                    ]}>
                    x3
                  </Text>
                </View>
              </View>
            </View>
            <View style={[styles.total, styles.mt8, styles.buttonFlexBox]}>
              <Text style={[styles.x3, styles.textLayout, styles.x3Clr]}>
                Tổng đơn hàng:
              </Text>
              <Text style={[styles.text3, styles.ml8]}>
                <Text style={styles.textTypo}>{`467.800 `}</Text>
                <Text style={styles.textLayout}>đ</Text>
              </Text>
            </View>
            <View
              style={[styles.buttonAction, styles.mt8, styles.buttonFlexBox]}>
              <View style={[styles.buttonBorder, styles.buttonBorder1]}>
                <Text style={[styles.hyNHng, styles.textTypo]}>
                  Hủy đơn hàng
                </Text>
              </View>
              <View
                style={[
                  styles.button2,
                  styles.ml8,
                  styles.buttonBorder,
                  styles.buttonFlexBox2,
                  styles.labelSpaceBlock,
                ]}>
                <Text style={[styles.xcNhnN, styles.textTypo]}>
                  Xác nhận đơn
                </Text>
              </View>
            </View>
          </Pressable>
          <View style={[styles.oderItem, styles.mt8, styles.oderItemBorder]}>
            <View style={styles.orderId}>
              <View style={styles.person}>
                <Image
                  style={styles.filterIcon}
                  resizeMode="cover"
                  source={require('../assets/personicon.png')}
                />
                <Text style={[styles.minhTrn, styles.ml4, styles.textLayout]}>
                  Trâm Trâm
                </Text>
              </View>
              <Text style={[styles.status, styles.textLayout]}>Đang xử lý</Text>
            </View>
            <View style={[styles.productList, styles.mt8]}>
              <View style={styles.group}>
                <View style={styles.productItem}>
                  <Image
                    style={styles.productChild}
                    resizeMode="cover"
                    source={require('../assets/rectangle-2.png')}
                  />
                  <View style={[styles.content1, styles.ml16]}>
                    <Text
                      style={[
                        styles.bnhInNg,
                        styles.hyTypo,
                        styles.labelLayout,
                      ]}>
                      Hạt sen Huế sấy ăn liền
                    </Text>
                    <Text
                      style={[
                        styles.mSnPhm,
                        styles.mt4,
                        styles.textLayout,
                        styles.x3Clr,
                      ]}>
                      Mã sản phẩm: 1746603586-164627...
                    </Text>
                    <View style={[styles.price, styles.mt4]}>
                      <Text style={styles.text}>
                        <Text style={styles.hyTypo}>{`70.000 `}</Text>
                        <Text style={[styles.text2, styles.textLayout]}>đ</Text>
                      </Text>
                      <Text
                        style={[
                          styles.x3,
                          styles.ml12,
                          styles.textLayout,
                          styles.x3Clr,
                        ]}>
                        x1
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={[styles.productItem1, styles.mt8]}>
                  <Image
                    style={styles.productChild}
                    resizeMode="cover"
                    source={require('../assets/rectangle-21.png')}
                  />
                  <View style={[styles.content1, styles.ml16]}>
                    <Text
                      style={[
                        styles.bnhInNg,
                        styles.hyTypo,
                        styles.labelLayout,
                      ]}>
                      Bánh sen chấy cuộn lò than hoa
                    </Text>
                    <Text
                      style={[
                        styles.mSnPhm,
                        styles.mt4,
                        styles.textLayout,
                        styles.x3Clr,
                      ]}>
                      Mã sản phẩm: 8936193480157
                    </Text>
                    <View style={[styles.price, styles.mt4]}>
                      <Text style={styles.text}>
                        <Text style={styles.hyTypo}>{`54.000 `}</Text>
                        <Text style={[styles.text2, styles.textLayout]}>đ</Text>
                      </Text>
                      <Text
                        style={[
                          styles.x3,
                          styles.ml12,
                          styles.textLayout,
                          styles.x3Clr,
                        ]}>
                        x1
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={[styles.productItem2, styles.mt8]}>
                  <Image
                    style={styles.productChild}
                    resizeMode="cover"
                    source={require('../assets/rectangle-24.png')}
                  />
                  <View style={[styles.content1, styles.ml16]}>
                    <Text
                      style={[
                        styles.bnhInNg,
                        styles.hyTypo,
                        styles.labelLayout,
                      ]}>
                      Bánh ép Huế tôm rào giòn rụm, đậm vị 5 bánh
                    </Text>
                    <Text
                      style={[
                        styles.mSnPhm,
                        styles.mt4,
                        styles.textLayout,
                        styles.x3Clr,
                      ]}>
                      Mã sản phẩm: 8936193480157
                    </Text>
                    <View style={[styles.price, styles.mt4]}>
                      <Text style={styles.text}>
                        <Text style={styles.hyTypo}>{`62.000 `}</Text>
                        <Text style={[styles.text2, styles.textLayout]}>đ</Text>
                      </Text>
                      <Text
                        style={[
                          styles.x3,
                          styles.ml12,
                          styles.textLayout,
                          styles.x3Clr,
                        ]}>
                        x1
                      </Text>
                    </View>
                  </View>
                </View>
                <LinearGradient
                  style={[
                    styles.groupChild,
                    styles.mt8,
                    styles.iconLayout,
                    styles.topAppBarPosition,
                  ]}
                  locations={[0, 1]}
                  colors={['rgba(255, 255, 255, 0)', '#fff']}
                  useAngle={true}
                  angle={180}
                />
              </View>
              <View style={[styles.moreButton, styles.buttonFlexBox1]}>
                <Text style={[styles.xcNhnN, styles.textTypo]}>Xem thêm</Text>
                <Image
                  style={[styles.filterIcon, styles.ml4]}
                  resizeMode="cover"
                  source={require('../assets/expandmoreicon.png')}
                />
              </View>
            </View>
            <View style={[styles.total, styles.mt8, styles.buttonFlexBox]}>
              <Text style={[styles.x3, styles.textLayout, styles.x3Clr]}>
                Tổng đơn hàng:
              </Text>
              <Text style={[styles.text3, styles.ml8]}>
                <Text style={styles.textTypo}>{`215.500 `}</Text>
                <Text style={styles.textLayout}>đ</Text>
              </Text>
            </View>
            <View
              style={[styles.buttonAction, styles.mt8, styles.buttonFlexBox]}>
              <View style={styles.buttonBorder1}>
                <Text style={[styles.hyNHng, styles.textTypo]}>
                  Hủy đơn hàng
                </Text>
              </View>
              <View
                style={[
                  styles.button2,
                  styles.ml8,
                  styles.buttonBorder,
                  styles.buttonFlexBox2,
                  styles.labelSpaceBlock,
                ]}>
                <Text style={[styles.xcNhnN, styles.textTypo]}>
                  Xác nhận đơn
                </Text>
              </View>
            </View>
          </View>
          <View style={[styles.oderItem2, styles.mt8]}>
            <View style={styles.orderId}>
              <View style={styles.person}>
                <Image
                  style={styles.filterIcon}
                  resizeMode="cover"
                  source={require('../assets/personicon.png')}
                />
                <Text style={[styles.minhTrn, styles.ml4, styles.textLayout]}>
                  Ngô Hồng Phương Linh
                </Text>
              </View>
              <Text style={[styles.status2, styles.textLayout]}>
                Đang vận chuyển
              </Text>
            </View>
            <View style={[styles.productList1, styles.mt8]}>
              <View style={styles.product}>
                <Image
                  style={styles.productChild}
                  resizeMode="cover"
                  source={require('../assets/rectangle-2.png')}
                />
                <View style={[styles.content1, styles.ml16]}>
                  <Text
                    style={[styles.bnhInNg, styles.hyTypo, styles.labelLayout]}>
                    Hạt sen Huế sấy ăn liền
                  </Text>
                  <Text
                    style={[
                      styles.mSnPhm,
                      styles.mt4,
                      styles.textLayout,
                      styles.x3Clr,
                    ]}>
                    Mã sản phẩm: 1746603586-164627...
                  </Text>
                  <View style={[styles.price, styles.mt4]}>
                    <Text style={styles.text}>
                      <Text style={styles.hyTypo}>{`70.000 `}</Text>
                      <Text style={[styles.text2, styles.textLayout]}>đ</Text>
                    </Text>
                    <Text
                      style={[
                        styles.x3,
                        styles.ml12,
                        styles.textLayout,
                        styles.x3Clr,
                      ]}>
                      x1
                    </Text>
                  </View>
                </View>
              </View>
              <View style={[styles.product, styles.mt8]}>
                <Image
                  style={styles.productChild}
                  resizeMode="cover"
                  source={require('../assets/rectangle-21.png')}
                />
                <View style={[styles.content1, styles.ml16]}>
                  <Text
                    style={[styles.bnhInNg, styles.hyTypo, styles.labelLayout]}>
                    Bánh sen chấy cuộn lò than hoa
                  </Text>
                  <Text
                    style={[
                      styles.mSnPhm,
                      styles.mt4,
                      styles.textLayout,
                      styles.x3Clr,
                    ]}>
                    Mã sản phẩm: 8936193480157
                  </Text>
                  <View style={[styles.price, styles.mt4]}>
                    <Text style={styles.text}>
                      <Text style={styles.hyTypo}>{`54.000 `}</Text>
                      <Text style={[styles.text2, styles.textLayout]}>đ</Text>
                    </Text>
                    <Text
                      style={[
                        styles.x3,
                        styles.ml12,
                        styles.textLayout,
                        styles.x3Clr,
                      ]}>
                      x1
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={[styles.total, styles.mt8, styles.buttonFlexBox]}>
              <Text style={[styles.x3, styles.textLayout, styles.x3Clr]}>
                Tổng đơn hàng:
              </Text>
              <Text style={[styles.text3, styles.ml8]}>
                <Text style={styles.textTypo}>{`215.500 `}</Text>
                <Text style={styles.textLayout}>đ</Text>
              </Text>
            </View>
            <View
              style={[styles.buttonAction2, styles.mt8, styles.buttonFlexBox]}>
              <View
                style={[
                  styles.button5,
                  styles.buttonBorder,
                  styles.buttonBorder1,
                ]}>
                <Text style={[styles.hyNHng, styles.textTypo]}>
                  Hủy đơn hàng
                </Text>
              </View>
              <View
                style={[
                  styles.button2,
                  styles.ml8,
                  styles.buttonBorder,
                  styles.buttonFlexBox2,
                  styles.labelSpaceBlock,
                ]}>
                <Text style={[styles.xcNhnN, styles.textTypo]}>In hóa đơn</Text>
              </View>
            </View>
          </View>
          <View style={[styles.oderItem2, styles.mt8]}>
            <View style={styles.orderId}>
              <View style={styles.person}>
                <Image
                  style={styles.filterIcon}
                  resizeMode="cover"
                  source={require('../assets/personicon.png')}
                />
                <Text style={[styles.minhTrn, styles.ml4, styles.textLayout]}>
                  Thanh Trúc
                </Text>
              </View>
              <Text style={[styles.status2, styles.textLayout]}>
                Đang vận chuyển
              </Text>
            </View>
            <View style={[styles.product, styles.mt8]}>
              <Image
                style={styles.productChild}
                resizeMode="cover"
                source={require('../assets/rectangle-22.png')}
              />
              <View style={[styles.content1, styles.ml16]}>
                <Text
                  style={[styles.bnhInNg, styles.hyTypo, styles.labelLayout]}>
                  Trà vả gừng – Hộp 40g - 35 hộp/ thùng
                </Text>
                <Text
                  style={[
                    styles.mSnPhm,
                    styles.mt4,
                    styles.textLayout,
                    styles.x3Clr,
                  ]}>
                  Mã sản phẩm: BDH65742
                </Text>
                <View style={[styles.price, styles.mt4]}>
                  <Text style={styles.text}>
                    <Text style={styles.hyTypo}>{`25.000 `}</Text>
                    <Text style={[styles.text2, styles.textLayout]}>đ</Text>
                  </Text>
                  <Text
                    style={[
                      styles.x3,
                      styles.ml12,
                      styles.textLayout,
                      styles.x3Clr,
                    ]}>
                    x2
                  </Text>
                </View>
              </View>
            </View>
            <View style={[styles.total, styles.mt8, styles.buttonFlexBox]}>
              <Text style={[styles.x3, styles.textLayout, styles.x3Clr]}>
                Tổng đơn hàng:
              </Text>
              <Text style={[styles.text3, styles.ml8]}>
                <Text style={styles.textTypo}>{`69.300 `}</Text>
                <Text style={styles.textLayout}>đ</Text>
              </Text>
            </View>
            <View
              style={[styles.buttonAction2, styles.mt8, styles.buttonFlexBox]}>
              <View
                style={[
                  styles.button5,
                  styles.buttonBorder,
                  styles.buttonBorder1,
                ]}>
                <Text style={[styles.hyNHng, styles.textTypo]}>
                  Hủy đơn hàng
                </Text>
              </View>
              <View
                style={[
                  styles.button2,
                  styles.ml8,
                  styles.buttonBorder,
                  styles.buttonFlexBox2,
                  styles.labelSpaceBlock,
                ]}>
                <Text style={[styles.xcNhnN, styles.textTypo]}>In hóa đơn</Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={[
            styles.labelResult1,
            styles.buttonFlexBox2,
            styles.labelSpaceBlock,
          ]}>
          <Text style={[styles.labelSearchResult1, styles.labelLayout]}>
            Bạn đã xem hết danh sách
          </Text>
        </View>
      </View>
      <View style={[styles.systemLightHomeIndicato, styles.barPosition]}>
        <View style={styles.homeIndicator} />
      </View>
      <View style={[styles.systemLightStatusBar, styles.barPosition]}>
        <Text style={[styles.time, styles.logoPosition]}>9:41</Text>
        <View style={[styles.battery, styles.borderPosition]}>
          <View
            style={[styles.border, styles.buttonBorder, styles.borderPosition]}
          />
          <Image
            style={[styles.capIcon, styles.borderPosition]}
            resizeMode="cover"
            source={require('../assets/cap.png')}
          />
          <View style={[styles.capacity, styles.borderPosition]} />
        </View>
        <Image
          style={styles.wifiIcon}
          resizeMode="cover"
          source={require('../assets/wifi.png')}
        />
        <Image
          style={styles.cellularConnectionIcon}
          resizeMode="cover"
          source={require('../assets/cellular-connection.png')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ml8: {
    marginLeft: 8,
  },
  ml16: {
    marginLeft: 16,
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
  mt8: {
    marginTop: 8,
  },
  topAppBarPosition: {
    backgroundColor: 'transparent',
    left: '0%',
    right: '0%',
    position: 'absolute',
  },
  iconLayout1: {
    height: 24,
    width: 24,
  },
  logoPosition: {
    color: Color.white,
    textAlign: 'center',
    top: '50%',
    position: 'absolute',
  },
  labelSpaceBlock: {
    paddingVertical: Padding.p_5xs,
    paddingHorizontal: Padding.p_base,
  },
  oderItemBorder: {
    borderBottomWidth: 1,
    borderColor: '#e6ebf1',
    borderStyle: 'solid',
    backgroundColor: Color.white,
  },
  barPosition: {
    left: 0,
    position: 'absolute',
  },
  buttonFlexBox2: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  hyTypo: {
    fontFamily: FontFamily.robotoMedium,
    fontWeight: '500',
  },
  labelLayout: {
    lineHeight: 24,
    fontSize: FontSize.size_base,
  },
  buttonFlexBox1: {
    paddingVertical: Padding.p_9xs,
    paddingHorizontal: Padding.p_5xs,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  x3Clr: {
    color: Color.midnightblue_200,
    fontFamily: FontFamily.robotoRegular,
  },
  textTypo: {
    fontSize: FontSize.size_sm,
    lineHeight: 20,
  },
  textLayout: {
    lineHeight: 16,
    fontSize: FontSize.size_xs,
  },
  buttonFlexBox: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  buttonBorder1: {
    borderColor: '#ffcbbe',
    borderWidth: 1,
    borderRadius: Border.br_9xs,
    justifyContent: 'center',
    paddingVertical: Padding.p_5xs,
    alignItems: 'center',
    paddingHorizontal: Padding.p_base,
    flexDirection: 'row',
  },
  buttonBorder: {
    borderWidth: 1,
    borderStyle: 'solid',
  },
  iconLayout: {
    height: '100%',
    width: '100%',
  },
  borderPosition: {
    top: '50%',
    position: 'absolute',
  },
  backIcon: {
    zIndex: 0,
  },
  logo: {
    marginTop: 11.5,
    marginLeft: -87.5,
    fontSize: FontSize.size_xl,
    lineHeight: 22,
    fontWeight: '700',
    fontFamily: FontFamily.robotoBold,
    zIndex: 1,
    textAlign: 'center',
    left: '50%',
  },
  topAppBar: {
    top: -1,
    paddingTop: Padding.p_36xl,
    paddingBottom: Padding.p_xs,
    alignItems: 'center',
    paddingHorizontal: Padding.p_base,
    flexDirection: 'row',
    width: '100%',
  },
  search1Icon: {
    overflow: 'hidden',
  },
  bnh: {
    textAlign: 'left',
    color: Color.midnightblue_100,
    fontFamily: FontFamily.robotoRegular,
    lineHeight: 20,
    fontSize: FontSize.size_base,
    flex: 1,
  },
  searchBar: {
    backgroundColor: Color.aliceblue_200,
    paddingLeft: Padding.p_5xs,
    paddingTop: Padding.p_5xs,
    paddingRight: Padding.p_base,
    paddingBottom: Padding.p_5xs,
    borderRadius: Border.br_5xs,
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  hy: {
    color: Color.mediumslateblue_200,
    textAlign: 'left',
  },
  button: {
    paddingHorizontal: 0,
    paddingVertical: Padding.p_xs,
  },
  topAppBar1: {
    top: 90,
    right: 0,
    alignItems: 'center',
    flexDirection: 'row',
  },
  labelSearchResult: {
    textAlign: 'left',
    color: Color.midnightblue_100,
    fontFamily: FontFamily.robotoRegular,
    flex: 1,
  },
  labelResult: {
    alignSelf: 'stretch',
    alignItems: 'center',
    flexDirection: 'row',
  },
  bLc: {
    textAlign: 'center',
  },
  filterIcon: {
    width: 16,
    height: 16,
  },
  filterButton: {
    display: 'none',
  },
  minhTrn: {
    textAlign: 'left',
    color: Color.midnightblue_100,
    fontFamily: FontFamily.robotoRegular,
  },
  person: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  status: {
    color: Color.dodgerblue,
    fontFamily: FontFamily.robotoRegular,
    textAlign: 'center',
  },
  orderId: {
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    alignItems: 'center',
    flexDirection: 'row',
  },
  productChild: {
    width: 58,
    height: 58,
    borderRadius: Border.br_9xs,
  },
  bnhInNg: {
    alignSelf: 'stretch',
    textAlign: 'left',
    color: Color.midnightblue_100,
  },
  mSnPhm: {
    alignSelf: 'stretch',
    textAlign: 'left',
  },
  text2: {
    fontFamily: FontFamily.robotoRegular,
  },
  text: {
    color: Color.midnightblue_100,
    textAlign: 'center',
  },
  x3: {
    textAlign: 'center',
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
    color: Color.mediumslateblue_200,
    fontFamily: FontFamily.robotoRegular,
    textAlign: 'center',
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
    color: Color.mediumslateblue_200,
    fontFamily: FontFamily.robotoRegular,
    textAlign: 'center',
  },
  button2: {
    borderColor: '#003ecf',
    borderRadius: Border.br_9xs,
  },
  buttonAction: {
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  oderItem: {
    alignSelf: 'stretch',
    paddingVertical: Padding.p_xs,
    paddingHorizontal: Padding.p_base,
  },
  productItem: {
    alignSelf: 'stretch',
    zIndex: 0,
    flexDirection: 'row',
  },
  productItem1: {
    alignSelf: 'stretch',
    zIndex: 1,
    flexDirection: 'row',
  },
  productItem2: {
    zIndex: 2,
    alignSelf: 'stretch',
    flexDirection: 'row',
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
    alignItems: 'flex-end',
    alignSelf: 'stretch',
  },
  status2: {
    color: Color.orange,
    fontFamily: FontFamily.robotoRegular,
    textAlign: 'center',
  },
  productList1: {
    alignSelf: 'stretch',
  },
  button5: {
    display: 'none',
  },
  buttonAction2: {
    width: 311,
    alignItems: 'center',
  },
  oderItem2: {
    shadowColor: 'rgba(0, 62, 207, 0.12)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
    padding: Padding.p_xs,
    display: 'none',
    alignSelf: 'stretch',
    borderRadius: Border.br_5xs,
    backgroundColor: Color.white,
  },
  content: {
    width: 375,
    alignItems: 'flex-end',
  },
  labelSearchResult1: {
    color: Color.midnightblue_100,
    fontFamily: FontFamily.robotoRegular,
    textAlign: 'center',
    flex: 1,
  },
  labelResult1: {
    alignSelf: 'stretch',
  },
  labelResultParent: {
    top: 154,
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
    right: 0,
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
  },
  capIcon: {
    marginTop: -2,
    width: 1,
    height: 4,
    opacity: 0.4,
    right: 0,
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
    right: 0,
  },
  result: {
    backgroundColor: Color.aliceblue_100,
    height: 812,
    overflow: 'hidden',
    width: '100%',
    flex: 1,
  },
});

export default Result;
