import {createRef} from 'react';
import {CommonActions, DrawerActions, NavigationContainerRef} from '@react-navigation/native';
import {StackActions} from '@react-navigation/native';

export const navigationRef = createRef<NavigationContainerRef<any>>();

export const navigate = (screen: string, params: any) => {
  navigationRef.current?.navigate(screen, params);
};

export const goBack = () => {
  navigationRef.current?.goBack();
};

export const route = () => {
  navigationRef.current?.getCurrentRoute();
};

export const replace = (name: string, params?: object) => {
  navigationRef.current?.dispatch(StackActions.replace(name, params));
};

export const reset = (name: string, params?: object) => {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        {
          name,
          params,
        },
      ],
    }),
  );
};

export const push = (name: string, params?: object) => {
  navigationRef.current?.dispatch(StackActions.push(name, params));
};

export const pop = (count: number = 1) => {
  navigationRef.current?.dispatch(StackActions.pop(count));
};

export const popToTop = () => {
  navigationRef.current?.dispatch(StackActions.popToTop());
};

export const resetTo = (routes: Array<{ name: string; params?: any }>, index = 0) => {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      routes,
      index,
    }),
  )
};

export const toggleDrawer = () => {
  navigationRef.current?.dispatch(DrawerActions.toggleDrawer());
}
