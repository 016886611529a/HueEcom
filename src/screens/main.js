import * as React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Homepage from '../stats/features/home/HomePage';
import LoginScreen from './login/login_screen';

const Stack = createNativeStackNavigator();

const Main = () => {
  // const [hideSplashScreen, setHideSplashScreen] = React.useState(true);
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default Main;
