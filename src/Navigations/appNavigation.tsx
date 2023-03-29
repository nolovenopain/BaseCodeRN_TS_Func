/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer, DefaultTheme, ParamListBase} from '@react-navigation/native';
import {navigationRef} from '../Navigations/rootNavigations';
import {BottomTabStack} from './bottomTabStack';
import {Color, Loading} from '../Utils';

const Stack = createNativeStackNavigator<ParamListBase>();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Color.white,
  },
};

const AppNavigation = () => {
  return (
    <>
      <NavigationContainer ref={navigationRef} theme={MyTheme}>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="BottomTabStack">
          <Stack.Screen name="BottomTabStack" component={BottomTabStack} />
        </Stack.Navigator>
      </NavigationContainer>
      
      <Loading />
    </>
  );
};

export default AppNavigation;
