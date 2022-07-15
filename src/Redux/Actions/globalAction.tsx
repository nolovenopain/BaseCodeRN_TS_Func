import {Dispatch} from 'react';

export interface CheckInternetConnection {
  readonly type: 'CHECK_INTERNET_CONNECTION';
  payload: boolean;
  isSaveLocalStore: boolean;
}

export interface ToggleLoading {
  readonly type: 'TOGGLE_LOADING';
  payload: boolean;
  loadingTitle: string;
}

export interface GlobalErrorAction {
  readonly type: 'ON_GLOBAL_ERROR';
  payload: any;
}

export type GlobalAction =
  | CheckInternetConnection
  | ToggleLoading
  | GlobalErrorAction;

export const onCheckInternetConnection = (
  isInternetConnected: boolean,
  isSaveLocalStore: boolean,
) => {
  isSaveLocalStore = isSaveLocalStore == null ? false : isSaveLocalStore;
  isInternetConnected =
    isInternetConnected == null ? false : isInternetConnected;
  return async (dispatch: Dispatch<GlobalAction>) => {
    try {
      dispatch({
        type: 'CHECK_INTERNET_CONNECTION',
        payload: isInternetConnected,
        isSaveLocalStore,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'ON_GLOBAL_ERROR',
        payload: error,
      });
    }
  };
};

export const onToggleLoading = (
  toggleLoading: boolean,
  loadingTitle: string,
) => {
  return async (dispatch: Dispatch<GlobalAction>) => {
    try {
      dispatch({
        type: 'TOGGLE_LOADING',
        payload: toggleLoading,
        loadingTitle,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'ON_GLOBAL_ERROR',
        payload: error,
      });
    }
  };
};
