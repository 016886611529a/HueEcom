import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../constants/theme';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const SkeletonItemHeaderDetailProduct = () => {
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={[styles.container, {width: screenWidth}]}>
      <SkeletonPlaceholder>
        {/* Shimmer effect for the sliderImage */}
        <View style={styles.sliderImage} />
      </SkeletonPlaceholder>
      <View style={styles.bodyContainer}>
        <SkeletonPlaceholder>
          {/* Shimmer effect for the productName */}
          <View style={styles.productName} />
        </SkeletonPlaceholder>
        <SkeletonPlaceholder>
          {/* Shimmer effect for the price */}
          <View style={styles.price} />
        </SkeletonPlaceholder>
        <View style={styles.muaNgay}>
          <SkeletonPlaceholder>
            {/* Shimmer effect for the "Mua ngay" text */}
            <View style={styles.buy} />
          </SkeletonPlaceholder>
          <SkeletonPlaceholder>
            {/* Shimmer effect for the logo */}
            <View style={styles.logo} />
          </SkeletonPlaceholder>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    elevation: 1.5,
    shadowColor: COLORS.primaryBlue,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  sliderImage: {
    width: '100%',
    height: 165,
    backgroundColor: COLORS.gray, // Change to a background color for the image placeholder
  },
  bodyContainer: {
    marginHorizontal: 16,
    marginVertical: 5,
  },
  productName: {
    backgroundColor: COLORS.gray, // Change to a background color for the productName placeholder
    width: '80%',
    height: 24,
    marginBottom: 5,
  },
  price: {
    backgroundColor: COLORS.gray, // Change to a background color for the price placeholder
    width: '40%',
    height: 20,
    marginBottom: 5,
  },
  muaNgay: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buy: {
    backgroundColor: COLORS.gray, // Change to a background color for the "Mua ngay" text placeholder
    width: '30%',
    height: 16,
    marginRight: 10,
  },
  logo: {
    backgroundColor: COLORS.gray, // Change to a background color for the logo placeholder
    width: 30,
    height: 30,
  },
});

export default SkeletonItemHeaderDetailProduct;
