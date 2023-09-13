import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS, FontFamily, FontWeight, SIZES} from '../../constants/theme';
const ItemDescribeProduct = ({content}) => {
  const screenWidth = Dimensions.get('window').width;
  const deviceHeight = Dimensions.get('window').height;
  const sheetHeight = deviceHeight;
  const [collapsed, setCollapsed] = useState(true);
  const [maxLines, setMaxLines] = useState(1);
  const animationHeight = useRef(new Animated.Value(0)).current;
  const contentHeight = useRef(1).current;
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const collapseView = () => {
    Animated.timing(animationHeight, {
      duration: 100,
      toValue: 100,
      useNativeDriver: false,
    }).start();
  };

  const expandView = () => {
    setMaxLines(10);
    Animated.timing(animationHeight, {
      duration: 1000,
      toValue: 10000,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    if (collapsed) {
      collapseView();
    } else {
      expandView();
    }
  }, [collapsed]);

  const buttonIcon = collapsed ? 'keyboard-arrow-down' : 'keyboard-arrow-up';
  return (
    <View style={[styles.container, {width: screenWidth}]}>
      <Text style={styles.title}>Mô tả sản phẩm</Text>
      <Animated.View style={{maxHeight: animationHeight}}>
        <View
          style={{
            marginHorizontal: 15,
            marginVertical: 35,
            // bottom: 100,
            paddingBottom: 10,
          }}>
          {content}
        </View>
      </Animated.View>
      {collapsed ? (
        <TouchableOpacity onPress={toggleCollapsed} style={styles.button}>
          <Text style={styles.txtButton}>Xem thêm</Text>
          {/* <Icon
            name={buttonIcon}
            size={24}
            color={COLORS.primaryBlue}
            style={{top: 5, left: 5}}
          /> */}
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={toggleCollapsed}
          style={{
            bottom: 20,
            position: 'absolute',
            alignSelf: 'center',
          }}>
          <Text style={[styles.txtButton, {}]}>Thu gọn</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // bottom: 25,
    height: 'auto',
    marginVertical: 15,
    overflow: 'hidden',
    paddingVertical: 25,
    paddingTop: 11,
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    elevation: 3,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  title: {
    marginHorizontal: 16,
    marginVertical: 5,
    fontFamily: FontFamily.roboto,
    fontWeight: '700',
    fontSize: SIZES.h4,
    color: COLORS.textColor,
  },
  txt: {
    lineHeight: 24,
    marginVertical: 5,
  },

  button: {
    top: 25,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    opacity: 0.7,
    padding: 10,
  },
  txtButton: {
    top: 5,
    fontFamily: FontFamily.roboto,
    fontWeight: '400',
    fontSize: SIZES.h4,
    lineHeight: 20,
    color: COLORS.primaryBlue,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red',
  },
});

export default ItemDescribeProduct;
