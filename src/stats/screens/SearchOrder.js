// import React, {useState} from 'react';
// import {
//   Image,
//   StyleSheet,
//   Pressable,
//   Text,
//   View,
//   TextInput,
// } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import {useNavigation} from '@react-navigation/native';
// import {Padding, Color, FontSize, Border, FontFamily} from '../../GlobalStyles';

// const SearchOrder = () => {
//   const navigation = useNavigation();
//   const [text, setText] = useState('');
//   const handleTextSubmit = () => {
//     console.log('====================================');
//     console.log(text);
//     console.log('====================================');
//   };

//   return (
//     <View style={styles.searchorder}>
//       <LinearGradient
//         style={[
//           styles.topAppBar,
//           styles.topFlexBox,
//           styles.abcPosition,
//           styles.topAppBarPosition,
//         ]}
//         locations={[0, 1]}
//         colors={['#003ecf', '#550cb1']}
//         useAngle={true}
//         angle={70.26}>
//         <Pressable
//           style={styles.iconLayout}
//           onPress={() => navigation.goBack()}>
//           <Image
//             style={styles.icon}
//             resizeMode="cover"
//             source={require('../assets/backicon2.png')}
//           />
//         </Pressable>
//         <Text style={[styles.logo]}>Tìm kiếm đơn hàng</Text>
//       </LinearGradient>
//       <View style={[styles.topAppBar1, styles.capacityBg, styles.topFlexBox]}>
//         <View
//           style={{
//             display: 'flex',
//             width: '85%',
//             flexDirection: 'row',
//             alignItems: 'center',
//             height: '80%',
//             backgroundColor: '#E6EBF1',
//             paddingLeft: 16,
//             borderRadius: 8,
//           }}>
//           <Image
//             style={[styles.search1Icon, styles.iconLayout]}
//             resizeMode="cover"
//             source={require('../assets/search-1.png')}
//           />
//           <TextInput
//             style={styles.textInput}
//             onChangeText={setText}
//             value={text}
//             placeholder="Nhập từ khóa tìm kiếm..."
//             onSubmitEditing={handleTextSubmit}
//           />
//         </View>

