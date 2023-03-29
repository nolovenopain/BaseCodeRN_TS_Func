import React from 'react';
import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {HomeStack} from './homeStack';
import {AccountStack} from './accountStack';
import {SettingsStack} from './settingsStack';
import {Ionicons} from '../Components';
import {useSelector} from 'react-redux';
import {translate} from '../Language';
import {ApplicationState} from '../Redux';
import {Color} from '../Utils';
import {ParamListBase} from '@react-navigation/native';
import {Platform} from 'react-native';
import {px5} from '../Constants';
import LinearGradient from 'react-native-linear-gradient';

const Tab = createBottomTabNavigator<ParamListBase>();

export const BottomTabStack = () => {
  const language = useSelector(
    (state: ApplicationState) => state.settingsReducer.language,
  );

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let icon = '';

          if (route.name === 'HomeStack') {
            icon = focused ? 'home-outline' : 'home-outline';
          } else if (route.name === 'SettingsStack') {
            icon = focused ? 'settings-outline' : 'settings-outline';
          } else if (route.name === 'AccountStack') {
            icon = focused ? 'person-outline' : 'person-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={icon} color={color} size={size} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarItemStyle: {
          backgroundColor:
            Platform.OS == 'android' ? Color.white : Color.transparent,
          paddingBottom: Platform.OS == 'android' ? px5 * 1.5 : 0,
        },
        tabBarBackground: () => <></>,
      })}
      tabBar={props => {
        return (
          <LinearGradient
            colors={[Color.white, Color.white]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <BottomTabBar
              {...props}
              style={{height: Platform.OS == 'android' ? px5 * 12 : px5 * 16}}
            />
          </LinearGradient>
        );
      }}
      initialRouteName="HomeStack">
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{title: translate('home', language)}}
      />
      <Tab.Screen
        name="AccountStack"
        component={AccountStack}
        options={{title: translate('account', language)}}
      />
      <Tab.Screen
        name="SettingsStack"
        component={SettingsStack}
        options={{title: translate('settings', language)}}
      />
    </Tab.Navigator>
  );
};
