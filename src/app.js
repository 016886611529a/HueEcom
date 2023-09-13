// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import React from 'react';
// import {Provider} from 'react-redux';
// import category from './assets/svg/category.svg';
// import home from './assets/svg/home.svg';
// import SvgIcon from './common/SvgIcon';
// import store from './redux/store';
// import {
//   StackNavigatorCategory,
//   StackNavigatorHome,
// } from './screens/stack_navigator';
// const Tab = createBottomTabNavigator();
// const Stack = createNativeStackNavigator();
// const App = () => {
//   return (
//     <Provider store={store}>
//       <NavigationContainer>
//         <Tab.Navigator>
//           <Tab.Screen
//             name="Trang Chủ"
//             options={({route}) => ({
//               headerShown: false,
//               tabBarIcon: () => <SvgIcon Icon={home} />,
//             })}
//             component={StackNavigatorHome}
//           />
//           <Tab.Screen
//             name="Danh mục"
//             options={({route}) => ({
//               headerShown: false,
//               tabBarIcon: () => <SvgIcon Icon={category} />,
//             })}
//             component={StackNavigatorCategory}
//           />
//         </Tab.Navigator>
//       </NavigationContainer>
//     </Provider>
//   );
// };

// export default App;
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Provider} from 'react-redux';

import store from './redux/store';
import UserScreen from './screens/user_screen';
import StatsScreen from './screens/stats_screen';
import Main from './screens/main';
import LoginScreen from './screens/login/login_screen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen
            name="Main"
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="User"
            component={UserScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="StatsScreen"
            component={StatsScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
