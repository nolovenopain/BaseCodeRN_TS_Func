import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeStack } from './homeStack';
import { AccountStack } from './accountStack';
import { SettingsStack } from './settingsStack';
import { Ionicons } from '../Components';
import { useSelector } from 'react-redux';
import { translate } from '../Language';
import { ApplicationState } from '../Redux';

const Tab = createBottomTabNavigator();

export const BottomTabStack = () => {
    const language = useSelector((state: ApplicationState) => state.settingsReducer.language)
    return ( 
        <Tab.Navigator 
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                let icon;
    
                if (route.name === 'HomeStack') {
                    icon = focused
                    ? 'home-outline'
                    : 'home-outline'
                } else if (route.name === 'SettingsStack') {
                    icon = focused 
                    ? 'settings-outline'
                    : 'settings-outline'
                } else if (route.name === 'AccountStack') {
                    icon = focused 
                    ? 'person-outline'
                    :'person-outline'
                }
    
                // You can return any component that you like here!
                return <Ionicons name={icon} color={color} size={size}/>;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                headerShown: false
            })}
            initialRouteName='HomeStack'
        >
            <Tab.Screen name="HomeStack" component={HomeStack} options={{ title: translate('home', language) }}/>
            <Tab.Screen name="AccountStack" component={AccountStack} options={{ title: translate('account', language) }}/>
            <Tab.Screen name="SettingsStack" component={SettingsStack} options={{ title: translate('settings', language) }}/>
        </Tab.Navigator>
    )
}