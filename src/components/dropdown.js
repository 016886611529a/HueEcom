// import React, {useEffect, useState} from 'react';
// import {StyleSheet, View} from 'react-native';
// import {Dropdown} from 'react-native-element-dropdown';
// import Icon from 'react-native-vector-icons/SimpleLineIcons';
// import {COLORS, SIZES} from '../constants/theme';

// const CustomDropdown = ({items, defaultValue, onChange, placeholder}) => {
//   const [open, setOpen] = useState(false);
//   const [value, setValue] = useState(null); // Bắt đầu với giá trị null
//   const [selectedValue, setSelectedValue] = useState(null); // Lưu trữ giá trị được chọn

//   const handleValueChange = itemValue => {
//     setSelectedValue(itemValue); // Cập nhật giá trị được chọn
//     setValue(itemValue);
//     if (onChange) {
//       onChange(itemValue);
//     }
//   };

//   useEffect(() => {
//     setValue(defaultValue); // Cập nhật giá trị ban đầu
//   }, [defaultValue]);

//   const CustomArrowUp = () => (
//     <View style={{marginLeft: 5}}>
//       <Icon name={'arrow-up'} size={16} color={COLORS.dropdown} />
//     </View>
//   );

//   const CustomArrowDown = () => (
//     <Icon name={'arrow-down'} size={16} color={COLORS.primaryBlue} />
//   );

//   return (
//     <View style={{position: 'relative', zIndex: 1}}>
//       <Dropdown
//         style={styles.dropdown}
//         placeholderStyle={{
//           color: 'grey',
//           opacity: 0.5,
//           fontFamily: 'Mulish',
//           fontSize: SIZES.h5,
//           fontWeight: '400',
//         }}
//         itemTextStyle={styles.itemTextStyle}
//         selectedTextStyle={styles.selectedTextStyle}
//         data={items}
//         labelField="label"
//         valueField="value"
//         placeholder={placeholder}
//         value={value}
//         // onChange={item => {
//         //   setValue(item.value);
//         // }}
//         onChange={handleValueChange}
//         renderRightIcon={() => (open ? <CustomArrowUp /> : <CustomArrowDown />)}
//       />
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   dropdown: {
//     borderBottomColor: 'white',
//     borderBottomWidth: 1,
//     marginBottom: 20,
//   },
//   itemTextStyle: {
//     color: COLORS.primaryBlue,
//     opacity: 0.5,
//     fontSize: 16,
//   },
//   placeholderStyle: {
//     color: COLORS.primaryBlue,

//     fontSize: 16,
//   },
//   selectedTextStyle: {
//     color: COLORS.primaryBlue,
//     opacity: 0.5,
//     fontSize: SIZES.h4,
//   },
// });
// export default CustomDropdown;
