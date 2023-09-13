import React from 'react';
import {
  ImageBackground,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import {clearData} from '../actions/search_product_actions';
import icBack from '../assets/svg/icBack.svg';
import icFilter from '../assets/svg/ic_filter.svg';
import SvgIcon from '../common/SvgIcon';
import ComponentSearch from '../components/search';
import {COLORS, FontFamily, FontWeight, SIZES} from '../constants/theme';
import searchBar from '../assets/svg/search_bar.svg';

export default function FilterScreen() {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      <ImageBackground
        resizeMode="stretch"
        source={require('../assets/images/appbar1.png')}
        style={styles.appBar}
        imageStyle={styles.backgroundImage}>
        <View style={styles.headerAppBar}>
          <TouchableOpacity
            onPress={() => {
              dispatch(clearData());
              navigation.pop();
            }}
            style={styles.icon}>
            <SvgIcon Icon={icBack} />
          </TouchableOpacity>
          <View style={{flex: 1, alignItems: 'center'}}>
            {/* <ComponentSearch onSearch={handleSearch} /> */}
            <View style={{alignItems: 'center'}}>
              <SvgIcon
                Icon={searchBar}
                size={15}
                onPress={() => {
                  navigation.push('Search');
                }}
              />
            </View>
          </View>
          <TouchableOpacity onPress={{}}>
            <SvgIcon Icon={icFilter} />
            <Text style={styles.filterText}>Lọc</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backGround,
  },
  appBar: {
    flex: 0.12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerAppBar: {
    position: 'absolute',

    flexDirection: 'row',
    marginHorizontal: 16,
    bottom: 15,
  },
  icon: {
    top: 8,
  },
  body: {
    flex: 0.88,
    marginHorizontal: 10,

    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filter: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginHorizontal: -5,
    right: 8,
  },
  filterText: {
    left: 3,
    top: 4,
    fontFamily: FontFamily.roboto,
    fontWeight: FontWeight.fontWeightNormal,
    fontSize: SIZES.h6,
    lineHeight: 16,
    color: COLORS.white,
  },
});
