import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {COLORS, FontFamily, FontWeight, SIZES} from '../../constants/theme';
import {formatCurrency} from '../../helper/format_helper';

const ItemHeaderDetailProduct = ({
  productName,
  bought,
  price,
  logo,
  sliderImage,
  openLink,
}) => {
  const formattedPrice = formatCurrency(price);
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={[styles.container, {width: screenWidth}]}>
      {sliderImage}
      <View style={{marginHorizontal: 16, marginVertical: 5}}>
        <Text style={styles.productName}>{productName}</Text>
        <Text style={styles.price}>{formattedPrice}</Text>
        <View style={styles.muaNgay}>
          <Text style={styles.buy}>Mua ngay:</Text>
          <TouchableOpacity style={styles.svg} onPress={openLink}>
            <Image
              source={logo}
              resizeMode="cover"
              style={{width: 30, height: 30}}
            />
            {/* <Text>121</Text> */}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingVertical: 15,
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    elevation: 1.5,
    shadowColor: COLORS.primaryBlue,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  txt: {
    marginVertical: 10,
    fontFamily: FontFamily.roboto,
    fontWeight: FontWeight.fontWeightNormal,
    fontSize: SIZES.h5,
    color: COLORS.textColor,
    opacity: 0.5,
  },
  price: {
    color: COLORS.orangePrimary,
    fontSize: SIZES.h4,
    fontWeight: FontWeight.fontWeightBold,
    lineHeight: 24,
    marginTop: 5,
    fontFamily: FontFamily.roboto,
  },
  productName: {
    fontFamily: FontFamily.roboto,
    fontWeight: '700',
    fontSize: SIZES.h4,
    color: COLORS.textColor,
  },
  btn: {
    width: 30,
    height: 30,
    backgroundColor: '#000000',
    opacity: 0.5,
    borderRadius: 15,
    // justifyContent: 'center', // Canh chỉnh theo chiều dọc
    // alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 10,
    zIndex: 1,
  },
  muaNgay: {flexDirection: 'row'},
  buy: {
    opacity: 0.5,
    color: COLORS.textColor,
    fontSize: SIZES.h5,
    fontWeight: FontWeight.fontWeightNormal,
    lineHeight: 16,
    marginVertical: 10,
    fontFamily: FontFamily.roboto,
  },
  svg: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  carouselImage: {
    width: '100%',
    height: 400,
  },
});

export default ItemHeaderDetailProduct;
