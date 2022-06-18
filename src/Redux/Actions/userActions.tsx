import axios from 'axios';
import {Dispatch} from 'react';
import Config from 'react-native-config';
import {UserModel} from '..';
import { FORGOT_PASSWORD, LOGIN, PROFILE } from '../../Constants';
import { navigate } from '../../Navigations/rootNavigations';
import { checkStatus } from '../../Utils';
import { AccountLogin } from '../models';
import AxiosInstance from '../setupAxios';
import { GlobalAction } from './globalAction';

export interface Address {
  displayAddress: string;
  postalCode: string;
  city: string;
  country: string;
  street: string;
  latitude?: number;
  longitude?: number;
}

export interface UpdateLocationAction {
  readonly type: 'ON_UPDATE_LOCATION';
  payload: Object;
  isSaveLocalStore: boolean;
}

export interface UpdateAccountLoginAction {
  readonly type: 'ON_UPDATE_ACCOUNT_LOGIN';
  payload: AccountLogin;
  isSaveLocalStore: boolean;
}

export interface UpdateUser {
  readonly type: 'ON_UPDATE_USER';
  payload: UserModel;
  isSaveLocalStore: boolean;
}

export interface UserLoginAction {
  readonly type: 'ON_USER_LOGIN';
  payload: {
    user: UserModel;
    accountLogin: AccountLogin;
  };
  isSaveLocalStore: boolean;
  isRemember: boolean;
}

export interface RememberUserLoginAction {
  readonly type: 'ON_REMEMBER_USER_LOGIN';
  payload: AccountLogin;
}

export interface UserChangePasswordAction {
  readonly type: 'ON_USER_CHANGE_PASSWORD';
  payload: any;
}

export interface UserSignUpAction {
  readonly type: 'ON_USER_SIGN_UP';
  payload: any;
}

export interface GetProfileAction {
  readonly type: 'ON_GET_PROFILE';
  payload: UserModel;
}

export interface UserLogoutAction {
  readonly type: 'ON_USER_LOGOUT';
}

export interface UserSuccessAction {
  readonly type: 'ON_USER_SUCCESS';
  payload: any;
}

export interface UserErrorAction {
  readonly type: 'ON_USER_ERROR';
  payload: any;
}

export type UserAction =
  | UserLoginAction
  | UserSignUpAction
  | UserLogoutAction
  | UpdateLocationAction
  | UpdateUser
  | RememberUserLoginAction
  | UserChangePasswordAction
  | UpdateAccountLoginAction
  | GetProfileAction
  | UserSuccessAction
  | UserErrorAction;

export const onUpdateLocation = (
  location: Object,
  isSaveLocalStore: boolean,
) => {
  isSaveLocalStore = isSaveLocalStore == null ? false : isSaveLocalStore;
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({
        type: 'ON_UPDATE_LOCATION',
        payload: location,
        isSaveLocalStore,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'ON_USER_ERROR',
        payload: error,
      });
    }
  };
};

export const onUpdateUser = (user: UserModel, isSaveLocalStore: boolean) => {
  isSaveLocalStore = isSaveLocalStore == null ? false : isSaveLocalStore;
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({
        type: 'ON_UPDATE_USER',
        payload: user,
        isSaveLocalStore,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'ON_USER_ERROR',
        payload: error,
      });
    }
  };
};

export const onUserLogin = (email: string, password: string, isRemember: boolean, isSaveLocalStore: boolean,) => {
  return async (dispatch: Dispatch<UserAction | GlobalAction>) => {
    try {
      dispatch({
        type: 'TOGGLE_LOADING',
        payload: true,
        loadingTitle: '',
      });
      const response = await AxiosInstance.post<UserModel>(
        LOGIN,
        {
          email,
          password,
        },
      );
      if (!response) {
        dispatch({
          type: 'ON_USER_ERROR',
          payload: 'Đăng nhập thất bại',
        });
      } else {
        const resp = await checkStatus(response, dispatch);
        if (!resp.error) {
          isRemember &&
            dispatch({
              type: 'ON_USER_LOGIN',
              payload: {
                user: resp.data.Data,
                accountLogin: {username: email, password: password},
              },
              isSaveLocalStore,
              isRemember,
            });
          !isRemember &&
            dispatch({
              type: 'ON_USER_LOGIN',
              payload: {
                user: resp.data.Data,
                accountLogin: {} as AccountLogin,
              },
              isSaveLocalStore,
              isRemember,
            });
          navigate('BottomStack' as never, {} as never);
        } else {
          dispatch({
            type: 'ON_USER_ERROR',
            payload: resp.message,
          });
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const resp = await checkStatus(error.response, dispatch);
        dispatch({
          type: 'ON_USER_ERROR',
          payload: resp.message,
        });
      } else {
        console.log(error);
      }
    } finally {
      dispatch({
        type: 'TOGGLE_LOADING',
        payload: false,
        loadingTitle: '',
      });
    }
  };
};

export const onUpdateAccountLogin = (
  accountLogin: AccountLogin,
  isSaveLocalStore: boolean,
) => {
  isSaveLocalStore = isSaveLocalStore == null ? false : isSaveLocalStore;
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({
        type: 'ON_UPDATE_ACCOUNT_LOGIN',
        payload: accountLogin,
        isSaveLocalStore,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'ON_USER_ERROR',
        payload: error,
      });
    }
  };
};

