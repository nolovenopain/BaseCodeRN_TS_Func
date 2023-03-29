import React, {useLayoutEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Account} from '../Screens/Account';
import {
  getFocusedRouteNameFromRoute,
  NavigationProp,
  ParamListBase,
  Route,
} from '@react-navigation/native';

const Stack = createNativeStackNavigator<ParamListBase>();

export const AccountStack = ({
  navigation,
  route,
}: {
  navigation: NavigationProp<ParamListBase>;
  route: Partial<Route<string>>;
}) => {
  useLayoutEffect(() => {
    const tabHiddenRoutes = [''];

    if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route)!)) {
      navigation.setOptions({tabBarStyle: {display: 'none'}});
    } else {
      navigation.setOptions({tabBarStyle: {display: 'flex'}});
    }
  }, [navigation, route]);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Account" component={Account} />
    </Stack.Navigator>
  );
};
