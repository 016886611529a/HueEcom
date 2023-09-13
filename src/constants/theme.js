import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('screen');

export const COLORS = {
  white: '#ffffff',
  backGround: '#F3F7FF',
  textColor: '#00123D',
  orangePrimary: '#ED262A',
  itemCategory: '#E6EBF1',
  primaryBlue: '#003ECF',
  primaryBlueOpacity: 'rgba(0, 18, 61, 0.5)',
};

export const SIZES = {
  h0: 24,
  h1: 22,
  h2: 20,
  h3: 18,
  h4: 16,
  htable: 15,
  h5: 14,
  h6: 12,
  h7: 13,

  width,
  height,
};
/* fonts */
export const FontFamily = {
  robotoMedium: 'System',
  robotoRegular: 'System',
  robotoBold: 'System',
  sofiaSansSemiCondensed: 'Sofia Sans Semi Condensed',
  uTMAvoBold: 'System',
  roboto: 'Roboto',
};
// FontWeight
export const FontWeight = {
  fontWeightNormal: '400',
  fontWeightBold: '700',
  fontWeight500: '500',
};
