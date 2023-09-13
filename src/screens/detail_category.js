import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  ImageBackground,
  Linking,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import icBack from '../assets/svg/icBack.svg';
import SvgIcon from '../common/SvgIcon';
import ItemProduct from '../components/products/itemProduct';
import {domain, domains} from '../configs/app.config';
import {COLORS, FontFamily, FontWeight, SIZES} from '../constants/theme';
import {getProductsByCategoryIdActions} from '../actions/category_action/category_action';
import ShimmerItem from '../common/shimmer_loading/shimmer_loading';

const DetailCategory = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const {categoryName, categoryId} = route.params;
  const productByIdCategory = useSelector(
    state => state.getProductsByIdCategory?.productsByIdCategory,
  );
  useEffect(() => {
    dispatch(getProductsByCategoryIdActions(categoryId)); // Replace 'categoryId' with the actual category ID you want to fetch
  }, []);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getProductsByCategoryIdActions(categoryId))
      .then(() => {
        setRefreshing(false);
      })
      .catch(() => {
        setRefreshing(false);
      });
  };
  const loading = useSelector(state => state.getProductsByIdCategory?.loading);
  const error = useSelector(state => state.getProductsByIdCategory?.error);
  // console.log('PRODUCT BY ID', productByIdCategory);
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
        bought={item.SoLuongDaBan}
        image={avatar}
        productName={item.infoSanPham?.TenSanPham}
        companyName={item.sanTMDT?.[0]?.TenDoanhNghiep}
        price={item.infoSanPham?.DonGia}
        logo={logo}
        onClick={() => {
          console.log('click');
          navigation.navigate('Detail_product', {
            productId: item.infoSanPham?.ID,
          });
        }}
        openLink={openLink}
      />
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      <ImageBackground
        resizeMode="stretch"
        source={require('../assets/images/appbar1.png')}
        style={styles.appBar}
        imageStyle={styles.backgroundImage}>
        <View style={styles.headerAppBar}>
          <TouchableOpacity
            onPress={() => {
              navigation.pop();
            }}
            style={styles.icon}>
            <SvgIcon Icon={icBack} />
          </TouchableOpacity>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={styles.txtTitle}>{categoryName}</Text>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.body}>
        {loading ? (
          <View style={{flexDirection: 'row'}}>
            {[...Array(2)].map((_, rowIndex) => (
              <View key={rowIndex} style={{flex: 1}}>
                {[...Array(2)].map((_, colIndex) => (
                  <ShimmerItem key={colIndex} />
                ))}
              </View>
            ))}
          </View>
        ) : error ? (
          <View
            style={{
              alignSelf: 'center',
              marginVertical: 200,
              flexDirection: 'row',
            }}>
            <Text>Không tải được dữ liệu! Vui lòng</Text>
            <TouchableOpacity activeOpacity={0.8} onPress={onRefresh}>
              <Text
                style={{
                  color: COLORS.primaryBlue,
                  fontWeight: '500',
                  textDecorationLine: 'underline',
                }}>
                {' '}
                tải lại trang
              </Text>
            </TouchableOpacity>
          </View>
        ) : productByIdCategory && productByIdCategory.length > 0 ? (
          // Render the product list
          <FlatList
            showsVerticalScrollIndicator={false}
            data={productByIdCategory}
            renderItem={renderItem}
            numColumns={2}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[COLORS.primaryBlue]} // Customize the colors of the loading spinner
              />
            }
          />
        ) : (
          <Text style={styles.noProductsText}>
            Hiện chưa có sản phẩm nào, vui lòng quay lại sau!
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backGround,
  },
  txt: {justifyContent: 'center'},
  appBar: {
    flex: 0.12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerAppBar: {
    flexDirection: 'row',
    marginHorizontal: 16,
    top: 15,
  },
  icon: {},
  txtTitle: {
    fontFamily: FontFamily.roboto,
    fontWeight: FontWeight.fontWeightBold,
    fontSize: SIZES.h2,
    color: COLORS.white,
    bottom: 0,
  },
  body: {
    flex: 0.88,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  noProductsText: {
    fontSize: SIZES.h4,
    fontFamily: FontFamily.roboto,
    fontWeight: FontWeight.fontWeightBold,
    color: COLORS.primaryBlue,
    alignSelf: 'center',
    marginVertical: 200,
    justifyContent: 'center',
  },
});

export default DetailCategory;
