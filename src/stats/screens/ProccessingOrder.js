import React, {useState, useCallback, useRef} from 'react';
import {
  Image,
  StyleSheet,
  Pressable,
  Text,
  View,
  Modal,
  TabBarIOS,
  ScrollView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import PopupFilter from '../components/PopupFilter';
import {Padding, Color, FontFamily, FontSize, Border} from '../../GlobalStyles';
import RBSheet from 'react-native-raw-bottom-sheet';
import ButtonOrder from '../components/button/ButtonOrder';

const ProccessingOrder = () => {
  const [filterIconVisible, setFilterIconVisible] = useState(false);
  const [selected, setSelected] = useState(0);
  const navigation = useNavigation();
  const refRBSheet = useRef();
  const openFilterIcon = useCallback(() => {
    setFilterIconVisible(true);
  }, []);

  const closeFilterIcon = useCallback(() => {
    setFilterIconVisible(false);
  }, []);
  const dataMocks = [
    {
      label: 'Tất cả',
      number: '530',
    },
    {
      label: 'Đang xử lý',
      number: '12',
    },
    {
      label: 'Đang vận chuyển',
      number: '5',
    },
    {
      label: 'Tất cả',
      number: '530',
    },
    {
      label: 'Tất cả',
      number: '530',
    },
  ];

  return (
    <>
      <View style={styles.proccessingorder}>
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
            onPress={() => {
              navigation.navigate('Homepage');
            }}>
            <Image
              style={styles.iconLayout}
              resizeMode="cover"
              source={require('../assets/backicon2.png')}
            />
          </Pressable>
          <Text style={[styles.logo, styles.logoPosition]}>
            Quản lý đơn hàng
          </Text>
          <View style={styles.productItem3Position}>
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
              onPress={() => {
                refRBSheet.current.open();
              }}>
              <Image
                style={styles.iconLayout}
                resizeMode="cover"
                source={require('../assets/filtericon1.png')}
              />
            </Pressable>
          </View>
        </LinearGradient>
        <View style={styles.navTab}>
          <ScrollView
            scrollEnabled={true}
            horizontal
            showsHorizontalScrollIndicator={false}>
            {dataMocks.map((e, index) => {
              var textStyle =
                index == selected ? styles.nHngClr : styles.ttC520;
              var tapStyle = index == selected ? styles.tab1 : styles.tab;
              return (
                <Pressable
                  key={index}
                  style={[tapStyle, styles.tabFlexBox]}
                  onPress={() => {
                    setSelected(index);
                  }}>
                  <Text
                    style={[textStyle, styles.nHngTypo, styles.textLayout1]}>
                    {`${e.label} (${e.number})`}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
        <ScrollView
          style={{position: 'relative'}}
          showsVerticalScrollIndicator={false}>
          <View style={[styles.content, styles.contentSpaceBlock]}>
            <View style={[styles.filterButton, styles.buttonFlexBox1]}>
              <Text style={[styles.bLc, styles.textLayout1]}>Bộ lọc</Text>
              <Image
                style={[styles.filterIcon1, styles.ml4]}
                resizeMode="cover"
                source={require('../assets/filtericon.png')}
              />
            </View>
            <Pressable
              style={[styles.oderItemShadowBox, styles.mt8]}
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
                <Text style={[styles.status, styles.textLayout]}>
                  Đang xử lý
                </Text>
              </View>
              <View style={[styles.product, styles.mt8]}>
                <Image
                  style={styles.productChild}
                  resizeMode="cover"
                  source={require('../assets/rectangle-23.png')}
                />
                <View style={[styles.content1, styles.ml16]}>
                  <Text style={[styles.bnhInNg, styles.nHngTypo]}>
                    Bánh in ngũ sắc đặc sản tiến Vua
                  </Text>
                  <Text style={[styles.mSnPhm, styles.mt4, styles.textLayout]}>
                    Mã sản phẩm: 1746603586-164627...
                  </Text>
                  <View style={[styles.price, styles.mt4]}>
                    <Text style={styles.text}>
                      <Text
                        style={[
                          styles.nHngTypo,
                          styles.textLayout1,
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
                <Text style={[styles.x3, styles.textLayout]}>
                  Tổng đơn hàng:
                </Text>
                <Text style={[styles.text3, styles.ml8, styles.nHngClr]}>
                  <Text style={styles.textLayout1}>{`467.800 `}</Text>
                  <Text style={styles.textLayout}>đ</Text>
                </Text>
              </View>
              <View
                style={[styles.buttonAction, styles.mt8, styles.buttonFlexBox]}>
                <ButtonOrder type={'secondary-outline'} />
                <ButtonOrder type={'primary'} />
              </View>
            </Pressable>
            <View style={[styles.oderItemShadowBox, styles.mt8]}>
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
                <Text style={[styles.status, styles.textLayout]}>
                  Đang xử lý
                </Text>
              </View>
              <View style={[styles.product, styles.mt8]}>
                <Image
                  style={styles.productChild}
                  resizeMode="cover"
                  source={require('../assets/rectangle-25.png')}
                />
                <View style={[styles.content1, styles.ml16]}>
                  <Text style={[styles.bnhInNg, styles.nHngTypo]}>
                    Tinh dầu Quế 10ml
                  </Text>
                  <Text style={[styles.mSnPhm, styles.mt4, styles.textLayout]}>
                    Mã sản phẩm: BDH119149
                  </Text>
                  <View style={[styles.price, styles.mt4]}>
                    <Text style={styles.text}>
                      <Text style={styles.textLayout1}>{`80.000 `}</Text>
                      <Text style={[styles.text2, styles.textLayout]}>đ</Text>
                    </Text>
                    <Text style={[styles.x3, styles.ml12, styles.textLayout]}>
                      x1
                    </Text>
                  </View>
                </View>
              </View>
              <View style={[styles.total, styles.mt8, styles.buttonFlexBox]}>
                <Text style={[styles.x3, styles.textLayout]}>
                  Tổng đơn hàng:
                </Text>
                <Text style={[styles.text3, styles.ml8, styles.nHngClr]}>
                  <Text style={styles.textLayout1}>{`99.300 `}</Text>
                  <Text style={styles.textLayout}>đ</Text>
                </Text>
              </View>
              <View
                style={[styles.buttonAction, styles.mt8, styles.buttonFlexBox]}>
                <ButtonOrder type={'secondary-outline'} />
                <ButtonOrder type={'primary'} />
              </View>
            </View>
            <View style={[styles.oderItemShadowBox, styles.mt8]}>
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
                <Text style={[styles.status, styles.textLayout]}>
                  Đang xử lý
                </Text>
              </View>
              <View style={[styles.productList, styles.mt8]}>
                <View style={styles.group}>
                  <View style={styles.productItem1}>
                    <Image
                      style={styles.productChild}
                      resizeMode="cover"
                      source={require('../assets/rectangle-2.png')}
                    />
                    <View style={[styles.content1, styles.ml16]}>
                      <Text style={[styles.bnhInNg, styles.nHngTypo]}>
                        Hạt sen Huế sấy ăn liền
                      </Text>
                      <Text
                        style={[styles.mSnPhm, styles.mt4, styles.textLayout]}>
                        Mã sản phẩm: 1746603586-164627...
                      </Text>
                      <View style={[styles.price, styles.mt4]}>
                        <Text style={styles.text}>
                          <Text style={styles.textLayout1}>{`70.000 `}</Text>
                          <Text style={[styles.text2, styles.textLayout]}>
                            đ
                          </Text>
                        </Text>
                        <Text
                          style={[styles.x3, styles.ml12, styles.textLayout]}>
                          x1
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={[styles.productItem2, styles.mt8]}>
                    <Image
                      style={styles.productChild}
                      resizeMode="cover"
                      source={require('../assets/rectangle-21.png')}
                    />
                    <View style={[styles.content1, styles.ml16]}>
                      <Text style={[styles.bnhInNg, styles.nHngTypo]}>
                        Bánh sen chấy cuộn lò than hoa
                      </Text>
                      <Text
                        style={[styles.mSnPhm, styles.mt4, styles.textLayout]}>
                        Mã sản phẩm: 8936193480157
                      </Text>
                      <View style={[styles.price, styles.mt4]}>
                        <Text style={styles.text}>
                          <Text style={styles.textLayout1}>{`54.000 `}</Text>
                          <Text style={[styles.text2, styles.textLayout]}>
                            đ
                          </Text>
                        </Text>
                        <Text
                          style={[styles.x3, styles.ml12, styles.textLayout]}>
                          x1
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={[
                      styles.productItem3,
                      styles.mt8,
                      styles.productItem3Position,
                    ]}>
                    <Image
                      style={styles.productChild}
                      resizeMode="cover"
                      source={require('../assets/rectangle-24.png')}
                    />
                    <View style={[styles.content1, styles.ml16]}>
                      <Text style={[styles.bnhInNg, styles.nHngTypo]}>
                        Bánh ép Huế tôm rào giòn rụm, đậm vị 5 bánh
                      </Text>
                      <Text
                        style={[styles.mSnPhm, styles.mt4, styles.textLayout]}>
                        Mã sản phẩm: 8936193480157
                      </Text>
                      <View style={[styles.price, styles.mt4]}>
                        <Text style={styles.text}>
                          <Text style={styles.textLayout1}>{`62.000 `}</Text>
                          <Text style={[styles.text2, styles.textLayout]}>
                            đ
                          </Text>
                        </Text>
                        <Text
                          style={[styles.x3, styles.ml12, styles.textLayout]}>
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
                  <Text
                    style={[styles.xcNhnN, styles.nHngClr, styles.textLayout1]}>
                    Xem thêm
                  </Text>
                  <Image
                    style={[styles.filterIcon1, styles.ml4]}
                    resizeMode="cover"
                    source={require('../assets/expandmoreicon.png')}
                  />
                </View>
              </View>
              <View style={[styles.total, styles.mt8, styles.buttonFlexBox]}>
                <Text style={[styles.x3, styles.textLayout]}>
                  Tổng đơn hàng:
                </Text>
                <Text style={[styles.text3, styles.ml8, styles.nHngClr]}>
                  <Text style={styles.textLayout1}>{`215.500 `}</Text>
                  <Text style={styles.textLayout}>đ</Text>
                </Text>
              </View>
              <View
                style={[styles.buttonAction, styles.mt8, styles.buttonFlexBox]}>
                <ButtonOrder type={'secondary-outline'} />
                <ButtonOrder type={'primary'} />
              </View>
            </View>
            <View style={[styles.oderItemShadowBox, styles.mt8]}>
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
                <Text style={[styles.status, styles.textLayout]}>
                  Đang xử lý
                </Text>
              </View>
              <View style={[styles.product, styles.mt8]}>
                <Image
                  style={styles.productChild}
                  resizeMode="cover"
                  source={require('../assets/rectangle-25.png')}
                />
                <View style={[styles.content1, styles.ml16]}>
                  <Text style={[styles.bnhInNg, styles.nHngTypo]}>
                    Tinh dầu Quế 10ml
                  </Text>
                  <Text style={[styles.mSnPhm, styles.mt4, styles.textLayout]}>
                    Mã sản phẩm: BDH119149
                  </Text>
                  <View style={[styles.price, styles.mt4]}>
                    <Text style={styles.text}>
                      <Text style={styles.textLayout1}>{`80.000 `}</Text>
                      <Text style={[styles.text2, styles.textLayout]}>đ</Text>
                    </Text>
                    <Text style={[styles.x3, styles.ml12, styles.textLayout]}>
                      x1
                    </Text>
                  </View>
                </View>
              </View>
              <View style={[styles.total, styles.mt8, styles.buttonFlexBox]}>
                <Text style={[styles.x3, styles.textLayout]}>
                  Tổng đơn hàng:
                </Text>
                <Text style={[styles.text3, styles.ml8, styles.nHngClr]}>
                  <Text style={styles.textLayout1}>{`99.300 `}</Text>
                  <Text style={styles.textLayout}>đ</Text>
                </Text>
              </View>
              <View
                style={[styles.buttonAction, styles.mt8, styles.buttonFlexBox]}>
                <ButtonOrder type={'secondary-outline'} />
                <ButtonOrder type={'primary'} />
              </View>
            </View>
            <View style={[styles.oderItemShadowBox, styles.mt8]}>
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
                <Text style={[styles.status, styles.textLayout]}>
                  Đang xử lý
                </Text>
              </View>
              <View style={[styles.product, styles.mt8]}>
                <Image
                  style={styles.productChild}
                  resizeMode="cover"
                  source={require('../assets/rectangle-25.png')}
                />
                <View style={[styles.content1, styles.ml16]}>
                  <Text style={[styles.bnhInNg, styles.nHngTypo]}>
                    Tinh dầu Quế 10ml
                  </Text>
                  <Text style={[styles.mSnPhm, styles.mt4, styles.textLayout]}>
                    Mã sản phẩm: BDH119149
                  </Text>
                  <View style={[styles.price, styles.mt4]}>
                    <Text style={styles.text}>
                      <Text style={styles.textLayout1}>{`80.000 `}</Text>
                      <Text style={[styles.text2, styles.textLayout]}>đ</Text>
                    </Text>
                    <Text style={[styles.x3, styles.ml12, styles.textLayout]}>
                      x1
                    </Text>
                  </View>
                </View>
              </View>
              <View style={[styles.total, styles.mt8, styles.buttonFlexBox]}>
                <Text style={[styles.x3, styles.textLayout]}>
                  Tổng đơn hàng:
                </Text>
                <Text style={[styles.text3, styles.ml8, styles.nHngClr]}>
                  <Text style={styles.textLayout1}>{`99.300 `}</Text>
                  <Text style={styles.textLayout}>đ</Text>
                </Text>
              </View>
              <View
                style={[styles.buttonAction, styles.mt8, styles.buttonFlexBox]}>
                <ButtonOrder type={'secondary-outline'} />
                <ButtonOrder type={'primary'} />
              </View>
            </View>
            <View
              style={[styles.oderItem5, styles.mt8, styles.oderItemShadowBox]}>
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
                    <Text style={[styles.bnhInNg, styles.nHngTypo]}>
                      Hạt sen Huế sấy ăn liền
                    </Text>
                    <Text
                      style={[styles.mSnPhm, styles.mt4, styles.textLayout]}>
                      Mã sản phẩm: 1746603586-164627...
                    </Text>
                    <View style={[styles.price, styles.mt4]}>
                      <Text style={styles.text}>
                        <Text style={styles.textLayout1}>{`70.000 `}</Text>
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
                    <Text style={[styles.bnhInNg, styles.nHngTypo]}>
                      Bánh sen chấy cuộn lò than hoa
                    </Text>
                    <Text
                      style={[styles.mSnPhm, styles.mt4, styles.textLayout]}>
                      Mã sản phẩm: 8936193480157
                    </Text>
                    <View style={[styles.price, styles.mt4]}>
                      <Text style={styles.text}>
                        <Text style={styles.textLayout1}>{`54.000 `}</Text>
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
                <Text style={[styles.x3, styles.textLayout]}>
                  Tổng đơn hàng:
                </Text>
                <Text style={[styles.text3, styles.ml8, styles.nHngClr]}>
                  <Text style={styles.textLayout1}>{`215.500 `}</Text>
                  <Text style={styles.textLayout}>đ</Text>
                </Text>
              </View>
              <View
                style={[
                  styles.buttonAction5,
                  styles.mt8,
                  styles.buttonFlexBox,
                ]}>
                <View
                  style={[
                    styles.button10,
                    styles.buttonBorder,
                    styles.buttonBorder1,
                  ]}>
                  <Text style={[styles.hyNHng, styles.textLayout1]}>
                    Hủy đơn hàng
                  </Text>
                </View>
                <View style={[styles.button1, styles.ml8, styles.buttonBorder]}>
                  <Text
                    style={[styles.xcNhnN, styles.nHngClr, styles.textLayout1]}>
                    In hóa đơn
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={[styles.oderItem5, styles.mt8, styles.oderItemShadowBox]}>
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
                  <Text style={[styles.bnhInNg, styles.nHngTypo]}>
                    Trà vả gừng – Hộp 40g - 35 hộp/ thùng
                  </Text>
                  <Text style={[styles.mSnPhm, styles.mt4, styles.textLayout]}>
                    Mã sản phẩm: BDH65742
                  </Text>
                  <View style={[styles.price, styles.mt4]}>
                    <Text style={styles.text}>
                      <Text style={styles.textLayout1}>{`25.000 `}</Text>
                      <Text style={[styles.text2, styles.textLayout]}>đ</Text>
                    </Text>
                    <Text style={[styles.x3, styles.ml12, styles.textLayout]}>
                      x2
                    </Text>
                  </View>
                </View>
              </View>
              <View style={[styles.total, styles.mt8, styles.buttonFlexBox]}>
                <Text style={[styles.x3, styles.textLayout]}>
                  Tổng đơn hàng:
                </Text>
                <Text style={[styles.text3, styles.ml8, styles.nHngClr]}>
                  <Text style={styles.textLayout1}>{`69.300 `}</Text>
                  <Text style={styles.textLayout}>đ</Text>
                </Text>
              </View>
              <View
                style={[
                  styles.buttonAction5,
                  styles.mt8,
                  styles.buttonFlexBox,
                ]}>
                <View
                  style={[
                    styles.button10,
                    styles.buttonBorder,
                    styles.buttonBorder1,
                  ]}>
                  <Text style={[styles.hyNHng, styles.textLayout1]}>
                    Hủy đơn hàng
                  </Text>
                </View>
                <View style={[styles.button1, styles.ml8, styles.buttonBorder]}>
                  <Text
                    style={[styles.xcNhnN, styles.nHngClr, styles.textLayout1]}>
                    In hóa đơn
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.navigationBar}>
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
                  styles.nHngTypo,
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
                  styles.nHngTypo,
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
                  styles.nHngTypo,
                ]}>
                Thống kê
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
      <RBSheet
        ref={refRBSheet}
        height={480}
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
          onClose={() => {
            refRBSheet.current.close();
          }}
        />
      </RBSheet>
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
    bottom: '50%',
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
    zIndex: 10,
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
    top: 90,
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
    paddingTop: 150,
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
    height: 1246,
    overflow: 'hidden',
    width: '100%',
    flex: 1,
  },
});

export default ProccessingOrder;
