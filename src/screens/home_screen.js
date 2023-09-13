import React, {useEffect, useState, useCallback} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ImageBackground,
  Linking,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
  Alert,
} from 'react-native';
import icFilter from '../assets/svg/ic_filter.svg';

import {useDispatch, useSelector} from 'react-redux';
import {categoryAction} from '../actions/category_action/category_action';
import {getAllProductAction} from '../actions/product/get_all_product_action';
import icSearch from '../assets/svg/ic_search.svg';
import SvgIcon from '../common/SvgIcon';
import ItemProduct from '../components/products/itemProduct';
import {domain, domains} from '../configs/app.config';
import {COLORS, FontFamily, FontWeight, SIZES} from '../constants/theme';
import ShimmerItem from '../common/shimmer_loading/shimmer_loading';
import {mainProductsAction} from '../actions/search_product_actions';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logout from '../assets/svg/ic_logout.svg';
const HomeScreen = ({route, navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const perPage = 10;
  const handleLogOut = async () => {
    try {
      await AsyncStorage.removeItem('access_token');
      await AsyncStorage.removeItem('refresh_token');
      await AsyncStorage.removeItem('data');
      await AsyncStorage.removeItem('type');
      navigation.replace('Main');
    } catch (error) {
      console.error('Error while logging out:', error);
    }
  };
  const loadMoreData = () => {
    dispatch(mainProductsAction('', page + 1, perPage));
    setPage(page => page + 1);
  };

  const renderFooter = () => {
    return loadingMore ? (
      <ActivityIndicator size="small" color={COLORS.primaryBlue} />
    ) : null;
  };

  const handleLoadMore = () => {
    if (!loading && !loadingMore && searchProducts.length >= page * perPage) {
      loadMoreData();
    }
  };
  const onRefresh = () => {
    setRefreshing(true);
    dispatch(mainProductsAction('', 0, 10))
      .then(() => {
        setRefreshing(false);
      })
      .catch(() => {
        setRefreshing(false);
      });
    setPage(0);
  };

  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const screenWidth = Dimensions.get('window').width;
  const errorProducts = useSelector(state => state.getAllProducts.error);
  const searchProducts = useSelector(
    state => state.mainProducts.searchProducts,
  );

  useEffect(() => {
    dispatch(mainProductsAction('', 0, perPage));
    setPage(0);
  }, []);

  // const {isFocus} = route.params?.isFocus || {isFocus: false};
  const toggleBottomSheet = () => {
    navigation.push('Search');

    setBottomSheetVisible(!isBottomSheetVisible);
  };
  useEffect(() => {
    dispatch(categoryAction());
  }, []);
  const [selectedItemId, setSelectedItemId] = useState('');

  const loading = useSelector(state => state.mainProducts.loading);
  const loadingMore = useSelector(state => state.mainProducts.loadingMore);
  const error = useSelector(state => state.mainProducts.error);
  const dispatch = useDispatch();
  // const {products, loading, error} = useSelector(state => state);
  const products = useSelector(state => state.getAllProducts?.products);

  const renderItem = ({item}) => {
    let avatar = {uri: domains + item.infoSanPham?.Avatar};

    let logo = {uri: domains + item?.sanTMDT?.[0]?.logoSan};
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
        companyName={item?.sanTMDT?.[0]?.TenDoanhNghiep}
        price={item.infoSanPham?.DonGia}
        logo={logo}
        onClick={() => {
          // dispatch(getAllProductAction(item.infoSanPham?.ID));
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
        // resizeMode="contain"
        source={require('../assets/images/appbar.jpg')}
        style={styles.appBar}
        imageStyle={[{width: '100%'}, {width: screenWidth}]}>
        <View style={[styles.headerAppBar, {flexDirection: 'row', bottom: 30}]}>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={styles.txtTitle}>HueEcom</Text>
          </View>
          <TouchableOpacity
            style={{
              position: 'absolute',
              borderColor: COLORS.white,
              borderWidth: 1,
              borderRadius: 4,
              padding: 5,
              right: 5,
            }}
            onPress={() => {
              Alert.alert(
                '',
                'Bạn có muốn đăng xuất khỏi tài khoản?',
                [
                  {
                    text: 'Hủy',
                    style: 'cancel',
                  },
                  {
                    text: 'Đồng ý',
                    onPress: handleLogOut,
                  },
                ],
                {cancelable: false},
              );
            }}>
            <SvgIcon Icon={Logout} />
          </TouchableOpacity>
        </View>
        <View
          style={[
            {
              flexDirection: 'row',
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
              top: 90,
            },
            {width: screenWidth},
          ]}>
          {/* <TouchableOpacity style={{}} onPress={async ()=> {
              try {
                await AsyncStorage.removeItem('access_token');
              } catch {}
              try {
                await AsyncStorage.removeItem('refresh_token');
              } catch {}
              try {
                await AsyncStorage.removeItem('data');
              } catch {}
              try {
                await AsyncStorage.removeItem('type');
              } catch {}
              navigation.replace('Main');
          }}>
            <Text>Thoát</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              navigation.push('Search', {onSearch: 1});
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: COLORS.white,
              borderRadius: 8,
              paddingHorizontal: 12,
              height: 40,
              width: '77%',
              position: 'relative',
            }}>
            <SvgIcon Icon={icSearch} style={styles.icon} />
            <Text
              style={{
                color: COLORS.textColor,
                opacity: 0.5,
                marginHorizontal: 15,
              }}>
              Tìm kiếm sản phẩm
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filter} onPress={toggleBottomSheet}>
            <SvgIcon Icon={icFilter} size={24} />
          </TouchableOpacity>
        </View>
      </ImageBackground>

      <View style={styles.body}>
        {/* <ShimmerItem /> */}
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
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={searchProducts}
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
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.1}
            ListFooterComponent={renderFooter}
          />
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
  appBar: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerAppBar: {
    // top: 0,
    marginHorizontal: 25,
  },
  icon: {},
  txtTitle: {
    fontFamily: FontFamily.roboto,
    fontWeight: FontWeight.fontWeightBold,
    fontSize: SIZES.h2,
    color: COLORS.white,
    // bottom: 0,
    position: 'absolute',
  },
  body: {
    flex: 0.8,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  filter: {
    borderColor: COLORS.white,
    borderWidth: 1,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 8,
  },
});

export default HomeScreen;
