import {createNavigationContainerRef} from '@react-navigation/native';
import {StackActions} from '@react-navigation/native';

export const navigationRef =
  createNavigationContainerRef<ReactNavigation.RootParamList>();

export const navigate = (screen: never, params: never) => {
  if (navigationRef.isReady()) {
    navigationRef.current?.navigate(screen, params);
  }
};

export const goBack = () => {
  if (navigationRef.isReady()) {
    navigationRef.current?.goBack();
  }
};

export const replace = (name: string, params?: object) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.replace(name, params));
  }
};

export const push = (name: string, params?: object) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.push(name, params));
  }
};

export const pop = (count: number = 1) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.pop(count));
  }
};

export const popToTop = () => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.popToTop());
  }
};
