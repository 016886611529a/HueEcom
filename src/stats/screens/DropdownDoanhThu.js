import * as React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {Padding, FontSize, FontFamily, Color, Border} from '../../GlobalStyles';

const DropdownDoanhThu = () => {
  return (
    <View style={styles.dropdownDoanhThu}>
      <View style={[styles.item, styles.itemSpaceBlock]}>
        <Text style={styles.snTmt}>Sàn TMĐT</Text>
      </View>
      <View style={styles.itemSpaceBlock}>
        <Text style={styles.snTmt}>Gian hàng</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemSpaceBlock: {
    paddingVertical: Padding.p_5xs,
    paddingHorizontal: 0,
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  snTmt: {
    fontSize: FontSize.size_sm,
    lineHeight: 20,
    fontFamily: FontFamily.robotoRegular,
    color: Color.midnightblue_100,
    textAlign: 'left',
    flex: 1,
  },
  item: {
    borderStyle: 'solid',
    borderColor: '#e6ebf1',
    borderBottomWidth: 1,
  },
  dropdownDoanhThu: {
    borderRadius: Border.br_9xs,
    backgroundColor: Color.white,
    shadowColor: 'rgba(0, 18, 61, 0.12)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
    width: '100%',
    paddingHorizontal: Padding.p_xs,
    paddingVertical: 0,
    display: 'none',
    flex: 1,
  },
});

export default DropdownDoanhThu;
