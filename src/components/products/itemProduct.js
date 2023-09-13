import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import {COLORS, FontFamily, FontWeight, SIZES} from '../../constants/theme';
import {formatCurrency} from '../../helper/formatCurrency';
const ItemProduct = ({
  image,
  companyName,
  productName,
  price,
  logo,
  onClick,
  openLink,
  bought,
}) => {
  const formattedPrice = formatCurrency(price);
  const renderLogoItem = ({item}) => (
    <TouchableOpacity onPress={item.openLink} style={{marginRight: 5}}>
      <Image
        source={item.logo}
        // source={item.logo}
        resizeMode="cover"
        style={{width: 30, height: 30}}
      />
    </TouchableOpacity>
  );

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.85}
      onPress={onClick}>
      <View style={styles.imageContainer}>
        <Image source={image} resizeMode="cover" style={styles.image} />
      </View>
      <View style={styles.bodyItem}>
        <Text style={styles.companyName} numberOfLines={1} ellipsizeMode="tail">
          {companyName}
        </Text>
        <Text style={styles.productName} numberOfLines={2} ellipsizeMode="tail">
          {productName}
        </Text>
        <View style={{position: 'absolute', top: 75}}>
          <Text
            style={{
              opacity: 0.5,
              color: COLORS.textColor,
              fontSize: SIZES.h5,
              fontWeight: FontWeight.fontWeightNormal,
              lineHeight: 16,
              // marginTop: 5,
              fontFamily: FontFamily.roboto,
            }}>
            {bought} đã bán
          </Text>

          <Text style={styles.price}>{formattedPrice}đ</Text>
        </View>
      </View>

      <View style={styles.bottomBody}>
        <Text style={styles.buy}>Mua ngay:</Text>
        <FlatList
          data={[{logo, openLink}]}
          renderItem={renderLogoItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
        />
        {/* <View style={styles.svg}>
          <TouchableOpacity onPress={openLink}>
            <Image
              source={logo}
              resizeMode="cover"
              style={{width: 30, height: 30}}
            />
          </TouchableOpacity>
        </View> */}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    // width: 165,
    height: 385,
    width: '48%',
    // alignItems: 'center',
    marginBottom: 20,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: COLORS.white,
    shadowColor: COLORS.primaryBlue,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 2,
    elevation: 1,
  },
  imageContainer: {
    width: 170,
    height: 165,
    overflow: 'hidden',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  companyName: {
    // backgroundColor: 'red',
    // position: 'absolute',
    opacity: 0.5,
    color: COLORS.textColor,
    fontSize: SIZES.h6,
    fontWeight: FontWeight.fontWeightNormal,
    lineHeight: 16,
    // marginTop: 5,
    fontFamily: FontFamily.roboto,
  },
  productName: {
    color: COLORS.textColor,
    fontFamily: FontFamily.roboto,
    fontSize: SIZES.h4,
    fontWeight: FontWeight.fontWeight500,
    lineHeight: 24,
    marginTop: 5,
  },
  priceContainer: {
    position: 'absolute',
    top: 97,
    left: 5,
  },
  price: {
    color: COLORS.orangePrimary,
    fontSize: SIZES.h4,
    fontWeight: FontWeight.fontWeightBold,
    lineHeight: 24,
    right: 5,
    fontFamily: FontFamily.roboto,
  },
  iconContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  bodyItem: {
    flexDirection: 'column',
    position: 'absolute',
    top: 180,

    margin: 15,
  },
  bottomBody: {
    bottom: -20,
    marginBottom: 30,
    left: 15,
    position: 'absolute',
  },
  buy: {
    opacity: 0.5,
    color: COLORS.textColor,
    fontSize: SIZES.h6,
    fontWeight: FontWeight.fontWeightNormal,
    lineHeight: 16,
    marginVertical: 10,
    fontFamily: FontFamily.roboto,
  },
  svg: {
    flexDirection: 'row',
  },
});

export default ItemProduct;