export const onUserSignup = (
  email: string,
  phone: string,
  password: string,
) => {
  return async (dispatch: Dispatch<UserAction | GlobalAction>) => {
    try {
      dispatch({
        type: 'TOGGLE_LOADING',
        payload: true,
        loadingTitle: '',
      });
      const response = await AxiosInstance.post<UserModel>(
        `${Config.DEV_BASE_URL}/user/create-account`,
        {
          email,
          phone,
          password,
        },
      );

      if (!response) {
        dispatch({
          type: 'ON_USER_ERROR',
          payload: 'Đăng ký thất bại',
        });
      } else {
        const resp = await checkStatus(response, dispatch);
        if (!resp.error) {
          dispatch({
            type: 'ON_USER_SIGN_UP',
            payload: resp.data,
          });
          dispatch({
            type: 'ON_USER_SUCCESS',
            payload:
              'Bạn đã đăng ký tài khoản thành công! Tài khoản của bạn sẽ được kích hoạt ngay khi hồ sơ được phê duyệt. Vui lòng liên hệ CSKH để được hỗ trợ',
          });
        } else {
          dispatch({
            type: 'ON_USER_ERROR',
            payload: resp.message,
          });
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const resp = await checkStatus(error.response, dispatch);
        dispatch({
          type: 'ON_USER_ERROR',
          payload: resp.message,
        });
      } else {
        console.log(error);
      }
    } finally {
      dispatch({
        type: 'TOGGLE_LOADING',
        payload: false,
        loadingTitle: '',
      });
    }
  };
};

export const onUserForgotPassword = (Email: string) => {
  return async (dispatch: Dispatch<UserAction | GlobalAction>) => {
    try {
      dispatch({
        type: 'TOGGLE_LOADING',
        payload: true,
        loadingTitle: '',
      });
      const response = await AxiosInstance.post(FORGOT_PASSWORD, {Email});
      if (!response) {
        dispatch({
          type: 'ON_USER_ERROR',
          payload: 'Gửi email thất bại',
        });
        return null;
      } else {
        const resp = await checkStatus(response, dispatch);
        if (!resp.error) {
          return resp.data;
        } else {
          dispatch({
            type: 'ON_USER_ERROR',
            payload: resp.message,
          });
          return null;
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const resp = await checkStatus(error.response, dispatch);
        dispatch({
          type: 'ON_USER_ERROR',
          payload: resp.message,
        });
      } else {
        console.log(error);
      }
      return null;
    } finally {
      dispatch({
        type: 'TOGGLE_LOADING',
        payload: false,
        loadingTitle: '',
      });
    }
  };
};

export const onGetUserProfile = () => {
  return async (
    dispatch: Dispatch<UserAction | GlobalAction>,
  ) => {
    try {
      const response = await AxiosInstance.get(PROFILE);
      if (!response) {
        dispatch({
          type: 'ON_USER_ERROR',
          payload: 'Không tải được thông tin tài khoản',
        });
        return {};
      } else {
        const resp = await checkStatus(response, dispatch);
        if (!resp.error) {
          if (resp.data.Data.IsActive == 1) {
            return resp.data.Data;
          } else {
            onUserLogout();
            return {};
          }
        } else {
          resp.status != 401 &&
            resp.status != 403 &&
            resp.status != 417 &&
            dispatch({
              type: 'ON_USER_ERROR',
              payload: resp.message,
            });
          return {};
        }
      }
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        const resp = await checkStatus(error.response, dispatch);
        resp.status != 401 &&
          resp.status != 403 &&
          resp.status != 417 &&
          dispatch({
            type: 'ON_USER_ERROR',
            payload: resp.message,
          });
      } else {
        console.log(error);
      }
      return {};
    } finally {
      dispatch({
        type: 'TOGGLE_LOADING',
        payload: false,
        loadingTitle: '',
      });
    }
  };
};

export const onUserLogout = () => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({
        type: 'ON_USER_LOGOUT',
      });
      dispatch({type: 'ON_USER_ERROR', payload: undefined});
      navigate('Login' as never, {} as never);
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'ON_USER_ERROR',
        payload: 'Đăng xuất thất bại',
      });
    }
  };
};
