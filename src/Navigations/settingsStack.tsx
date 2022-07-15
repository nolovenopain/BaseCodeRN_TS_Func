import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Settings} from '../Screens/Settings';

const Stack = createNativeStackNavigator();

export const SettingsStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
};
