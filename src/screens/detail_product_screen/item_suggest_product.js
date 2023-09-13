import React from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import {COLORS, FontFamily, SIZES} from '../../constants/theme';

const ItemSuggestProduct = ({products}) => {
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={[styles.container, {width: screenWidth}]}>
      <Text style={styles.title}>Các sản phẩm gợi ý</Text>
      <View style={styles.body}>{products}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    paddingVertical: 4,
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
    fontFamily: FontFamily.roboto,
    fontWeight: 'bold',
    fontSize: SIZES.h4,
    color: COLORS.textColor,
  },
  body: {
    marginHorizontal: 16,
    marginVertical: 15,
  },
});

export default ItemSuggestProduct;
