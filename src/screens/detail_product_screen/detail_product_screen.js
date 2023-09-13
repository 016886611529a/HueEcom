import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {COLORS, FontFamily, SIZES} from '../../constants/theme';

import {useRoute} from '@react-navigation/native';
import HTML from 'react-native-render-html';
import {useDispatch, useSelector} from 'react-redux';
import {detailProductRequestByIdAction} from '../../actions/product/detail_product_action';
import {productByCompanyRequestByIdAction} from '../../actions/product/get_product_by_company_action';
import {productSuggestAction} from '../../actions/product/get_product_suggest_action';
import icBack from '../../assets/svg/icBack.svg';
import SvgIcon from '../../common/SvgIcon';
import ItemProduct from '../../components/products/itemProduct';
import {domain, domains} from '../../configs/app.config';
import ItemDescribeProduct from './item_describe_product';
import ItemInfoProduct from './item_detail_product';
import ItemHeaderDetailProduct from './item_header_detail_product';
import ItemSuggestProduct from './item_suggest_product';
import ShimmerItem from '../../common/shimmer_loading/shimmer_loading';
import ShimmerHeader from '../../common/shimmer_loading/shimmer_header_detail';
import SkeletonItemHeaderDetailProduct from '../../common/shimmer_loading/shimmer_header_detail';
import SkeletonItemDescribeProduct from '../../common/shimmer_loading/shimmer_item_describeProduct';
import SkeletonItemInfoProduct from '../../common/shimmer_loading/shimmer_item_inforProduct';

