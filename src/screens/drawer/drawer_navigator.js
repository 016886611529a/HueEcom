// import React from 'react';
// import {createDrawerNavigator} from '@react-navigation/drawer';
// import {View, StyleSheet} from 'react-native';
// import SearchProductScreen from '../search_product_screen';

// const Drawer = createDrawerNavigator();

// const DrawerNavigator = () => {
//   return (
//     <Drawer.Navigator
//       screenOptions={{
//         drawerWidth: 500,
//         drawerPosition: 'right',
//         headerShown: false,
//         drawerStyle: {right: 0},
//         bottomTabs: {
//           visible: false,
//           drawBehind: false,
//           animate: true,
//         },
//       }}>
//       <Drawer.Screen
//         name="Search"
//         options={({route}) => ({
//           bottomTabs: {
//             visible: false,
//             drawBehind: false,
//             animate: true,
//           },
//           headerShown: false,
//         })}
//         component={SearchProductScreen}
//       />
//     </Drawer.Navigator>
//   );
// };

// const styles = StyleSheet.create({});

// export default DrawerNavigator;
