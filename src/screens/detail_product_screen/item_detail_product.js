import React from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import {COLORS, FontFamily, FontWeight, SIZES} from '../../constants/theme';

const ItemInfoProduct = ({
  category,
  companyName,
  quantity,
  height,
  length,
  width,
  netWeight,
  unit,
}) => {
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={[styles.container, {width: screenWidth}]}>
      <Text style={styles.title}>Thông tin chi tiết</Text>
      <View style={{marginHorizontal: 16}}>
        <Text style={[styles.txt]}>
          Danh mục:{'                     '}
          <Text style={styles.txtCate}>{category}</Text>
        </Text>

        <Text style={styles.txt}>
          Số lượng tồn:{'                 '}
          <Text style={styles.txtSub}>{quantity}</Text>
        </Text>
        <Text style={styles.txt}>
          Chiều cao:{'                      '}
          <Text style={styles.txtSub}>{height} cm</Text>
        </Text>
        <Text style={styles.txt}>
          Chiều dài:{'                       '}
          <Text style={styles.txtSub}>{length} cm</Text>
        </Text>
        <Text style={styles.txt}>
          Chiều rộng:{'                    '}
          <Text style={styles.txtSub}>{width} cm</Text>
        </Text>
        <Text style={styles.txt}>
          Khối lượng:{'                    '}
          <Text style={styles.txtSub}>{netWeight} gram</Text>
        </Text>
        <Text style={styles.txt}>
          Đơn vị:{'                            '}
          <Text style={styles.txtSub}>{unit} cái</Text>
        </Text>
      </View>
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
    fontFamily: FontFamily.roboto,
    fontWeight: '700',
    fontSize: SIZES.h4,
    color: COLORS.textColor,
  },
  txt: {
    lineHeight: 24,
    marginVertical: 5,
    color: COLORS.primaryBlueOpacity,
    // opacity: 0.5,
    fontFamily: FontFamily.roboto,
    fontWeight: FontWeight.fontWeightNormal,
    fontSize: SIZES.h4,
    lineHeight: 24,
  },
  txtCate: {
    fontFamily: FontFamily.roboto,
    fontWeight: FontWeight.fontWeightNormal,
    fontSize: SIZES.h4,
    color: COLORS.primaryBlue,

    lineHeight: 24,
  },
  txtSub: {
    fontFamily: FontFamily.roboto,
    fontWeight: FontWeight.fontWeightNormal,
    fontSize: SIZES.h4,
    lineHeight: 24,
    color: COLORS.textColor,
  },
});

export default ItemInfoProduct;