const DetailProductScreen = ({navigation}) => {
  const htmlStyles = {
    p: {
      fontFamily: 'Roboto',
      fontSize: 16,
      lineHeight: 24,
      color: COLORS.primaryBlue,
    },
    strong: {
      fontFamily: 'Roboto',

      color: COLORS.primaryBlue,
    },
    br: {
      fontFamily: 'Roboto',

      color: COLORS.primaryBlue,
    },
    li: {
      fontFamily: 'Roboto',

      color: COLORS.primaryBlue,
    },
    ul: {
      fontFamily: 'Roboto',
      // opacity: 0.5,
      color: COLORS.primaryBlue,
    },
  };
  // sản phẩm gợi ý
  const productSuggest = useSelector(
    state => state.productSuggest?.productSuggest,
  );
  const loadingProductSuggest = useSelector(
    state => state.productSuggest?.loading,
  );
  const errorProductSuggest = useSelector(state => state.productSuggest?.error);

  useEffect(() => {
    dispatch(
      productSuggestAction(detailProduct?.infoSanPham?.IdNganhHangHueEcom),
    );
  }, []);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    dispatch(detailProductRequestByIdAction(productId))
      .then(() => {
        setRefreshing(false);
      })
      .catch(() => {
        setRefreshing(false);
      });
  };
  const screenWidth = Dimensions.get('window').width;

  const categories = useSelector(state => state.categories.categories);
  const categoryId = detailProduct?.infoSanPham?.IdNganhHangHueEcom;
  const category = categories.find(
    category => category.IdNganhHangHueEcom === categoryId,
  );
  const categoryName = category ? category.TenNganhHang : '';

  const dispatch = useDispatch();
  const route = useRoute();
  const detailProduct = useSelector(
    state => state.detailProduct?.detailProduct,
  );
  const loadingDetailProduct = useSelector(
    state => state.detailProduct?.loading,
  );
  const errorDetailProduct = useSelector(state => state.detailProduct?.error);

  const {productId} = route.params;

  useEffect(() => {
    dispatch(detailProductRequestByIdAction(productId));
  }, []);
  const companyName = detailProduct?.sanTMDT?.[0]?.TenDoanhNghiep || '';
  const describeContent = detailProduct?.infoSanPham?.MoTa;
  const renderHTMLContent = () => {
    if (!describeContent) {
      return null; // You can render a placeholder or an empty view here
    }
    return (
      <HTML
        source={{
          html: describeContent,
        }}
        contentWidth={Dimensions.get('window').width}
        baseFontStyle={styles.txt}
        tagsStyles={htmlStyles}
      />
    );
  };
  useEffect(() => {
    describeContent;
  }, [describeContent]);
  const openLink = () => {
    if (detailProduct?.sanTMDT?.[0]?.LinkSpSan) {
      Linking.openURL(detailProduct?.sanTMDT?.[0]?.LinkSpSan);
    } else {
      // Alert.alert('Sản phẩm chưa được liên kết');
    }
  };

  const [carouselImages, setCarouselImages] = useState([]);

  useEffect(() => {
    if (detailProduct?.infoSanPham?.Pictures) {
      const images = detailProduct.infoSanPham.Pictures.split(',');
      setCarouselImages(images);
    }
  }, [detailProduct?.infoSanPham?.Pictures]);

  let logo = {uri: domains + detailProduct?.sanTMDT?.[0]?.logoSan};
  if (!logo) {
    return null;
  }

  const renderCarouselItem = ({item}) => (
    <Image
      source={{uri: domains + item}}
      resizeMode="cover"
      style={styles.carouselImage}
    />
  );

  //product suggest
  const renderItem = ({item}) => {
    let avatar = {uri: domains + item.infoSanPham?.Avatar};

    let logo = {uri: domains + item.sanTMDT?.[0]?.logoSan};
    if (!avatar || !logo) {
      return null;
    }
    const openLink = () => {
      if (item?.sanTMDT?.[0]?.LinkSpSan) {
        Linking.openURL(item?.sanTMDT?.[0]?.LinkSpSan);
      } else {
        // Alert.alert('Sản phẩm chưa được liên kết');
      }
    };
    return (
      <ItemProduct
        bought={item?.SoLuongDaBan}
        image={avatar}
        productName={item.infoSanPham?.TenSanPham}
        companyName={item.sanTMDT?.[0]?.TenDoanhNghiep}
        price={item.infoSanPham?.DonGia}
        logo={logo}
        onClick={() => {
          navigation.push('Detail_product', {
            productId: item.infoSanPham?.ID,
          });
        }}
        openLink={openLink}
      />
    );
  };
  return (
    <View style={styles.container}>
      {/* <SkeletonItemHeaderDetailProduct /> */}
      {/* <SkeletonItemDescribeProduct /> */}
      {/* <SkeletonItemInfoProduct /> */}
      <View style={styles.backButton}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            navigation.goBack();
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              top: 2,
              right: 1,
            }}>
            <SvgIcon Icon={icBack} />
          </View>
        </TouchableOpacity>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={[
          {key: 'header'},
          // {key: 'carousel'},
          {key: 'describe'},
          {key: 'info'},
          {key: 'company'},
          {key: 'suggest'},
        ]}
        renderItem={({item}) => {
          if (item.key === 'header') {
            return loadingDetailProduct ? (
              <View style={{}}>
                <SkeletonItemHeaderDetailProduct />
              </View>
            ) : errorDetailProduct ? (
              <View style={{alignSelf: 'center', marginVertical: 200}}>
                <Text>Không có dữ liệu! Vui lòng tải lại trang</Text>
              </View>
            ) : (
              <ItemHeaderDetailProduct
                sliderImage={
                  <Carousel
                    data={carouselImages}
                    renderItem={renderCarouselItem}
                    sliderWidth={screenWidth}
                    itemWidth={screenWidth}
                    loop={true}
                    autoplay={true}
                  />
                }
                productName={detailProduct.infoSanPham?.TenSanPham}
                price={detailProduct?.infoSanPham?.DonGia}
                logo={logo}
                openLink={openLink}
              />
            );
          } else if (item.key === 'describe') {
            return loadingDetailProduct ? (
              <View style={{}}>
                <SkeletonItemDescribeProduct />
              </View>
            ) : errorDetailProduct ? (
              <View style={{alignSelf: 'center', marginVertical: 200}}>
                <Text>Không có dữ liệu! Vui lòng tải lại trang</Text>
              </View>
            ) : (
              <ItemDescribeProduct content={renderHTMLContent()} />
            );
          } else if (item.key === 'info') {
            return loadingDetailProduct ? (
              <View style={{}}>
                <SkeletonItemInfoProduct />
              </View>
            ) : errorDetailProduct ? (
              <View style={{alignSelf: 'center', marginVertical: 200}}>
                <Text>Không có dữ liệu! Vui lòng tải lại trang</Text>
              </View>
            ) : (
              <ItemInfoProduct
                category={detailProduct.infoSanPham?.TenNganhHang}
                height={detailProduct.infoSanPham?.ChieuCao}
                length={detailProduct.infoSanPham?.ChieuDai}
                netWeight={detailProduct.infoSanPham?.KhoiLuong}
                quantity={detailProduct.infoSanPham?.SoLuongTon}
                unit={detailProduct.infoSanPham?.DonVi}
                width={detailProduct.infoSanPham?.ChieuRong}
              />
            );
          } else if (item.key === 'company') {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  dispatch(
                    productByCompanyRequestByIdAction(
                      detailProduct?.sanTMDT?.[0]?.IdDoanhNghiep,
                    ),
                  );
                  navigation.navigate('product_with_company', {
                    companyName: companyName,
                    IdDoanhNghiep: detailProduct?.sanTMDT?.[0]?.IdDoanhNghiep,
                  });
                }}
                style={[styles.inforCompany, {width: screenWidth}]}>
                {/* <Text style={styles.title}>Thông tin doanh nghiệp</Text> */}
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      marginHorizontal: 16,
                      marginVertical: 5,
                      fontFamily: FontFamily.roboto,
                      fontWeight: '500',
                      fontSize: SIZES.h4,
                      color: COLORS.textColor,
                    }}>
                    {companyName}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          } else if (item.key === 'carousel') {
            return (
              <View>
                <Carousel
                  data={carouselImages}
                  renderItem={renderCarouselItem}
                  sliderWidth={screenWidth}
                  itemWidth={screenWidth}
                  loop={true}
                  autoplay={true}
                />
              </View>
            );
          } else if (item.key === 'suggest') {
            return loadingProductSuggest ? (
              <View style={{flexDirection: 'row', left: 15}}>
                {[...Array(2)].map((_, rowIndex) => (
                  <View key={rowIndex} style={{flex: 1}}>
                    {[...Array(2)].map((_, colIndex) => (
                      <ShimmerItem key={colIndex} />
                    ))}
                  </View>
                ))}
              </View>
            ) : errorProductSuggest ? (
              <View style={{alignSelf: 'center', marginVertical: 200}}>
                <Text>Không có dữ liệu! Vui lòng tải lại trang</Text>
              </View>
            ) : (
              <ItemSuggestProduct
                products={
                  <View>
                    <FlatList
                      data={productSuggest?.slice(0, 4) || []}
                      renderItem={renderItem}
                      numColumns={2}
                      columnWrapperStyle={{justifyContent: 'space-between'}}
                    />
                  </View>
                }
              />
            );
          }
        }}
        keyExtractor={item => item.key}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.primaryBlue]} // Customize the colors of the loading spinner
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.backGround,
  },
  txt: {
    lineHeight: 24,
    marginVertical: 5,
    color: 'red',
  },
  carouselImage: {
    width: '100%',
    height: 350,
  },
  btn: {
    width: 30,
    height: 30,
    backgroundColor: '#000000',
    opacity: 0.5,
    borderRadius: 15,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 10,
    zIndex: 1,
  },
  inforCompany: {
    marginVertical: 15,
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    elevation: 1.5,
    shadowColor: COLORS.primaryBlue,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  title: {
    marginHorizontal: 16,
    marginVertical: 5,
    fontFamily: FontFamily.roboto,
    fontWeight: 'bold',
    fontSize: SIZES.h4,
    color: COLORS.textColor,
  },
});

export default DetailProductScreen;
