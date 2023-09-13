
import * as React from 'react';


import Bg from '../stats/screens/Bg';
import DropdownDoanhSo from '../stats/screens/DropdownDoanhSo';
import DropdownDoanhThu from '../stats/screens/DropdownDoanhThu';
import Cover from '../stats/screens/Cover';
import Notification1 from '../stats/screens/Notification1';
import Result from '../stats/screens/Result';
import Toast from 'react-native-toast-message';
import OrderDetail from '../stats/screens/OrderDetail';
import AllOrder from '../stats/screens/AllOrder';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Homepage from '../stats/features/home/HomePage';
import ProccessingOrder from '../stats/features/orders/OrderPage';
import SearchOrder from '../stats/features/search/SearchPage';
import StatusDonHang from '../stats/screens/StatusDonHang';
import AllOrderExpandProduct from '../stats/screens/AllOrderExpandProduct';

const Stack = createNativeStackNavigator();

const StatsScreen = () => {
 // const [hideSplashScreen, setHideSplashScreen] = React.useState(true);
  return (
    <>
      <Toast />
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen
            name="Homepage"
            component={Homepage}
            options={{headerShown: false}}
            />
            <Stack.Screen
            name="StatusDonHang"
            component={StatusDonHang}
            options={{headerShown: false}}
            />
            <Stack.Screen
            name="Bg"
            component={Bg}
            options={{headerShown: false}}
            />
            <Stack.Screen
            name="DropdownDoanhSo"
            component={DropdownDoanhSo}
            options={{headerShown: false}}
            />
            <Stack.Screen
            name="DropdownDoanhThu"
            component={DropdownDoanhThu}
            options={{headerShown: false}}
            />
            <Stack.Screen
            name="Cover"
            component={Cover}
            options={{headerShown: false}}
            />
            <Stack.Screen
            name="Notification"
            component={Notification1}
            options={{headerShown: false}}
            />
            <Stack.Screen
            name="Result"
            component={Result}
            options={{headerShown: false}}
            />
            <Stack.Screen
            name="SearchOrder"
            component={SearchOrder}
            options={{headerShown: false}}
            />
            <Stack.Screen
            name="OrderDetail"
            component={OrderDetail}
            options={{headerShown: false}}
            />
            <Stack.Screen
            name="ProcessingOrder"
            component={ProccessingOrder}
            options={{headerShown: false}}
            />
            <Stack.Screen
            name="AllOrderExpandProduct"
            component={AllOrderExpandProduct}
            options={{headerShown: false}}
            />
            <Stack.Screen
            name="AllOrder"
            component={AllOrder}
            options={{headerShown: false}}
            />
        </Stack.Navigator>
    </>
  );
};
export default StatsScreen;
