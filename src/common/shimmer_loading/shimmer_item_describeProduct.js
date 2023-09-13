import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../constants/theme';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const SkeletonItemDescribeProduct = () => {
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
      </SkeletonPlaceholder>
      <SkeletonPlaceholder>
        {/* Shimmer effect for the button */}
        <View style={styles.button} />
      </SkeletonPlaceholder>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // height: 'auto',
    marginVertical: 15,
    overflow: 'hidden',
    // paddingVertical: 25,
    // paddingTop: 11,
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    elevation: 3,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  title: {
    marginHorizontal: 16,
    marginVertical: 5,
    width: '50%', // Adjust width for the shimmer effect
    height: 20, // Adjust height for the shimmer effect
    backgroundColor: COLORS.gray, // Change to a background color for the title placeholder
  },
  content: {
    marginHorizontal: 15,
    marginVertical: 35,
    width: '100%', // Adjust width for the shimmer effect
    height: 100, // Adjust height for the shimmer effect
    backgroundColor: COLORS.gray, // Change to a background color for the content placeholder
  },
  button: {
    top: 25,
    width: '50%', // Adjust width for the shimmer effect
    height: 20, // Adjust height for the shimmer effect
    backgroundColor: COLORS.gray, // Change to a background color for the button placeholder
    alignSelf: 'center',
  },
});

export default SkeletonItemDescribeProduct;
