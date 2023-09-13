import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../constants/theme';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const ShimmerItem = () => {
  const screenWidth = Dimensions.get('window').width;
  const numColumns = 2;
  const itemWidth = (screenWidth - 20 * (numColumns + 1)) / numColumns;
  return (
    <View style={[styles.container, {width: itemWidth}]}>
      <SkeletonPlaceholder>
        <View style={styles.image} />
      </SkeletonPlaceholder>
      <View style={styles.bodyItem}>
        <SkeletonPlaceholder>
          <View style={styles.companyName} />
        </SkeletonPlaceholder>
        <SkeletonPlaceholder>
          <View style={styles.productName} />
        </SkeletonPlaceholder>
        <View style={styles.priceContainer}>
          <SkeletonPlaceholder>
            <View style={styles.bought} />
          </SkeletonPlaceholder>
          <SkeletonPlaceholder>
            <View style={styles.price} />
          </SkeletonPlaceholder>
        </View>
      </View>
      <View style={styles.bottomBody}>
        <SkeletonPlaceholder>
          <View style={styles.buy} />
        </SkeletonPlaceholder>
        <View style={styles.svg}>
          <SkeletonPlaceholder>
            <View style={styles.logo} />
          </SkeletonPlaceholder>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 385,
    width: '48%',
    marginBottom: 20,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: COLORS.white,
    // shadowColor: COLORS.primaryBlue,
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 2,
    // elevation: 1,
  },
  image: {
    width: '100%',
    height: 165,
    backgroundColor: COLORS.gray, // Change to a background color for the image placeholder
  },
  bodyItem: {
    backgroundColor: COLORS.gray,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  companyName: {
    backgroundColor: 'red',
    top: 15,
    width: '100%',
    height: 35,
  },
  productName: {
    backgroundColor: 'red',
    top: 15,
    width: '100%',
    height: 35,
  },
  bought: {
    backgroundColor: 'red',
    top: 15,
    width: '50%',
    height: 35,
  },
  price: {
    backgroundColor: 'red',
    top: 15,
    width: '50%',
    height: 35,
  },

  logo: {
    left: 10,
    backgroundColor: COLORS.gray, // Change to a background color for the logo placeholder
    width: 30,
    height: 30,
  },
});

export default ShimmerItem;
