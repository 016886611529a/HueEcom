import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  Linking,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  RefreshControl,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import icBack from '../assets/svg/icBack.svg';
import SvgIcon from '../common/SvgIcon';
import ItemProduct from '../components/products/itemProduct';
import {domains} from '../configs/app.config';
import {COLORS, FontFamily, FontWeight, SIZES} from '../constants/theme';
import {productByCompanyRequestByIdAction} from '../actions/product/get_product_by_company_action';
import ShimmerItem from '../common/shimmer_loading/shimmer_loading';
const ProductWithCompany = () => {
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
  const dispatch = useDispatch();
  const productByCompany = useSelector(
    state => state.productByCompany?.productByCompany,
  );
  useEffect(() => {
    dispatch(productByCompanyRequestByIdAction(IdDoanhNghiep));
  }, []);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    dispatch(productByCompanyRequestByIdAction(IdDoanhNghiep))
      .then(() => {
        setRefreshing(false);
      })
      .catch(() => {
        setRefreshing(false);
      });
  };
  const loading = useSelector(state => state.productByCompany?.loading);
  const error = useSelector(state => state.productByCompany?.error);

  const renderItem = ({item}) => {
    if (!item.infoSanPham) {
      return null;
    }
    let avatar = {uri: domains + item.infoSanPham?.Avatar};

    let logo = {uri: domains + item.sanTMDT?.[0]?.logoSan};
    if (!avatar || !logo) {
      return null;
    }
    const openLink = () => {
      if (item?.sanTMDT?.[0]?.LinkSpSan) {
        Linking.openURL(item?.sanTMDT?.[0]?.LinkSpSan);
      } else {
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
          navigation.navigate('Detail_product', {
            productId: item.infoSanPham?.ID,
          });
        }}
        openLink={openLink}
      />
    );
  };

  const navigation = useNavigation();
  const route = useRoute();
  const {companyName, IdDoanhNghiep} = route.params;
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
            <Text style={styles.txtTitle}>{companyName}</Text>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.body}>
        {loading ? (
          <View style={{flexDirection: 'row', top: 35}}>
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
            data={productByCompany}
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
    textAlign: 'center',
    textAlignVertical: 'center',
    bottom: 0,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 0.88,
    marginHorizontal: 10,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductWithCompany;
