import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../constants/theme';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
const SkeletonItemInfoProduct = () => {
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={[styles.container, {width: screenWidth}]}>
      <SkeletonPlaceholder>
        {/* Shimmer effect for the title */}
        <View style={styles.title} />
      </SkeletonPlaceholder>
      <SkeletonPlaceholder>
        {/* Shimmer effect for the content */}
        <View style={styles.content} />
        <View style={styles.content} />
        <View style={styles.content} />
        <View style={styles.content} />
        <View style={styles.content} />
      </SkeletonPlaceholder>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginVertical: 15,
    paddingVertical: 15,
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    elevation: 1.5,
    shadowColor: COLORS.primaryBlue,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  title: {
    marginHorizontal: 16,
    marginVertical: 5,
    width: '50%', // Adjust width for the shimmer effect
    height: 20, // Adjust height for the shimmer effect
    backgroundColor: COLORS.gray, // Change to a background color for the title placeholder
  },
  content: {
    marginHorizontal: 16,
    marginVertical: 5,
    width: '100%', // Adjust width for the shimmer effect
    height: 20, // Adjust height for the shimmer effect
    backgroundColor: COLORS.gray, // Change to a background color for the content placeholder
  },
});

export default SkeletonItemInfoProduct;
