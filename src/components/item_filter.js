import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {COLORS, FontFamily, FontWeight, SIZES} from '../constants/theme';

export const ItemFilter = ({textItem, selectItem, selected1, multi, ID}) => {
  const screenWidth = Dimensions.get('window').width;
  const [isActive, setIsActive] = useState(false);
  const [selected, isSelected] = useState(false);

  const handleSelectItem = () => {
    if (!multi) {
      if (selected1(ID, !isActive)) {
        setIsActive(!isActive);
        selectItem({text: textItem, id: ID, isActive: isActive});
      }
    } else {
      setIsActive(!isActive);
      selectItem({text: textItem, id: ID, isActive: isActive});
    }

    // false= true return biến
  };

  // const handleSelectItem = () => {
  //   setIsActive(!isActive);
  //   selectItem({text: textItem, isActive: isActive});

  //   // false= true return biến

  return (
    <TouchableOpacity
      style={[
        styles.containerItem,
        isActive && {
          borderWidth: 1,
          borderColor: COLORS.primaryBlue,
        },
      ]}
      onPress={handleSelectItem}
      activeOpacity={0.85}>
      <Text
        style={[
          styles.textItem,
          isActive && {
            color: COLORS.primaryBlue,
          },
        ]}
        numberOfLines={3}
        ellipsizeMode="clip">
        {textItem}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerItem: {
    width: '29%',
    backgroundColor: COLORS.itemCategory,
    borderRadius: 4,
    paddingVertical: 15,
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textItem: {
    fontWeight: FontWeight.fontWeight500,
    justifyContent: 'center',
    fontFamily: FontFamily.roboto,
    fontSize: SIZES.h4,
    textAlign: 'center',
    lineHeight: 24,
    color: COLORS.textColor,
  },
  containerActive: {
    borderWidth: 1,
    borderColor: 'red',
  },

  textActive: {
    color: 'blue',
  },
});
