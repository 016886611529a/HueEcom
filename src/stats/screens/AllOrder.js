import React, {useState, useCallback} from 'react';
import {Image, StyleSheet, Pressable, Text, View, Modal} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import PopupFilter from '../components/PopupFilter';
import {Padding, Color, FontFamily, FontSize, Border} from '../../GlobalStyles';

const AllOrder = () => {
  const [filterIconVisible, setFilterIconVisible] = useState(false);
  const navigation = useNavigation();

  const openFilterIcon = useCallback(() => {
    setFilterIconVisible(true);
  }, []);

  const closeFilterIcon = useCallback(() => {
    setFilterIconVisible(false);
  }, []);

  return (
    <>
      <View style={styles.allOrder}>
        <LinearGradient
          style={[
            styles.topAppBar,
            styles.topAppBarPosition,
            styles.orderIdFlexBox,
            styles.contentSpaceBlock,
          ]}
          locations={[0, 1]}
          colors={['#003ecf', '#550cb1']}
          useAngle={true}
          angle={70.26}>
          <Pressable
            style={[styles.backIcon, styles.iconLayout1]}
            onPress={() => navigation.navigate('Homepage')}>
            <Image
              style={styles.iconLayout}
              resizeMode="cover"
              source={require('../assets/backicon2.png')}
            />
          </Pressable>
          <Text style={[styles.logo, styles.logoPosition]}>
            Quản lý đơn hàng
          </Text>
          <View style={styles.productItem2Position}>
            <Pressable
              style={styles.iconLayout1}
              onPress={() => navigation.navigate('SearchOrder')}>
              <Image
                style={styles.iconLayout}
                resizeMode="cover"
                source={require('../assets/searchicon.png')}
              />
            </Pressable>
            <Pressable
              style={[styles.iconLayout1, styles.ml8]}
              onPress={openFilterIcon}>
              <Image
                style={styles.iconLayout}
                resizeMode="cover"
                source={require('../assets/filtericon2.png')}
              />
            </Pressable>
          </View>
        </LinearGradient>
        <View
          style={[styles.navTab, styles.navTabBorder, styles.navTabPosition]}>
          <View style={[styles.tab, styles.tabFlexBox, styles.tabSpaceBlock]}>
            <Text style={[styles.nHngClr, styles.angTypo, styles.angLayout]}>
              Tất cả (520)
            </Text>
          </View>
          <Pressable
            style={[styles.tabFlexBox, styles.tabSpaceBlock]}
            onPress={() => navigation.navigate('ProccessingOrder')}>
            <Text style={[styles.angXL, styles.angTypo, styles.angLayout]}>
              Đang xử lý (12)
            </Text>
          </Pressable>
          <View style={styles.tabSpaceBlock}>
            <Text style={[styles.angVnChuyn, styles.angTypo, styles.angLayout]}>
              Đang vận chuyển (5)
            </Text>
          </View>
          <View style={styles.tabSpaceBlock}>
            <Text style={[styles.angVnChuyn, styles.angTypo, styles.angLayout]}>
              Đã giao hàng (255)
            </Text>
          </View>
          <View style={styles.tabSpaceBlock}>
            <Text style={[styles.angVnChuyn, styles.angTypo, styles.angLayout]}>
              Đã hủy (250)
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.content,
            styles.contentSpaceBlock,
            styles.navTabPosition,
          ]}>
          <View style={[styles.filterButton, styles.buttonFlexBox1]}>
            <Text style={[styles.bLc, styles.angLayout]}>Bộ lọc</Text>
            <Image
              style={[styles.filterIcon1, styles.ml4]}
              resizeMode="cover"
              source={require('../assets/filtericon.png')}
            />
          </View>
          <Pressable
            style={[styles.oderItem, styles.mt8, styles.oderItemShadowBox]}
            onPress={() => navigation.navigate('OrderDetail')}>
            <View style={[styles.orderId, styles.orderIdFlexBox]}>
              <View style={styles.person}>
                <Image
                  style={styles.filterIcon1}
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
                <Text style={[styles.bnhInNg, styles.angTypo]}>
                  Bánh in ngũ sắc đặc sản tiến Vua
                </Text>
                <Text style={[styles.mSnPhm, styles.mt4, styles.textLayout]}>
                  Mã sản phẩm: 1746603586-164627...
                </Text>
                <View style={[styles.price, styles.mt4]}>
                  <Text style={styles.text}>
                    <Text
                      style={[
                        styles.angTypo,
                        styles.angLayout,
                      ]}>{`115.000 `}</Text>
                    <Text style={[styles.text2, styles.textLayout]}>đ</Text>
                  </Text>
                  <Text style={[styles.x3, styles.ml12, styles.textLayout]}>
                    x3
                  </Text>
                </View>
              </View>
            </View>
            <View style={[styles.total, styles.mt8, styles.buttonFlexBox]}>
              <Text style={[styles.x3, styles.textLayout]}>Tổng đơn hàng:</Text>
              <Text style={[styles.text3, styles.ml8, styles.nHngClr]}>
                <Text style={styles.angLayout}>{`467.800 `}</Text>
                <Text style={styles.textLayout}>đ</Text>
              </Text>
            </View>
            <View
              style={[styles.buttonAction, styles.mt8, styles.buttonFlexBox]}>
              <View style={[styles.buttonBorder, styles.buttonBorder1]}>
                <Text style={[styles.hyNHng, styles.angLayout]}>
                  Hủy đơn hàng
                </Text>
              </View>
              <View style={[styles.button1, styles.ml8, styles.buttonBorder]}>
                <Text style={[styles.xcNhnN, styles.nHngClr, styles.angLayout]}>
                  Xác nhận đơn
                </Text>
              </View>
            </View>
          </Pressable>
          <View style={[styles.oderItem, styles.mt8, styles.oderItemShadowBox]}>
            <View style={[styles.orderId, styles.orderIdFlexBox]}>
              <View style={styles.person}>
                <Image
                  style={styles.filterIcon1}
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
                    <Text style={[styles.bnhInNg, styles.angTypo]}>
                      Hạt sen Huế sấy ăn liền
                    </Text>
                    <Text
                      style={[styles.mSnPhm, styles.mt4, styles.textLayout]}>
                      Mã sản phẩm: 1746603586-164627...
                    </Text>
                    <View style={[styles.price, styles.mt4]}>
                      <Text style={styles.text}>
                        <Text style={styles.angLayout}>{`70.000 `}</Text>
                        <Text style={[styles.text2, styles.textLayout]}>đ</Text>
                      </Text>
                      <Text style={[styles.x3, styles.ml12, styles.textLayout]}>
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
                    <Text style={[styles.bnhInNg, styles.angTypo]}>
                      Bánh sen chấy cuộn lò than hoa
                    </Text>
                    <Text
                      style={[styles.mSnPhm, styles.mt4, styles.textLayout]}>
                      Mã sản phẩm: 8936193480157
                    </Text>
                    <View style={[styles.price, styles.mt4]}>
                      <Text style={styles.text}>
                        <Text style={styles.angLayout}>{`54.000 `}</Text>
                        <Text style={[styles.text2, styles.textLayout]}>đ</Text>
                      </Text>
                      <Text style={[styles.x3, styles.ml12, styles.textLayout]}>
                        x1
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={[
                    styles.productItem2,
                    styles.mt8,
                    styles.productItem2Position,
                  ]}>
                  <Image
                    style={styles.productChild}
                    resizeMode="cover"
                    source={require('../assets/rectangle-24.png')}
                  />
                  <View style={[styles.content1, styles.ml16]}>
                    <Text style={[styles.bnhInNg, styles.angTypo]}>
                      Bánh ép Huế tôm rào giòn rụm, đậm vị 5 bánh
                    </Text>
                    <Text
                      style={[styles.mSnPhm, styles.mt4, styles.textLayout]}>
                      Mã sản phẩm: 8936193480157
                    </Text>
                    <View style={[styles.price, styles.mt4]}>
                      <Text style={styles.text}>
                        <Text style={styles.angLayout}>{`62.000 `}</Text>
                        <Text style={[styles.text2, styles.textLayout]}>đ</Text>
                      </Text>
                      <Text style={[styles.x3, styles.ml12, styles.textLayout]}>
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
              <Pressable
                style={[styles.moreButton, styles.buttonFlexBox1]}
                onPress={() => navigation.navigate('AllOrderExpandProduct')}>
                <Text style={[styles.xcNhnN, styles.nHngClr, styles.angLayout]}>
                  Xem thêm
                </Text>
                <Image
                  style={[styles.filterIcon1, styles.ml4]}
                  resizeMode="cover"
                  source={require('../assets/expandmoreicon.png')}
                />
              </Pressable>
            </View>
            <View style={[styles.total, styles.mt8, styles.buttonFlexBox]}>
              <Text style={[styles.x3, styles.textLayout]}>Tổng đơn hàng:</Text>
              <Text style={[styles.text3, styles.ml8, styles.nHngClr]}>
                <Text style={styles.angLayout}>{`215.500 `}</Text>
                <Text style={styles.textLayout}>đ</Text>
              </Text>
            </View>
            <View
              style={[styles.buttonAction, styles.mt8, styles.buttonFlexBox]}>
              <View style={styles.buttonBorder1}>
                <Text style={[styles.hyNHng, styles.angLayout]}>
                  Hủy đơn hàng
                </Text>
              </View>
              <View style={[styles.button1, styles.ml8, styles.buttonBorder]}>
                <Text style={[styles.xcNhnN, styles.nHngClr, styles.angLayout]}>
                  Xác nhận đơn
                </Text>
              </View>
            </View>
          </View>
          <View style={[styles.oderItem, styles.mt8, styles.oderItemShadowBox]}>
            <View style={[styles.orderId, styles.orderIdFlexBox]}>
              <View style={styles.person}>
                <Image
                  style={styles.filterIcon1}
                  resizeMode="cover"
                  source={require('../assets/personicon.png')}
                />
                <Text style={[styles.minhTrn, styles.ml4, styles.textLayout]}>
                  Trần Thị Mỹ Bình
                </Text>
              </View>
              <Text style={[styles.status, styles.textLayout]}>Đang xử lý</Text>
            </View>
            <View style={[styles.product, styles.mt8]}>
              <Image
                style={styles.productChild}
                resizeMode="cover"
                source={require('../assets/rectangle-25.png')}
              />
              <View style={[styles.content1, styles.ml16]}>
                <Text style={[styles.bnhInNg, styles.angTypo]}>
                  Tinh dầu Quế 10ml
                </Text>
                <Text style={[styles.mSnPhm, styles.mt4, styles.textLayout]}>
                  Mã sản phẩm: BDH119149
                </Text>
                <View style={[styles.price, styles.mt4]}>
                  <Text style={styles.text}>
                    <Text style={styles.angLayout}>{`80.000 `}</Text>
                    <Text style={[styles.text2, styles.textLayout]}>đ</Text>
                  </Text>
                  <Text style={[styles.x3, styles.ml12, styles.textLayout]}>
                    x1
                  </Text>
                </View>
              </View>
            </View>
            <View style={[styles.total, styles.mt8, styles.buttonFlexBox]}>
              <Text style={[styles.x3, styles.textLayout]}>Tổng đơn hàng:</Text>
              <Text style={[styles.text3, styles.ml8, styles.nHngClr]}>
                <Text style={styles.angLayout}>{`99.300 `}</Text>
                <Text style={styles.textLayout}>đ</Text>
              </Text>
            </View>
            <View
              style={[styles.buttonAction, styles.mt8, styles.buttonFlexBox]}>
              <View style={styles.buttonBorder1}>
                <Text style={[styles.hyNHng, styles.angLayout]}>
                  Hủy đơn hàng
                </Text>
              </View>
              <View style={[styles.button1, styles.ml8, styles.buttonBorder]}>
                <Text style={[styles.xcNhnN, styles.nHngClr, styles.angLayout]}>
                  Xác nhận đơn
                </Text>
              </View>
            </View>
          </View>
          <View style={[styles.oderItem, styles.mt8, styles.oderItemShadowBox]}>
            <View style={[styles.orderId, styles.orderIdFlexBox]}>
              <View style={styles.person}>
                <Image
                  style={styles.filterIcon1}
                  resizeMode="cover"
                  source={require('../assets/personicon.png')}
                />
                <Text style={[styles.minhTrn, styles.ml4, styles.textLayout]}>
                  Trần Thị Mỹ Bình
                </Text>
              </View>
              <Text style={[styles.status, styles.textLayout]}>Đang xử lý</Text>
            </View>
            <View style={[styles.product, styles.mt8]}>
              <Image
                style={styles.productChild}
                resizeMode="cover"
                source={require('../assets/rectangle-25.png')}
              />
              <View style={[styles.content1, styles.ml16]}>
                <Text style={[styles.bnhInNg, styles.angTypo]}>
                  Tinh dầu Quế 10ml
                </Text>
                <Text style={[styles.mSnPhm, styles.mt4, styles.textLayout]}>
                  Mã sản phẩm: BDH119149
                </Text>
                <View style={[styles.price, styles.mt4]}>
                  <Text style={styles.text}>
                    <Text style={styles.angLayout}>{`80.000 `}</Text>
                    <Text style={[styles.text2, styles.textLayout]}>đ</Text>
                  </Text>
                  <Text style={[styles.x3, styles.ml12, styles.textLayout]}>
                    x1
                  </Text>
                </View>
              </View>
            </View>
            <View style={[styles.total, styles.mt8, styles.buttonFlexBox]}>
              <Text style={[styles.x3, styles.textLayout]}>Tổng đơn hàng:</Text>
              <Text style={[styles.text3, styles.ml8, styles.nHngClr]}>
                <Text style={styles.angLayout}>{`99.300 `}</Text>
                <Text style={styles.textLayout}>đ</Text>
              </Text>
            </View>
            <View
              style={[styles.buttonAction, styles.mt8, styles.buttonFlexBox]}>
              <View style={styles.buttonBorder1}>
                <Text style={[styles.hyNHng, styles.angLayout]}>
                  Hủy đơn hàng
                </Text>
              </View>
              <View style={[styles.button1, styles.ml8, styles.buttonBorder]}>
                <Text style={[styles.xcNhnN, styles.nHngClr, styles.angLayout]}>
                  Xác nhận đơn
                </Text>
              </View>
            </View>
          </View>
          <View style={[styles.oderItem, styles.mt8, styles.oderItemShadowBox]}>
            <View style={[styles.orderId, styles.orderIdFlexBox]}>
              <View style={styles.person}>
                <Image
                  style={styles.filterIcon1}
                  resizeMode="cover"
                  source={require('../assets/personicon.png')}
                />
                <Text style={[styles.minhTrn, styles.ml4, styles.textLayout]}>
                  Trần Thị Mỹ Bình
                </Text>
              </View>
              <Text style={[styles.status, styles.textLayout]}>Đang xử lý</Text>
            </View>
            <View style={[styles.product, styles.mt8]}>
              <Image
                style={styles.productChild}
                resizeMode="cover"
                source={require('../assets/rectangle-25.png')}
              />
              <View style={[styles.content1, styles.ml16]}>
                <Text style={[styles.bnhInNg, styles.angTypo]}>
                  Tinh dầu Quế 10ml
                </Text>
                <Text style={[styles.mSnPhm, styles.mt4, styles.textLayout]}>
                  Mã sản phẩm: BDH119149
                </Text>
                <View style={[styles.price, styles.mt4]}>
                  <Text style={styles.text}>
                    <Text style={styles.angLayout}>{`80.000 `}</Text>
                    <Text style={[styles.text2, styles.textLayout]}>đ</Text>
                  </Text>
                  <Text style={[styles.x3, styles.ml12, styles.textLayout]}>
                    x1
                  </Text>
                </View>
              </View>
            </View>
            <View style={[styles.total, styles.mt8, styles.buttonFlexBox]}>
              <Text style={[styles.x3, styles.textLayout]}>Tổng đơn hàng:</Text>
              <Text style={[styles.text3, styles.ml8, styles.nHngClr]}>
                <Text style={styles.angLayout}>{`99.300 `}</Text>
                <Text style={styles.textLayout}>đ</Text>
              </Text>
            </View>
            <View
              style={[styles.buttonAction, styles.mt8, styles.buttonFlexBox]}>
              <View style={styles.buttonBorder1}>
                <Text style={[styles.hyNHng, styles.angLayout]}>
                  Hủy đơn hàng
                </Text>
              </View>
              <View style={[styles.button1, styles.ml8, styles.buttonBorder]}>
                <Text style={[styles.xcNhnN, styles.nHngClr, styles.angLayout]}>
                  Xác nhận đơn
                </Text>
              </View>
            </View>
          </View>
          <View style={[styles.oderItem, styles.mt8, styles.oderItemShadowBox]}>
            <View style={[styles.orderId, styles.orderIdFlexBox]}>
              <View style={styles.person}>
                <Image
                  style={styles.filterIcon1}
                  resizeMode="cover"
                  source={require('../assets/personicon.png')}
                />
                <Text style={[styles.minhTrn, styles.ml4, styles.textLayout]}>
                  Ngô Hồng Phương Linh
                </Text>
              </View>
              <Text style={[styles.status5, styles.textLayout]}>
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
                  <Text style={[styles.bnhInNg, styles.angTypo]}>
                    Hạt sen Huế sấy ăn liền
                  </Text>
                  <Text style={[styles.mSnPhm, styles.mt4, styles.textLayout]}>
                    Mã sản phẩm: 1746603586-164627...
                  </Text>
                  <View style={[styles.price, styles.mt4]}>
                    <Text style={styles.text}>
                      <Text style={styles.angLayout}>{`70.000 `}</Text>
                      <Text style={[styles.text2, styles.textLayout]}>đ</Text>
                    </Text>
                    <Text style={[styles.x3, styles.ml12, styles.textLayout]}>
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
                  <Text style={[styles.bnhInNg, styles.angTypo]}>
                    Bánh sen chấy cuộn lò than hoa
                  </Text>
                  <Text style={[styles.mSnPhm, styles.mt4, styles.textLayout]}>
                    Mã sản phẩm: 8936193480157
                  </Text>
                  <View style={[styles.price, styles.mt4]}>
                    <Text style={styles.text}>
                      <Text style={styles.angLayout}>{`54.000 `}</Text>
                      <Text style={[styles.text2, styles.textLayout]}>đ</Text>
                    </Text>
                    <Text style={[styles.x3, styles.ml12, styles.textLayout]}>
                      x1
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={[styles.total, styles.mt8, styles.buttonFlexBox]}>
              <Text style={[styles.x3, styles.textLayout]}>Tổng đơn hàng:</Text>
              <Text style={[styles.text3, styles.ml8, styles.nHngClr]}>
                <Text style={styles.angLayout}>{`215.500 `}</Text>
                <Text style={styles.textLayout}>đ</Text>
              </Text>
            </View>
            <View
              style={[styles.buttonAction5, styles.mt8, styles.buttonFlexBox]}>
              <View
                style={[
                  styles.button10,
                  styles.buttonBorder,
                  styles.buttonBorder1,
                ]}>
                <Text style={[styles.hyNHng, styles.angLayout]}>
                  Hủy đơn hàng
                </Text>
              </View>
              <View style={[styles.button1, styles.ml8, styles.buttonBorder]}>
                <Text style={[styles.xcNhnN, styles.nHngClr, styles.angLayout]}>
                  In hóa đơn
                </Text>
              </View>
            </View>
          </View>
          <View style={[styles.oderItem, styles.mt8, styles.oderItemShadowBox]}>
            <View style={[styles.orderId, styles.orderIdFlexBox]}>
              <View style={styles.person}>
                <Image
                  style={styles.filterIcon1}
                  resizeMode="cover"
                  source={require('../assets/personicon.png')}
                />
                <Text style={[styles.minhTrn, styles.ml4, styles.textLayout]}>
                  Thanh Trúc
                </Text>
              </View>
              <Text style={[styles.status5, styles.textLayout]}>
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
                <Text style={[styles.bnhInNg, styles.angTypo]}>
                  Trà vả gừng – Hộp 40g - 35 hộp/ thùng
                </Text>
                <Text style={[styles.mSnPhm, styles.mt4, styles.textLayout]}>
                  Mã sản phẩm: BDH65742
                </Text>
                <View style={[styles.price, styles.mt4]}>
                  <Text style={styles.text}>
                    <Text style={styles.angLayout}>{`25.000 `}</Text>
                    <Text style={[styles.text2, styles.textLayout]}>đ</Text>
                  </Text>
                  <Text style={[styles.x3, styles.ml12, styles.textLayout]}>
                    x2
                  </Text>
                </View>
              </View>
            </View>
            <View style={[styles.total, styles.mt8, styles.buttonFlexBox]}>
              <Text style={[styles.x3, styles.textLayout]}>Tổng đơn hàng:</Text>
              <Text style={[styles.text3, styles.ml8, styles.nHngClr]}>
                <Text style={styles.angLayout}>{`69.300 `}</Text>
                <Text style={styles.textLayout}>đ</Text>
              </Text>
            </View>
            <View
              style={[styles.buttonAction5, styles.mt8, styles.buttonFlexBox]}>
              <View
                style={[
                  styles.button10,
                  styles.buttonBorder,
                  styles.buttonBorder1,
                ]}>
                <Text style={[styles.hyNHng, styles.angLayout]}>
                  Hủy đơn hàng
                </Text>
              </View>
              <View style={[styles.button1, styles.ml8, styles.buttonBorder]}>
                <Text style={[styles.xcNhnN, styles.nHngClr, styles.angLayout]}>
                  In hóa đơn
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={[
            styles.navigationBar,
            styles.oderItemShadowBox,
            styles.tabFlexBox,
            styles.navTabBorder,
          ]}>
          <Pressable
            style={styles.menuItem}
            onPress={() => navigation.navigate('Homepage')}>
            <Image
              style={styles.iconLayout1}
              resizeMode="cover"
              source={require('../assets/homeicon.png')}
            />
            <Image
              style={[styles.homeIconActive, styles.mt4, styles.iconLayout1]}
              resizeMode="cover"
              source={require('../assets/homeiconactive.png')}
            />
            <Text
              style={[
                styles.trangCh,
                styles.mt4,
                styles.textLayout,
                styles.angTypo,
              ]}>
              Trang chủ
            </Text>
          </Pressable>
          <View style={styles.menuItem}>
            <Image
              style={[styles.homeIconActive, styles.iconLayout1]}
              resizeMode="cover"
              source={require('../assets/ordericon.png')}
            />
            <Image
              style={[styles.iconLayout1, styles.mt4]}
              resizeMode="cover"
              source={require('../assets/ordericonactive.png')}
            />
            <Text
              style={[
                styles.textLayout,
                styles.mt4,
                styles.nHngClr,
                styles.angTypo,
              ]}>
              Đơn hàng
            </Text>
          </View>
          <View style={styles.menuItem}>
            <Image
              style={styles.iconLayout1}
              resizeMode="cover"
              source={require('../assets/staticsticicon.png')}
            />
            <Image
              style={[styles.homeIconActive, styles.mt4, styles.iconLayout1]}
              resizeMode="cover"
              source={require('../assets/staticsticiconactive.png')}
            />
            <Text
              style={[
                styles.trangCh,
                styles.mt4,
                styles.textLayout,
                styles.angTypo,
              ]}>
              Thống kê
            </Text>
          </View>
        </View>
        <View style={[styles.systemLightHomeIndicato, styles.systemPosition]}>
          <View style={styles.homeIndicator} />
        </View>
        <View style={[styles.systemLightStatusBar, styles.systemPosition]}>
          <Text style={[styles.time, styles.logoPosition]}>9:41</Text>
          <View style={[styles.battery, styles.batteryPosition]}>
            <View style={styles.border} />
            <Image
              style={styles.capIcon}
              resizeMode="cover"
              source={require('../assets/cap.png')}
            />
            <View style={[styles.capacity, styles.batteryPosition]} />
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

      <Modal animationType="fade" transparent visible={filterIconVisible}>
        <View style={styles.filterIconOverlay}>
          <Pressable style={styles.filterIconBg} onPress={closeFilterIcon} />
          <PopupFilter onClose={closeFilterIcon} />
        </View>
      </Modal>
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
    top: '50%',
    position: 'absolute',
  },
  navTabBorder: {
    borderColor: '#e6ebf1',
    borderStyle: 'solid',
    position: 'absolute',
  },
  navTabPosition: {
    left: '0%',
    right: '0%',
  },
  tabFlexBox: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  tabSpaceBlock: {
    paddingVertical: Padding.p_xs,
    justifyContent: 'center',
    paddingHorizontal: Padding.p_base,
  },
  angTypo: {
    fontFamily: FontFamily.robotoMedium,
    fontWeight: '500',
  },
  angLayout: {
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
  oderItemShadowBox: {
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowColor: 'rgba(0, 62, 207, 0.12)',
    backgroundColor: Color.white,
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
  productItem2Position: {
    zIndex: 2,
    flexDirection: 'row',
  },
  iconLayout: {
    height: '100%',
    width: '100%',
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
    marginTop: 11.5,
    marginLeft: -79.5,
    fontSize: FontSize.size_xl,
    lineHeight: 22,
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
    top: -1,
    paddingTop: Padding.p_36xl,
    paddingBottom: Padding.p_xs,
  },
  tab: {
    borderBottomWidth: 2,
    width: 125,
    borderColor: '#003ecf',
    borderStyle: 'solid',
    paddingVertical: Padding.p_xs,
  },
  angXL: {
    color: Color.midnightblue_200,
    textAlign: 'center',
  },
  angVnChuyn: {
    textAlign: 'left',
    color: Color.midnightblue_200,
  },
  navTab: {
    top: 90,
    borderBottomWidth: 1,
    flexDirection: 'row',
    width: '100%',
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
    color: Color.dodgerblue,
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
  oderItem: {
    borderRadius: Border.br_5xs,
    padding: Padding.p_xs,
    alignSelf: 'stretch',
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
  content: {
    top: 134,
    paddingTop: Padding.p_base,
    paddingBottom: Padding.p_5xl,
    alignItems: 'flex-end',
    position: 'absolute',
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
    display: 'none',
    left: '50%',
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
  allOrder: {
    backgroundColor: Color.aliceblue_100,
    height: 1714,
    overflow: 'hidden',
    width: '100%',
    flex: 1,
  },
});

export default AllOrder;
