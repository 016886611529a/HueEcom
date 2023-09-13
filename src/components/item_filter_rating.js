// import React from 'react';
// import {View, StyleSheet, Text, Dimensions, ScrollView} from 'react-native';
// import {COLORS, FontFamily, FontWeight, SIZES} from '../constants/theme';
// export const ItemRating = () => {
//   const screenWidth = Dimensions.get('window').width / 1.095;

//   return (
//     <View
//       style={[
//         {flexDirection: 'row', justifyContent: 'space-between'},
//         {width: screenWidth},
//       ]}>
//       <View style={styles.containerItemRating}>
//         <Text style={styles.textItem} numberOfLines={2} ellipsizeMode="tail">
//           5 sao
//         </Text>
//       </View>
//       <View style={styles.containerItemRating}>
//         <Text style={styles.textItem} numberOfLines={2} ellipsizeMode="middle">
//           4 sao
//         </Text>
//       </View>
//       <View style={styles.containerItemRating}>
//         <Text style={styles.textItem} numberOfLines={2} ellipsizeMode="middle">
//           3 sao
//         </Text>
//       </View>
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   containerItemRating: {
//     width: '30%',
//     backgroundColor: COLORS.itemCategory,
//     opacity: 0.5,
//     borderRadius: 4,
//     paddingVertical: 10,
//     paddingHorizontal: 30,
//     borderWidth: 1,
//     borderColor: COLORS.primaryBlue,
//     shadowColor: COLORS.primaryBlue,
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 2,
//     elevation: 1,
//   },

//   textItem: {
//     alignSelf: 'center',
//     fontFamily: FontFamily.roboto,
//     fontSize: SIZES.h5,
//     lineHeight: 20,
//     alignItems: 'center',
//     fontWeight: FontWeight.fontWeightNormal,
//     justifyContent: 'center',
//   },
// });

import React, {useState} from 'react';
import {View, StyleSheet, Text, Dimensions, ScrollView} from 'react-native';
import {COLORS, FontFamily, FontWeight, SIZES} from '../constants/theme';

export const ItemRating = () => {
  const screenWidth = Dimensions.get('window').width / 1.095;
  const [activeIndex, setActiveIndex] = useState();

  const handleItemClick = index => {
    setActiveIndex(index);
  };

  return (
    <View
      style={[
        {flexDirection: 'row', justifyContent: 'space-between'},
        {width: screenWidth},
      ]}>
      <View
        style={[
          styles.containerItemRating,
          activeIndex === 0
            ? {
                borderColor: COLORS.primaryBlue,
                backgroundColor: COLORS.backGround,
              }
            : {
                borderColor: COLORS.itemCategory,
                backgroundColor: COLORS.itemCategory,
              },
        ]}
        onTouchEnd={() => handleItemClick(0)}>
        <Text
          style={[
            styles.textItem,
            activeIndex === 0
              ? {
                  color: COLORS.primaryBlue,
                }
              : {
                  color: COLORS.textColor,
                },
          ]}
          numberOfLines={2}
          ellipsizeMode="tail">
          5 sao
        </Text>
      </View>
      <View
        style={[
          styles.containerItemRating,
          activeIndex === 1
            ? {
                borderColor: COLORS.primaryBlue,
                backgroundColor: COLORS.backGround,
              }
            : {
                borderColor: COLORS.itemCategory,
                backgroundColor: COLORS.itemCategory,
              },
        ]}
        onTouchEnd={() => handleItemClick(1)}>
        <Text
          style={[
            styles.textItem,
            activeIndex === 1
              ? {
                  color: COLORS.primaryBlue,
                }
              : {
                  color: COLORS.textColor,
                },
          ]}
          numberOfLines={2}
          ellipsizeMode="middle">
          4 sao
        </Text>
      </View>
      <View
        style={[
          styles.containerItemRating,
          activeIndex === 2
            ? {
                borderColor: COLORS.primaryBlue,
                backgroundColor: COLORS.backGround,
              }
            : {
                // borderColor: COLORS.itemCategory,
                backgroundColor: COLORS.itemCategory,
                borderWidth: 0,
              },
        ]}
        onTouchEnd={() => handleItemClick(2)}>
        <Text
          style={[
            styles.textItem,
            activeIndex === 2
              ? {
                  color: COLORS.primaryBlue,
                }
              : {
                  color: COLORS.textColor,
                },
          ]}
          numberOfLines={2}
          ellipsizeMode="middle">
          3 sao
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerItemRating: {
    width: '30%',
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderWidth: 1,
  },

  textItem: {
    alignSelf: 'center',

    alignItems: 'center',
    fontWeight: FontWeight.fontWeight500,
    justifyContent: 'center',
    fontFamily: FontFamily.roboto,

    fontSize: SIZES.h4,

    lineHeight: 24,
  },
});
