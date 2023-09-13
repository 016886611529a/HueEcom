import React, {useEffect, useState, useRef} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ScrollView,
} from 'react-native';
import IcClose from '../assets/svg/close.svg';
import SvgIcon from '../common/SvgIcon';
import {COLORS, FontFamily, FontWeight, SIZES} from '../constants/theme';
import {ItemFilter} from './item_filter';
import {ItemRating} from './item_filter_rating';
import InputPrice from './input_price';
import {useDispatch, useSelector} from 'react-redux';
import {categoryAction} from '../actions/category_action/category_action';
import {getEcomAction} from '../actions/get_ecomer_action';
import {filterProductAction} from '../actions/filter_product_action';
import {domainDev} from '../configs/app.config';
import {useNavigation} from '@react-navigation/native';
import ItemProduct from './products/itemProduct';

export const CustomBottomSheet = ({title, onClose, onFilter}) => {
  const navigation = useNavigation();

  const [selected, setSelected] = useState('');
  const [selectedA, setSelectedA] = useState(false);

  const handleSearch = () => {
    onFilter({
      // GiaBatDau: '${`priceMin`}',
      GiaBatDau: priceMin,
      GiaKetThuc: priceMax,
      IdSan: selectEcom,
      IdNganhHangHueecom: selectCate,
    });
    // console.log('GiaBatDau:', priceMax);
    // console.log('GiaKetThuc', priceMin);
    // console.log('IdSan:', getEcom?.[0]?.ID);
    // console.log('IdNganhHangHueecom:', categories?.[0]?.ID);
  };
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
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

  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');

  const handlePriceMinChange = value => {
    setPriceMin(value);
    if (value != '') {
      value = value.replace('.', '');
    }
    console.log('GIÁ INPUT min', value);
  };

  const handlePriceMaxChange = value => {
    setPriceMax(value);
    if (value != '') {
      value = value.replace('.', '');
    }
    console.log('GIÁ INPUT max', value);
  };
  const priceMinRef = useRef();
  const priceMaxRef = useRef();

  const clear = () => {
    priceMinRef.current.reset();
    priceMaxRef.current.reset();
  };

  const deviceWidth = Dimensions.get('window').width;
  const deviceHeight = Dimensions.get('window').height;
  const sheetWidth = deviceWidth;
  // const sheetHeight = deviceHeight;
  const sheetHeight = deviceHeight * 0.91;
  const dispatch = useDispatch();
  // danh mục
  useEffect(() => {
    dispatch(categoryAction());
  }, []);

  const handleSelectItemCategory = text => {
    console.log(text.text);
    console.log(text.isActive);
    console.log('IDCATE', text.id);
    setSelecteCate(text.id);
  };
  const [selectCate, setSelecteCate] = useState('');
  const [selectEcom, setSelecteEcom] = useState('');
  const categories = useSelector(state => state.categories.categories);
  const renderCategoryItem = ({item}) => {
    return (
      <ItemFilter
        textItem={item.TenNganhHang}
        selectItem={handleSelectItemCategory}
        selected1={selected1}
        multi={false}
        ID={item.ID}
      />
    );
  };

  // sàn điện tử
  useEffect(() => {
    dispatch(getEcomAction());
  }, []);
  const handleSelectItemEcom = text => {
    console.log(text.text);
    console.log(text.isActive);
    console.log('IDECOM', text.id);
    // setSelecteEcom(text.id);
    const selectedIDs = selectEcom.split(',');

    // If the ID is already selected, remove it from the list
    if (selectedIDs.includes(text.id)) {
      const updatedIDs = selectedIDs.filter(id => id !== text.id);
      setSelecteEcom(updatedIDs.join(','));
    } else {
      // If the ID is not selected, add it to the list
      setSelecteEcom(
        prevSelected => (prevSelected ? prevSelected + ',' : '') + text.id,
      );
    }
    // selectedArr = selectedArr + text.id + ',';
  };

  const selected1 = (id, active) => {
    console.log(selected);
    if (selected == undefined || selected == '' || selected == id) {
      if (active) setSelected(id);
      else setSelected('');
      return true;
    }

    return false;
  };

  const selected2 = () => {
    var temp = selectedA;
    if (!selectedA) {
      setSelectedA(true);
    }

    return temp;
  };

  const getEcom = useSelector(state => state.getEcom.getEcom);
  const renderCategoryItemEcom = ({item}) => {
    return (
      <ItemFilter
        textItem={item.TenSanTMDT}
        selectItem={handleSelectItemEcom}
        selected1={selected2}
        multi={true}
        ID={item.ID}
      />
    );
  };
  const filter = useSelector(state => state.getEcom.searchProducts);
  // useEffect(() => {
  //   dispatch(
  //     filterProductAction({
  //       GiaBatDau: priceMax,
  //       GiaKetThuc: priceMin,
  //       IdSan: getEcom?.[0]?.ID,
  //       IdNganhHangHueecom: categories?.[0]?.ID,
  //     }),
  //   );
  // }, [filter]);

  // console.log('ID DANH MỤC', categories?.[0]?.ID);
  // console.log('SÀN ID', getEcom?.[0]?.ID);
  // console.log('GiaBatDau', priceMax);
  // console.log('GiaKetThuc', priceMin);
  return (
    <View style={[styles.container, {width: sheetWidth, height: sheetHeight}]}>
      {/* button left */}
      <View style={styles.bntContainer}>
        <TouchableOpacity
          onPress={clear}
          activeOpacity={0.8}
          style={styles.btnLeft}>
          <Text style={styles.textLeft}>Đặt lại</Text>
        </TouchableOpacity>

        {/* button right */}
        <TouchableOpacity
          onPress={handleSearch}
          activeOpacity={0.8}
          style={styles.btnRight}>
          <Text style={styles.textRight}>Tìm kiếm</Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 0.9}}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
          </View>
          <TouchableOpacity onPress={onClose}>
            <SvgIcon Icon={IcClose} size={24} />
          </TouchableOpacity>
        </View>

        {/* body */}
        <FlatList
          showsVerticalScrollIndicator={false}
          style={styles.body}
          data={[{key: 'categories'}, {key: 'getEcom'}, {key: 'priceRange'}]}
          renderItem={({item}) => {
            if (item.key === 'categories') {
              return (
                <View style={styles.category}>
                  <Text style={styles.titleBody}>Danh mục sản phẩm</Text>
                  <FlatList
                    data={categories}
                    renderItem={renderCategoryItem}
                    numColumns={3}
                    columnWrapperStyle={{
                      justifyContent: 'space-between',
                      marginVertical: 10,
                    }}
                  />
                </View>
              );
            }
            if (item.key === 'getEcom') {
              return (
                <View>
                  <Text style={styles.titleBody}>Sàn thương mại điện tử</Text>
                  <FlatList
                    data={getEcom}
                    renderItem={renderCategoryItemEcom}
                    numColumns={3}
                    columnWrapperStyle={{
                      justifyContent: 'space-between',
                      marginVertical: 10,
                    }}
                  />
                </View>
              );
            }
            if (item.key === 'priceRange') {
              return (
                <View>
                  <Text style={styles.titleBody}>Khoảng giá</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <InputPrice
                      ref={priceMinRef}
                      placeholder={'Tối thiểu'}
                      onPriceChange={handlePriceMinChange}
                    />
                    <Text
                      style={{top: 10, color: COLORS.textColor, opacity: 0.3}}>
                      __
                    </Text>
                    <InputPrice
                      ref={priceMaxRef}
                      placeholder={'Tối đa'}
                      onPriceChange={handlePriceMaxChange}
                    />
                  </View>
                </View>
              );
            }
            return null;
          }}
          keyExtractor={item => item.key}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    bottom: -15,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 16,
    shadowColor: COLORS.primaryBlue,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 2,
    elevation: 1,
    alignItems: 'center',
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },

  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: FontFamily.roboto,
    fontSize: SIZES.h2,
    fontWeight: '700',
    color: COLORS.textColor,
    lineHeight: 24,
    alignItems: 'center',
  },
  body: {flex: 1},
  titleBody: {
    marginVertical: 13,
    fontFamily: FontFamily.roboto,
    fontSize: SIZES.h4,
    fontWeight: '700',
    color: COLORS.textColor,
    lineHeight: 20,
  },
  bntContainer: {
    // flex: 0.5,
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // // backgroundColor: COLORS.white,
    // // backgroundColor: 'yellow',
    // // marginVertical: 35,
    // position: 'absolute',
    // // top: 490,
    // top: 570,
    // right: 15,
    // left: 15,
    // // marginHorizontal: 0,
    // alignSelf: 'center',

    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
  },
  btnLeft: {
    // right: 13,
    // width: '48%',
    width: '48%',
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderWidth: 1,
    borderColor: COLORS.primaryBlue,
  },
  textLeft: {
    alignSelf: 'center',

    alignItems: 'center',
    fontWeight: FontWeight.fontWeight500,
    justifyContent: 'center',
    fontFamily: FontFamily.roboto,
    color: COLORS.primaryBlue,
    fontSize: SIZES.h4,

    lineHeight: 24,
  },
  btnRight: {
    // left: 10,

    // width: '48%',
    width: '48%',
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 30,

    backgroundColor: COLORS.primaryBlue,
  },
  textRight: {
    alignSelf: 'center',
    alignItems: 'center',
    fontWeight: FontWeight.fontWeight500,
    justifyContent: 'center',
    fontFamily: FontFamily.roboto,
    color: COLORS.white,
    fontSize: SIZES.h4,
    lineHeight: 24,
  },
});
