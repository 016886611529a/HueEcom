import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import CategoriesScreen from './categories_screen';
import DetailCategory from './detail_category';
import DetailProductScreen from './detail_product_screen/detail_product_screen';
import HomeScreen from './home_screen';
import ProductWithCompany from './product_with_company_screen';
import SearchProductScreen from './search_product_screen';
import DrawerNavigator from './drawer/drawer_navigator';
import FilterScreen from './filter_screen';

export const StackNavigatorHome = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Root"
        component={HomeScreen}
        options={({route}) => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="Category"
        component={CategoriesScreen}
        options={({route}) => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="Detail_product"
        component={DetailProductScreen}
        options={({route}) => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="product_with_company"
        component={ProductWithCompany}
        options={({route}) => ({
          headerShown: false,
        })}
      />

      <Stack.Screen
        name="Search"
        component={SearchProductScreen}
        // component={DrawerNavigator}
        options={({route}) => ({
          bottomTabs: {
            visible: false,
            drawBehind: false,
            animate: true,
          },
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="Filter"
        component={FilterScreen}
        // component={DrawerNavigator}
        options={({route}) => ({
          bottomTabs: {
            visible: false,
            drawBehind: false,
            animate: true,
          },
          headerShown: false,
        })}
      />
    </Stack.Navigator>
  );
};
export const StackNavigatorCategory = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Category"
        component={CategoriesScreen}
        options={({route}) => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="detailCategory"
        component={DetailCategory}
        options={({route}) => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="Detail_product"
        component={DetailProductScreen}
        options={({route}) => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="product_with_company"
        component={ProductWithCompany}
        options={({route}) => ({
          headerShown: false,
        })}
      />
    </Stack.Navigator>
  );
};

export const StackNavigate = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={SearchProductScreen}
        options={({route}) => ({
          headerShown: false,
        })}
      />
    </Stack.Navigator>
  );
};
