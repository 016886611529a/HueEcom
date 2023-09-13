import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Linking,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import icBack from '../assets/svg/icBack.svg';
import SvgIcon from '../common/SvgIcon';
import {COLORS, FontFamily, FontWeight, SIZES} from '../constants/theme';
import {useNavigation, useRoute} from '@react-navigation/native';
import ComponentSearch from '../components/search';
import icFilter from '../assets/svg/ic_filter.svg';
import {ModalPopupSuccess} from '../components/modal_popup';
import {useDispatch, useSelector} from 'react-redux';
import {
  clearData,
  searchProductsAction,
} from '../actions/search_product_actions';
import {domainDev, domains} from '../configs/app.config';
import ItemProduct from '../components/products/itemProduct';
import {CustomBottomSheet} from '../components/bottom_sheet_custom';
import {filterProductAction} from '../actions/filter_product_action';
import {getAllProductAction} from '../actions/product/get_all_product_action';

const SearchProductScreen = ({navigation, params}) => {
  const [appBarMargin, setAppBarMargin] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(0);
  const [filter, setFilter] = useState(null);
  const perPage = 10;
  const route = useRoute();

  // const {isFocus} = route.params?.isFocus || {isFocus: false};
  if (route.params == undefined) {
    useEffect(() => {
      toggleBottomSheet();
    }, []);
  }

  const [keyboardIsShow, setkeyboardIsShow] = useState(false);
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setkeyboardIsShow(true);
    });
    Keyboard.addListener('keyboardDidHide', () => {
      setkeyboardIsShow(false);
    });
  }, [Keyboard]);
  const dispatch = useDispatch();
  const searchProducts = useSelector(
    state => state.searchProducts?.searchProducts,
  );

  useEffect(() => {
    dispatch(searchProductsAction('', 0, perPage));
    setKeyword('');
    setFilter(null);
    setPage(0);
  }, []);

  const loading = useSelector(state => state.searchProducts?.loading);
  const loadingMore = useSelector(state => state.searchProducts.loadingMore);
  const error = useSelector(state => state.searchProducts?.error);

  const handleSearch = keyWord => {
    dispatch(searchProductsAction(keyWord, 0, perPage));
    setKeyword(keyWord);
    setFilter(null);
    setPage(0);
  };

  const handleLoadMore = () => {
    if (!loading && !loadingMore && searchProducts.length >= page * perPage) {
      loadMoreData();
    }
  };

  const loadMoreData = () => {
    if(filter != null) {
      dispatch(filterProductAction(filter, page + 1, perPage));
    } else {
      dispatch(searchProductsAction(keyword, page + 1, perPage));
    }
    
    setPage(page => page + 1);
  };

  const renderFooter = () => {
    return loadingMore ? (
      <ActivityIndicator size="large" color={COLORS.primaryBlue} />
    ) : null;
  };

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
        productName={item?.infoSanPham?.TenSanPham}
        companyName={item.sanTMDT?.[0]?.TenDoanhNghiep}
        price={item?.infoSanPham?.DonGia}
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
  const [isModalVisible, setModalVisible] = useState(false);
  // const navigation = useNavigation();

  useEffect(() => {
    navigation
      .getParent()
      ?.setOptions({tabBarStyle: {display: 'none'}, tabBarVisible: false});
    return () => {
      navigation
        .getParent()
        ?.setOptions({tabBarStyle: undefined, tabBarVisible: undefined});
    };
  }, [navigation]);
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

  const toggleBottomSheet = () => {
    setBottomSheetVisible(!isBottomSheetVisible);
  };
  const closeBottomSheet = () => {
    setBottomSheetVisible(false);
  };
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);

    if(filter != null) {
      dispatch(filterProductAction(filter, 0, perPage)).then(() => {
        setRefreshing(false);
      })
      .catch(() => {
        setRefreshing(false);
      });
    } else {
      dispatch(searchProductsAction(keyword, 0, perPage)).then(() => {
        setRefreshing(false);
      })
      .catch(() => {
        setRefreshing(false);
      });
      setPage(0);
    }
  };
  const onFilterBottomSheet = data => {
    setBottomSheetVisible(false);
    dispatch(filterProductAction(data, 0, perPage));
    setFilter(data);
    setPage(0);
  };
  useEffect(() => {
    toggleBottomSheet;
  }, [toggleBottomSheet]);
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      <View style={{flex: 12}}>
        <ImageBackground
          resizeMode="stretch"
          source={require('../assets/images/appbar1.png')}
          style={styles.appBar}
          imageStyle={styles.backgroundImage}>
          <View style={styles.headerAppBar}>
            <TouchableOpacity
              onPress={() => {
                dispatch(clearData());
                navigation.pop();
              }}
              style={styles.icon}>
              <SvgIcon Icon={icBack} />
            </TouchableOpacity>
            <View style={{flex: 1, alignItems: 'center'}}>
              <ComponentSearch onSearch={handleSearch} isFocus={true} />
            </View>
            <TouchableOpacity style={styles.filter} onPress={toggleBottomSheet}>
              <SvgIcon Icon={icFilter} />
              {/* <Text style={styles.filterText}>Lọc</Text> */}
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
      {keyboardIsShow == false ? (
        <View style={styles.body}>
          {loading ? (
            <View
              style={{
                paddingTop: 350,
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <ActivityIndicator size="large" color={COLORS.primaryBlue} />
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
          ) : searchProducts?.length == 0 ? (
            <View
              style={{
                alignSelf: 'center',
                marginVertical: 200,
              }}>
              <Text>Không có sản phẩm bạn muốn tìm!</Text>
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
          {isBottomSheetVisible && (
            <CustomBottomSheet
              title={'Bộ lọc'}
              onClose={closeBottomSheet}
              onFilter={onFilterBottomSheet}
            />
          )}
        </View>
      ) : (
        <View style={{flex: 50, marginHorizontal: 20, marginVertical: 20}}>
          {loading ? (
            <View
              style={{
                paddingTop: 350,
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <ActivityIndicator size="large" color={COLORS.primaryBlue} />
            </View>
          ) : error ? (
            <Text
              style={{
                paddingTop: 350,
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              Không có dữ liệu!{' '}
            </Text>
          ) : searchProducts?.length == 0 ? (
            <View
              style={{
                alignSelf: 'center',
                marginVertical: 200,
              }}>
              <Text>Không có sản phẩm bạn muốn tìm!</Text>
            </View>
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={searchProducts}
              renderItem={renderItem}
              numColumns={2}
              columnWrapperStyle={{justifyContent: 'space-between'}}
            />
          )}
          {isBottomSheetVisible && (
            <CustomBottomSheet
              title={'Bộ lọc'}
              onClose={closeBottomSheet}
              onFilter={onFilterBottomSheet}
            />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 100,
    backgroundColor: COLORS.backGround,
  },
  appBar: {
    flex: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerAppBar: {
    position: 'absolute',

    flexDirection: 'row',
    marginHorizontal: 16,
    bottom: 15,
  },
  icon: {
    top: 8,
  },
  body: {
    flex: 88,
    marginHorizontal: 20,
    marginVertical: 20,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  filter: {
    borderColor: COLORS.white,
    borderWidth: 1,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    padding: 6.5,
  },
});

export default SearchProductScreen;
