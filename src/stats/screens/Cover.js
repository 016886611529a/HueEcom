import * as React from 'react';
import {Text, StyleSheet, View} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
import {FontFamily, Color, FontSize} from '../../GlobalStyles';

const Cover = () => {
  return (
    <LinearGradient
      style={styles.cover}
      locations={[0, 1]}
      colors={['#003ecf', '#550cb1']}
      useAngle={true}
      angle={70.26}>
      <Text style={styles.hueecom}>HueEcom</Text>
      <Text
        style={[
          styles.hThngH,
          styles.mt12,
        ]}>{`Hệ thống hỗ trợ xúc tiến thương mại,
bán sản phẩm`}</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  mt12: {
    marginTop: 12,
  },
  hueecom: {
    fontSize: 30,
    lineHeight: 33,
    fontWeight: '700',
    fontFamily: FontFamily.uTMAvoBold,
    textAlign: 'left',
    color: Color.white,
  },
  hThngH: {
    fontSize: FontSize.size_xl,
    lineHeight: 22,
    fontWeight: '500',
    fontFamily: FontFamily.robotoMedium,
    textAlign: 'center',
    color: Color.white,
  },
  cover: {
    flex: 1,
    width: '100%',
    padding: 64,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});

export default Cover;
