import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {COLORS, FontFamily, FontWeight, SIZES} from '../../constants/theme';

const ItemCategory = ({categoriesName, onClick}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onClick}
      activeOpacity={0.4}>
      <Text style={styles.txtCategory} numberOfLines={5}>
        {categoriesName}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    width: '33.4%',
    paddingVertical: 27,
    borderRightWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: 'grey',
  },
  txtCategory: {
    marginHorizontal: 15,
    textAlign: 'center',
    flexWrap: 'wrap',
    alignItems: 'center',
    fontFamily: FontFamily.roboto,
    fontWeight: FontWeight.fontWeightNormal,
    fontSize: SIZES.h5,
    lineHeight: 20,
    color: COLORS.textColor,
  },
});

export default ItemCategory;
