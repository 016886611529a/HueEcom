import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  FlatList,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import ItemCategory from '../components/category/item_category';
import {COLORS, FontFamily, FontWeight, SIZES} from '../constants/theme';
import {useDispatch, useSelector} from 'react-redux';
import {
  categoryAction,
  getProductsByCategoryIdActions,
} from '../actions/category_action/category_action';
import {useNavigation} from '@react-navigation/native';
import icBack from '../assets/svg/icBack.svg';
import SvgIcon from '../common/SvgIcon';

const CategoriesScreen = ({route, navigation}) => {
  const screenWidth = Dimensions.get('window').width / 1.1;

  // const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(categoryAction());
  }, []);

  const categories = useSelector(state => state.categories.categories);
  console.log('DANH MỤC', categories);

  const renderCategoryItem = ({item}) => {
    return (
      <ItemCategory
        categoriesName={item.TenNganhHang}
        onClick={() => {
          dispatch(getProductsByCategoryIdActions(item.ID));
          console.log('DANH MỤC ID', item.ID);
          navigation.navigate('detailCategory', {
            categoryName: item.TenNganhHang,
            categoryId: item.ID,
          });
        }}
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
        <View style={{flexDirection: 'row', marginVertical: 15, top: 15}}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={styles.icon}>
            <SvgIcon Icon={icBack} />
          </TouchableOpacity>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={styles.txtTitle}>Danh mục sản phẩm</Text>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.body}>
        <View style={[styles.flatListContainer]}>
          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            numColumns={3}
          />
        </View>
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
    flex: 0.1,
    // backgroundColor: 'blue',

    alignItems: 'center',
  },
  icon: {
    left: 10,
    top: 5,
  },
  txtTitle: {
    fontFamily: FontFamily.roboto,
    fontWeight: FontWeight.fontWeightBold,
    fontSize: SIZES.h2,
    color: COLORS.white,
    top: 5,
  },
  body: {
    flex: 0.9,
    marginHorizontal: 20,
    marginVertical: 25,
  },
  flatListContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: COLORS.white,
    // backgroundColor: 'red',
    borderRadius: 8,
    // overflow: 'hidden',
    elevation: 3,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
});

export default CategoriesScreen;
