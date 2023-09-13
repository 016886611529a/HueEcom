import * as React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StackNavigatorHome} from './stack_navigator';
import {StackNavigatorCategory} from './stack_navigator';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {COLORS, FontFamily, FontWeight, SIZES} from '../constants/theme';

import category from '../assets/svg/category.svg';
import categoryActive from '../assets/svg/category_active.svg';
import ThongKe from '../assets/svg/ic_ThongKe.svg';
import ThongKeActive from '../assets/svg/ic_ThongKe_active.svg';

import homeActive from '../assets/svg/home_active.svg';
import home from '../assets/svg/home.svg';
import SvgIcon from '../common/SvgIcon';
import StatsScreen from './stats_screen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const UserScreen = () => {
  // const [hideSplashScreen, setHideSplashScreen] = React.useState(true);
  return (
    <>
      <Tab.Navigator
        screenOptions={({route}) => ({
          activeTintColor: COLORS.primaryBlue,
          inactiveTintColor: COLORS.primaryBlue,
          tabBarActiveTintColor: 'red',
          headerShown: false,
          tabBarIcon: ({focused}) => {
            let icon;

            if (route.name === 'Trang Chủ') {
              icon = focused ? (
                <SvgIcon Icon={homeActive} />
              ) : (
                <SvgIcon Icon={home} />
              );
            } else if (route.name === 'Danh mục') {
              icon = focused ? (
                <SvgIcon Icon={categoryActive} />
              ) : (
                <SvgIcon Icon={category} />
              );
            } else if (route.name === 'Thống kê') {
              icon = focused ? (
                <SvgIcon Icon={ThongKeActive} />
              ) : (
                <SvgIcon Icon={ThongKe} />
              );
            }

            return icon;
          },
          tabBarStyle: {
            backgroundColor: 'white',
          },
          tabBarActiveTintColor: COLORS.primaryBlue,
          tabBarLabelStyle: {
            fontFamily: FontFamily.roboto,
            fontWeight: FontWeight.fontWeight500,
            fontSize: SIZES.h6,
            lineHeight: 16,
            bottom: 4,
          },
        })}>
        <Tab.Screen name="Trang Chủ" component={StackNavigatorHome} />
        <Tab.Screen name="Danh mục" component={StackNavigatorCategory} />

        {!global.normal && (
          <Tab.Screen name="Thống kê" component={StatsScreen} />
        )}
      </Tab.Navigator>
    </>
  );
};
export default UserScreen;
