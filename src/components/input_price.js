// import React, {useState} from 'react';
// import {TextInput, View, StyleSheet, Text} from 'react-native';
// import {COLORS, SIZES} from '../constants/theme';

// const InputPrice = ({placeholder, onPriceChange}) => {
//   const [text, setText] = useState('');
//   const reset = () => {
//     setText('');
//   };

//   React.useImperativeHandle(ref, () => ({
//     reset: reset
//   }));
//   const handleChangeText = inputText => {
//     setText(inputText);
//     onPriceChange(inputText);
//   };

//   const formatCurrency = value => {
//     const formattedValue = value.replace(/\D/g, ''); // Remove non-digit characters
//     const number = parseInt(formattedValue, 10);
//     if (isNaN(number)) {
//       return '';
//     }
//     return number.toLocaleString('vi-VN');
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         keyboardType="numeric"
//         style={styles.textInput}
//         placeholder={placeholder}
//         value={formatCurrency(text)}
//         onChangeText={handleChangeText}
//         placeholderTextColor={`${COLORS.textColor}30`}
//       />
//       <Text style={styles.defaultText}>đ</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     width: '45%',
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: COLORS.itemCategory,
//     borderRadius: 4,
//     paddingHorizontal: 10,
//     // marginBottom: 55,
//   },
//   textInput: {
//     fontSize: SIZES.h4,
//     flex: 1,
//     color: COLORS.textColor,
//   },
// });

// export default InputPrice;

import React, {useState, useRef} from 'react';
import {TextInput, View, StyleSheet, Text} from 'react-native';
import {COLORS, SIZES} from '../constants/theme';

const InputPrice = React.forwardRef(({placeholder, onPriceChange}, ref) => {
  const [text, setText] = useState('');

  const handleChangeText = inputText => {
    setText(inputText);
    onPriceChange(inputText);
  };

  const formatCurrency = value => {
    const formattedValue = value.replace(/\D/g, ''); // Remove non-digit characters
    const number = parseInt(formattedValue, 10);
    if (isNaN(number)) {
      return '';
    }
    return number.toLocaleString('vi-VN');
  };

  const reset = () => {
    setText('');
  };

  React.useImperativeHandle(ref, () => ({
    reset: reset,
  }));

  return (
    <View style={styles.container}>
      <TextInput
        keyboardType="numeric"
        style={styles.textInput}
        placeholder={placeholder}
        value={formatCurrency(text)}
        onChangeText={handleChangeText}
        placeholderTextColor={`${COLORS.textColor}30`}
      />
      <Text style={styles.defaultText}>đ</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.itemCategory,
    borderRadius: 4,
    paddingHorizontal: 10,
    // marginBottom: 55,
  },
  textInput: {
    fontSize: SIZES.h4,
    flex: 1,
    color: COLORS.textColor,
  },
});

export default InputPrice;
