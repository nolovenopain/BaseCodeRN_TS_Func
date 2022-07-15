import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Account} from '../Screens/Account';

const Stack = createNativeStackNavigator();

export const AccountStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Account" component={Account} />
    </Stack.Navigator>
  );
};
