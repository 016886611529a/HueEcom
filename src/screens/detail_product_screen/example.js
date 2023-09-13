import * as React from 'react';
import {useEffect, useState, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  Animated,
  TouchableOpacity,
} from 'react-native';
import SvgIcon from '../../common/SvgIcon';
import icDown from '../../assets/svg/ic_down';
import icUp from '../../assets/svg/ic_up';
import {COLORS, FontFamily, SIZES} from '../../constants/theme';

function CollapseView() {
  const [collapsed, setCollapsed] = useState(true);
  const [maxLines, setMaxLines] = useState(2);
  const animationHeight = useRef(new Animated.Value(0)).current;

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const collapseView = () => {
    Animated.timing(animationHeight, {
      duration: 1000,
      toValue: 80,
      useNativeDriver: false,
    }).start();
  };

  const expandView = () => {
    setMaxLines(null);
    Animated.timing(animationHeight, {
      duration: 1000,
      toValue: 1000,
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

  return (
    <View style={{overflow: 'hidden'}}>
      <Animated.View style={{maxHeight: animationHeight}}>
        <Text style={styles.paragraph} numberOfLines={maxLines}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
      </Animated.View>
      <TouchableOpacity onPress={toggleCollapsed} style={styles.button}>
        <Text style={styles.txtButton}>
          {collapsed ? 'Xem thêm' : 'Thu gọn'}
        </Text>
        <View style={styles.iconContainer}>
          <SvgIcon
            Icon={collapsed ? icDown : icUp}
            width={14}
            fill={COLORS.primaryBlue}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  paragraph: {
    margin: 24,
    fontSize: 14,
    fontWeight: 'bold',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  txtButton: {
    fontFamily: FontFamily.roboto,
    fontWeight: '400',
    fontSize: SIZES.h4,
    lineHeight: 20,
    color: COLORS.primaryBlue,
  },
  iconContainer: {
    marginLeft: 5,
    top: 15,
  },
});

export default CollapseView;