//         <Pressable
//           style={[styles.button, styles.ml16]}
//           onPress={() => navigation.goBack()}>
//           <Text style={[styles.hy, styles.hyLayout]}>Hủy</Text>
//         </Pressable>
//       </View>
//       <View style={styles.flexStyles}>
//         <View style={styles.bgParent}>
//           <Image
//             style={styles.bgIcon}
//             resizeMode="cover"
//             source={require('../assets/bg.png')}
//           />
//           <Text style={[styles.bnCTh, styles.mt16, styles.hyLayout]}>
//             Bạn có thể tìm kiếm theo ID đơn hàng, tên sản phẩm hoặc gian hàng
//           </Text>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   ml8: {
//     marginLeft: 8,
//   },
//   ml16: {
//     marginLeft: 16,
//   },
//   mt16: {
//     marginTop: 16,
//   },
//   flexStyle: {
//     display: 'flex',
//     justifyContent: 'flex-start',
//     width: '100%',
//     alignItems: 'center',
//     flexDirection: 'column',
//   },
//   topFlexBox: {
//     paddingHorizontal: Padding.p_base,
//     alignItems: 'center',
//     flexDirection: 'row',
//   },
//   abcPosition: {
//     left: '0%',
//     width: '100%',
//   },
//   topAppBarPosition: {
//     right: '0%',
//     left: '0%',
//   },
//   capacityBg: {
//     backgroundColor: Color.white,
//     // position: 'absolute',
//   },
//   iconLayout: {
//     zIndex: 10,
//     height: 24,
//     width: 24,
//   },
//   capIconLayout: {
//     width: 1,
//     position: 'absolute',
//   },
//   hyLayout: {
//     lineHeight: 24,
//     fontSize: FontSize.size_base,
//   },
//   systemLightHomeIndicatoPosition: {
//     bottom: 0,
//     position: 'absolute',
//   },
//   keyboardIconLayout: {
//     maxHeight: '100%',
//     maxWidth: '100%',
//     position: 'absolute',
//     overflow: 'hidden',
//   },
//   iconPosition: {
//     top: '0%',
//     left: '0%',
//     right: '0%',
//     width: '100%',
//   },
//   keyboardsatomskeyPosition9: {
//     bottom: '82.82%',
//     top: '2.75%',
//     width: '8.4%',
//     height: '14.43%',
//     position: 'absolute',
//   },
//   keyIconLayout: {
//     borderRadius: Border.br_8xs,
//     maxHeight: '100%',
//     maxWidth: '100%',
//     position: 'absolute',
//     overflow: 'hidden',
//   },
//   keyBgIconPosition: {
//     top: 0,
//     left: 0,
//     right: 0,
//   },
//   wordTypo: {
//     width: 32,
//     color: Color.black,
//     fontFamily: FontFamily.keyboardKeys,
//     left: 0,
//     textAlign: 'center',
//     position: 'absolute',
//   },
//   letterFlexBox: {
//     fontSize: FontSize.keyboardKeys_size,
//     top: 5,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   wordPosition: {
//     top: 9,
//     lineHeight: 21,
//     letterSpacing: 0,
//     fontSize: FontSize.size_base,
//   },
//   voiceIconPosition: {
//     width: 12,
//     height: 20,
//     marginTop: -10,
//     display: 'none',
//     left: '50%',
//     top: '50%',
//     position: 'absolute',
//   },
//   keyboardsatomskeyPosition8: {
//     bottom: '64.26%',
//     top: '21.31%',
//     width: '8.4%',
//     height: '14.43%',
//     position: 'absolute',
//   },
//   keyboardsatomskeyPosition6: {
//     right: '65.73%',
//     left: '25.87%',
//   },
//   keyboardsatomskeyPosition7: {
//     left: '15.73%',
//     right: '75.87%',
//   },
//   keyboardsatomskeyPosition2: {
//     bottom: '45.7%',
//     top: '39.86%',
//     width: '8.4%',
//     height: '14.43%',
//     position: 'absolute',
//   },
//   keyboardsatomskeyPosition5: {
//     left: '35.73%',
//     right: '55.87%',
//   },
//   keyboardsatomskeyPosition4: {
//     left: '45.87%',
//     right: '45.73%',
//   },
//   keyboardsatomskeyPosition3: {
//     left: '65.87%',
//     right: '25.73%',
//   },
//   keyboardsatomskeyPosition1: {
//     bottom: '27.15%',
//     top: '58.42%',
//     height: '14.43%',
//     position: 'absolute',
//   },
//   word26Typo: {
//     width: 182,
//     color: Color.black,
//     fontFamily: FontFamily.keyboardKeys,
//     left: 0,
//     textAlign: 'center',
//     position: 'absolute',
//   },
//   keyboardsatomskeyPosition: {
//     width: '11.2%',
//     bottom: '45.7%',
//     top: '39.86%',
//     height: '14.43%',
//     position: 'absolute',
//   },
//   deleteIconLayout: {
//     marginLeft: -12,
//     height: 17,
//     width: 23,
//   },
//   emojisIconPosition: {
//     width: 20,
//     marginTop: -9,
//     height: 20,
//     display: 'none',
//     left: '50%',
//     top: '50%',
//     position: 'absolute',
//   },
//   viewPosition: {
//     width: 28,
//     marginTop: -11,
//     height: 20,
//     display: 'none',
//     left: '50%',
//     top: '50%',
//     position: 'absolute',
//   },
//   textPosition: {
//     marginLeft: -14,
//     left: '50%',
//     top: '50%',
//     position: 'absolute',
//   },
//   textTypo: {
//     marginTop: -10,
//     letterSpacing: 0,
//     color: Color.black,
//     fontFamily: FontFamily.keyboardKeys,
//     lineHeight: 20,
//     fontSize: FontSize.size_base,
//     textAlign: 'center',
//   },
//   shiftIconPosition: {
//     height: 18,
//     width: 21,
//     marginTop: -8.6,
//     display: 'none',
//     left: '50%',
//     top: '50%',
//     position: 'absolute',
//   },
//   wordTypo1: {
//     color: Color.black,
//     display: 'none',
//     fontFamily: FontFamily.keyboardKeys,
//     textAlign: 'center',
//     top: '50%',
//     position: 'absolute',
//   },
//   deleteIconPosition: {
//     height: 17,
//     width: 23,
//     marginTop: -8,
//     left: '50%',
//     top: '50%',
//     position: 'absolute',
//   },
//   borderPosition: {
//     width: 22,
//     top: '50%',
//     position: 'absolute',
//   },
//   icon: {
//     height: '100%',
//     width: '100%',
//   },
//   logo: {
//     fontSize: FontSize.size_xl,
//     lineHeight: 22,
//     fontWeight: '700',
//     fontFamily: FontFamily.robotoBold,
//     zIndex: 1,
//     textAlign: 'center',
//     color: Color.white,
//     width: '100%',
//     position: 'absolute',
//     bottom: 10,
//     left: 20,
//   },
//   topAppBar: {
//     top: -1,
//     paddingTop: Padding.p_36xl,
//     paddingBottom: Padding.p_xs,
//     backgroundColor: 'transparent',
//     alignItems: 'center',
//     // position: 'absolute',
//   },
//   search1Icon: {
//     overflow: 'hidden',
//   },
//   nhpTKha: {
//     color: Color.midnightblue_300,
//     textAlign: 'left',
//     fontFamily: FontFamily.robotoRegular,
//     lineHeight: 20,
//     fontSize: FontSize.size_base,
//     zIndex: 1,
//     flex: 1,
//   },
//   searchBarChild: {
//     top: 11,
//     left: 40,
//     borderColor: '#00123d',
//     borderRightWidth: 1,
//     zIndex: 2,
//     height: 19,
//     borderStyle: 'solid',
//   },
//   searchBar: {
//     borderRadius: Border.br_5xs,
//     backgroundColor: Color.aliceblue_200,
//     paddingLeft: Padding.p_5xs,
//     paddingTop: Padding.p_5xs,
//     paddingRight: Padding.p_base,
//     paddingBottom: Padding.p_5xs,
//     alignItems: 'center',
//     flexDirection: 'row',
//     flex: 1,
//   },
//   hy: {
//     fontFamily: FontFamily.robotoMedium,
//     color: Color.mediumslateblue_200,
//     fontWeight: '500',
//     textAlign: 'left',
//   },
//   button: {
//     paddingHorizontal: 0,
//     paddingVertical: Padding.p_xs,
//     justifyContent: 'center',
//     alignItems: 'center',
//     flexDirection: 'row',
//   },
//   topAppBar1: {
//     // top: 90,
//     borderColor: '#e6ebf1',
//     borderBottomWidth: 1,
//     paddingVertical: Padding.p_5xs,
//     borderStyle: 'solid',
//     left: 0,
//     right: 0,
//     alignItems: 'center',
//   },
//   bgIcon: {
//     width: 277,
//     height: 148,
//     overflow: 'hidden',
//   },
//   bnCTh: {
//     color: Color.midnightblue_100,
//     width: 291,
//     fontFamily: FontFamily.robotoRegular,
//     textAlign: 'center',
//   },
//   bgParent: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     // backgroundColor: 'red',
//   },
//   keyboardBackgroundIcon: {
//     bottom: '0%',
//     height: '100%',
//   },
//   keyBgIcon: {
//     bottom: -1,
//   },
//   letter: {
//     display: 'flex',
//   },
//   word: {
//     display: 'none',
//     lineHeight: 21,
//     letterSpacing: 0,
//   },
//   voiceIcon: {
//     marginLeft: -5.75,
//     height: 20,
//   },
//   keyboardsatomskey: {
//     right: '90.8%',
//     left: '0.8%',
//   },
//   keyboardsatomskey1: {
//     right: '80.93%',
//     left: '10.67%',
//   },
//   keyboardsatomskey2: {
//     right: '70.8%',
//     left: '20.8%',
//   },
//   keyboardsatomskey3: {
//     right: '60.93%',
//     left: '30.67%',
//   },
//   keyboardsatomskey4: {
//     right: '50.8%',
//     left: '40.8%',
//   },
//   keyboardsatomskey5: {
//     right: '40.93%',
//     left: '50.67%',
//   },
//   keyboardsatomskey6: {
//     right: '30.8%',
//     left: '60.8%',
//   },
//   keyboardsatomskey7: {
//     right: '20.93%',
//     left: '70.67%',
//   },
//   keyboardsatomskey8: {
//     right: '10.8%',
//     left: '80.8%',
//   },
//   keyboardsatomskey9: {
//     right: '0.93%',
//     left: '90.67%',
//   },
//   keyboardsatomskey10: {
//     right: '85.73%',
//     left: '5.87%',
//   },
//   keyboardsatomskey12: {
//     left: '25.87%',
//   },
//   keyboardsatomskey15: {
//     right: '35.87%',
//     left: '55.73%',
//   },
//   keyboardsatomskey17: {
//     right: '15.87%',
//     left: '75.73%',
//   },
//   keyboardsatomskey18: {
//     right: '5.87%',
//     left: '85.73%',
//   },
//   keyboardsatomskey20: {
//     left: '25.87%',
//   },
//   keyboardsatomskey23: {
//     right: '35.6%',
//     left: '56%',
//   },
//   keyboardsatomskey25: {
//     right: '15.6%',
//     left: '76%',
//   },
//   letter26: {
//     display: 'none',
//   },
//   word26: {
//     lineHeight: 21,
//     letterSpacing: 0,
//   },
//   voiceIcon26: {
//     marginLeft: -6,
//     height: 20,
//   },
//   keyboardsatomskey26: {
//     width: '48.53%',
//     right: '25.6%',
//     left: '25.87%',
//   },
//   keyBgIcon27: {
//     height: '102.38%',
//     bottom: '-2.38%',
//   },
//   emojisIcon: {
//     marginLeft: -9,
//   },
//   text: {
//     fontWeight: '500',
//   },
//   view: {
//     marginLeft: -17,
//   },
//   shiftIcon: {
//     marginLeft: -10,
//   },
//   word27: {
//     width: 42,
//     marginTop: -11,
//     display: 'none',
//     lineHeight: 21,
//     letterSpacing: 0,
//     fontSize: FontSize.size_base,
//     left: 0,
//   },
//   text1: {
//     marginTop: -3,
//     fontSize: FontSize.size_smi,
//     display: 'none',
//     lineHeight: 21,
//   },
//   abc: {
//     marginTop: -6,
//     fontSize: FontSize.size_xs,
//     display: 'none',
//     letterSpacing: 0,
//     lineHeight: 20,
//   },
//   keyboardsatomskeySpecial: {
//     right: '0.8%',
//     left: '88%',
//   },
//   deleteIcon1: {
//     display: 'none',
//   },
//   shiftIcon1: {
//     marginTop: -9.35,
//     marginLeft: -10.75,
//     height: 19,
//     left: '50%',
//   },
//   keyboardsatomskeySpecial1: {
//     right: '88%',
//     left: '0.8%',
//   },
//   text4: {
//     marginLeft: -13.5,
//     left: '50%',
//     top: '50%',
//     // position: 'absolute',
//   },
//   view2: {
//     width: 27,
//     marginTop: -11,
//     height: 20,
//   },
//   word29: {
//     width: 86,
//     marginTop: -11,
//     display: 'none',
//     lineHeight: 21,
//     letterSpacing: 0,
//     fontSize: FontSize.size_base,
//     left: 0,
//   },
//   keyboardsatomskeySpecial2: {
//     width: '22.93%',
//     right: '76.27%',
//     left: '0.8%',
//   },
//   deleteIcon3: {
//     marginLeft: -12.36,
//     display: 'none',
//   },
//   emojisIcon3: {
//     marginLeft: -9.36,
//   },
//   view3: {
//     marginLeft: -39.36,
//   },
//   shiftIcon3: {
//     marginLeft: -10.36,
//   },
//   word30: {
//     width: 87,
//     marginTop: -11,
//     lineHeight: 21,
//     letterSpacing: 0,
//     fontFamily: FontFamily.keyboardKeys,
//     fontSize: FontSize.size_base,
//     left: 0,
//     textAlign: 'center',
//     color: Color.white,
//     top: '50%',
//     position: 'absolute',
//   },
//   keyboardsatomskeySpecial3: {
//     width: '23.13%',
//     right: '0.88%',
//     left: '76%',
//   },
//   homeIndicatorIcon: {
//     height: '1.72%',
//     width: '36%',
//     top: '95.53%',
//     right: '32%',
//     bottom: '2.75%',
//     left: '32%',
//     borderRadius: Border.br_10xs_5,
//     display: 'none',
//   },
//   keyboardDictation: {
//     height: '8.59%',
//     width: '4%',
//     top: '82.13%',
//     right: '8.53%',
//     bottom: '9.28%',
//     left: '87.47%',
//   },
//   keyboardEmoji: {
//     height: '8.93%',
//     width: '6.93%',
//     top: '81.96%',
//     right: '86.13%',
//     bottom: '9.11%',
//     left: '6.93%',
//   },
//   keyboardsiphoneXlowercasel: {
//     height: 291,
//   },
//   homeIndicator: {
//     marginLeft: -66.5,
//     bottom: 8,
//     borderRadius: Border.br_81xl,
//     backgroundColor: Color.black,
//     width: 134,
//     height: 5,
//     left: '50%',
//     position: 'absolute',
//   },
//   systemLightHomeIndicato: {
//     height: 34,
//     left: 0,
//     right: 0,
//   },
//   time: {
//     left: 21,
//     fontSize: FontSize.size_mini,
//     fontWeight: '600',
//     fontFamily: FontFamily.sofiaSansSemiCondensed,
//     width: 54,
//     marginTop: -8,
//     letterSpacing: 0,
//     textAlign: 'center',
//     color: Color.white,
//     top: '50%',
//     position: 'absolute',
//   },
//   border: {
//     marginTop: -5.67,
//     right: 2,
//     borderRadius: 3,
//     borderColor: '#fff',
//     borderWidth: 1,
//     opacity: 0.35,
//     height: 11,
//     borderStyle: 'solid',
//   },
//   capIcon: {
//     marginTop: -2,
//     height: 4,
//     opacity: 0.4,
//     right: 0,
//     top: '50%',
//   },
//   capacity: {
//     marginTop: -3.67,
//     right: 4,
//     borderRadius: 1,
//     width: 18,
//     height: 7,
//     top: '50%',
//   },
//   battery: {
//     marginTop: -4.67,
//     right: 14,
//     height: 11,
//     top: '50%',
//     width: 24,
//     position: 'absolute',
//   },
//   wifiIcon: {
//     width: 15,
//     height: 11,
//   },
//   cellularConnectionIcon: {
//     width: 17,
//     height: 11,
//   },
//   systemLightStatusBar: {
//     height: 44,
//     position: 'absolute',
//   },
//   searchorder: {
//     backgroundColor: Color.aliceblue_100,
//     height: 812,
//     overflow: 'hidden',
//     width: '100%',
//     flex: 1,
//   },
//   textInput: {
//     height: 40,

//     // borderRadius: 8,
//     borderWidth: 0,
//     margin: 8,
//     width: '70%',
//     // backgroundColor: '#E6EBF1',

//     fontSize: 16,
//   },
// });

// export default SearchOrder;
