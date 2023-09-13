import React, {useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import icSearch from '../assets/svg/ic_search.svg';
import SvgIcon from '../common/SvgIcon';
import {COLORS, FontFamily} from '../constants/theme';

const ComponentSearch = ({onSearch, isFocus}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = () => {
    onSearch(searchQuery);
  };
  // const [isFocus, setIsFocus] = useState(false);
  // useEffect(() => {
  //   setIsFocus(true);
  // }, []);
  return (
    <View style={styles.container}>
      <SvgIcon Icon={icSearch} style={styles.icon} onPress={handleSearch} />
      <TextInput
        // autoFocus={isFocus}
        style={styles.input}
        placeholder="Tìm kiếm sản phẩm"
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholderTextColor={COLORS.textColor}
        onSubmitEditing={handleSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // right: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 8,
    marginHorizontal: 20,
    paddingHorizontal: 12,
    height: 40,
  },

  icon: {
    marginRight: 5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: FontFamily.roboto,
    fontWeight: '400',
    lineHeight: 20,
    color: COLORS.textColor,
    opacity: 0.5,
  },
});

export default ComponentSearch;
