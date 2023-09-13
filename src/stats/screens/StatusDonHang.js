import * as React from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import {Color, FontFamily, FontSize, Padding} from '../../GlobalStyles';

const StatusDonHang = () => {
  return (
    <View style={styles.statusDonHang}>
      <Text style={[styles.angXL, styles.angXLTypo]}>Đang xử lý</Text>
      <Text style={[styles.angVnChuyn, styles.mt8, styles.status3Typo]}>
        Đang vận chuyển
      </Text>
      <Text style={[styles.giaoHng, styles.mt8, styles.giaoHngTypo]}>
        Đã giao hàng
      </Text>
      <Text style={[styles.hy, styles.mt8, styles.hyTypo]}>Đã hủy</Text>
      <View style={[styles.statusDonHangChild, styles.mt8]} />
      <View style={[styles.status, styles.mt8]}>
        <Image
          style={styles.statusChild}
          resizeMode="cover"
          source={require('../assets/ellipse-2.png')}
        />
        <Text style={[styles.status1, styles.ml8, styles.angXLTypo]}>
          Đang xử lý
        </Text>
      </View>
      <View style={[styles.status, styles.mt8]}>
        <Image
          style={styles.statusChild}
          resizeMode="cover"
          source={require('../assets/ellipse-21.png')}
        />
        <Text style={[styles.status3, styles.ml8, styles.status3Typo]}>
          Đang vận chuyển
        </Text>
      </View>
      <View style={[styles.status, styles.mt8]}>
        <Image
          style={styles.statusChild}
          resizeMode="cover"
          source={require('../assets/ellipse-22.png')}
        />
        <Text style={[styles.status5, styles.ml8, styles.giaoHngTypo]}>
          Đã giao hàng
        </Text>
      </View>
      <View style={[styles.status, styles.mt8]}>
        <Image
          style={styles.statusChild}
          resizeMode="cover"
          source={require('../assets/ellipse-23.png')}
        />
        <Text style={[styles.status7, styles.ml8, styles.hyTypo]}>Đã hủy</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ml8: {
    marginLeft: 8,
  },
  mt8: {
    marginTop: 8,
  },
  angXLTypo: {
    textAlign: 'left',
    color: Color.dodgerblue,
    fontFamily: FontFamily.robotoRegular,
    lineHeight: 16,
    fontSize: FontSize.size_xs,
  },
  status3Typo: {
    color: Color.orange,
    textAlign: 'left',
    fontFamily: FontFamily.robotoRegular,
    lineHeight: 16,
    fontSize: FontSize.size_xs,
  },
  giaoHngTypo: {
    color: Color.mediumseagreen_100,
    textAlign: 'left',
    fontFamily: FontFamily.robotoRegular,
    lineHeight: 16,
    fontSize: FontSize.size_xs,
  },
  hyTypo: {
    color: Color.midnightblue_100,
    textAlign: 'left',
    fontFamily: FontFamily.robotoRegular,
    lineHeight: 16,
    fontSize: FontSize.size_xs,
  },
  angXL: {
    alignSelf: 'stretch',
  },
  angVnChuyn: {
    alignSelf: 'stretch',
  },
  giaoHng: {
    alignSelf: 'stretch',
  },
  hy: {
    alignSelf: 'stretch',
  },
  statusDonHangChild: {
    borderStyle: 'solid',
    borderColor: '#e6ebf1',
    borderTopWidth: 1,
    height: 1,
    alignSelf: 'stretch',
  },
  statusChild: {
    width: 8,
    height: 8,
  },
  status1: {
    flex: 1,
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  status3: {
    flex: 1,
  },
  status5: {
    flex: 1,
  },
  status7: {
    flex: 1,
  },
  statusDonHang: {
    backgroundColor: Color.white,
    width: '100%',
    padding: Padding.p_5xl,
    flex: 1,
  },
});

export default StatusDonHang;
