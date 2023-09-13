import React from 'react';
import {
  Border,
  Color,
  FontFamily,
  FontSize,
  Padding,
} from '../../../GlobalStyles';
import {StyleSheet, View, Text} from 'react-native';

const ButtonOrder = ({type, text = '', fill = false}) => {
  switch (type) {
    case 'secondary-outline':
      return (
        <View style={[styles.buttonBorder, styles.buttonBorder1]}>
          <Text style={[styles.hyNHng, styles.textLayout1]}>{text}</Text>
        </View>
      );
    case 'primary':
      return (
        <View style={[styles.button1, styles.ml8, styles.buttonBorder]}>
          <Text style={[styles.xcNhnN, styles.nHngClr, styles.textLayout1]}>
            {text}
          </Text>
        </View>
      );
    default:
      break;
  }
};
export default ButtonOrder;
const styles = StyleSheet.create({
  nHngClr: {
    color: Color.mediumslateblue_200,
    textAlign: 'center',
  },
  xcNhnN: {
    fontFamily: FontFamily.robotoRegular,
  },
  buttonBorder: {
    paddingVertical: Padding.p_5xs,
    borderWidth: 1,
    borderRadius: Border.br_9xs,
    justifyContent: 'center',
    borderStyle: 'solid',
    alignItems: 'center',
    paddingHorizontal: Padding.p_base,
    flexDirection: 'row',
  },
  button1: {
    borderColor: '#003ecf',
  },
  ml8: {
    marginLeft: 8,
  },
  buttonBorder: {
    paddingVertical: Padding.p_5xs,
    borderWidth: 1,
    borderRadius: Border.br_9xs,
    justifyContent: 'center',
    borderStyle: 'solid',
    alignItems: 'center',
    paddingHorizontal: Padding.p_base,
    flexDirection: 'row',
  },
  buttonBorder1: {
    borderColor: '#ffcbbe',
    paddingVertical: Padding.p_5xs,
  },
  hyNHng: {
    color: Color.orangered,
    fontFamily: FontFamily.robotoRegular,
    textAlign: 'center',
  },
  textLayout1: {
    lineHeight: 20,
    fontSize: FontSize.size_sm,
  },
});
