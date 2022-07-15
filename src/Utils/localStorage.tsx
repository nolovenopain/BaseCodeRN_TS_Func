import AsyncStorage from '@react-native-async-storage/async-storage';
import {AccountLogin, UserModel} from '../Redux';
import {initialUserState} from '../Redux/Reducers/userReducer';

const USER_SAVED = 'USER_SAVED';
const FCM_TOKEN = 'FCM_TOKEN';
const USER_LOCATION = 'USER_LOCATION';
const LANGUAGE = 'LANGUAGE';
const ACCOUNT_REMEMBER = 'ACCOUNT_REMEMBER';

export const LocalStorage = {
  getItem: async function (key: string, _default: any) {
    try {
      let item = await AsyncStorage.getItem(key);
      return item == null ? _default : item;
    } catch (ex) {
      return null;
    }
  },
  setItem: async function (key: string, value: string) {
    return await AsyncStorage.setItem(key, value);
  },
  removeItem: async function (key: string) {
    return await AsyncStorage.removeItem(key);
  },
  setUserSaved: (user: UserModel) => {
    LocalStorage.setItem(USER_SAVED, JSON.stringify(user || ({} as UserModel)));
  },
  getUserSaved: async () => {
    return new Promise((resolve, reject) => {
      LocalStorage.getItem(USER_SAVED, '{}').then(value => {
        var userSaved = {
          ...initialUserState.user,
          ...JSON.parse(value),
        };
        resolve(userSaved);
      });
    });
  },
  setAccountRemember: (account: AccountLogin) => {
    LocalStorage.setItem(
      ACCOUNT_REMEMBER,
      JSON.stringify(account || ({} as AccountLogin)),
    );
  },
  getAccountRemember: async () => {
    return new Promise((resolve, reject) => {
      LocalStorage.getItem(ACCOUNT_REMEMBER, '{}').then(value => {
        var userSaved = {
          ...initialUserState.accountLogin,
          ...JSON.parse(value),
        };
        resolve(userSaved);
      });
    });
  },
  setDeviceToken: (token: string) => {
    LocalStorage.setItem(FCM_TOKEN, token || '');
  },
  getDeviceToken: async () => {
    return new Promise((resolve, reject) => {
      LocalStorage.getItem(FCM_TOKEN, '').then(value => {
        resolve(value);
      });
    });
  },
  setUserLocation: (location: any) => {
    LocalStorage.setItem(USER_LOCATION, JSON.stringify(location));
  },
  getUserLocation: async () => {
    return new Promise((resolve, reject) => {
      LocalStorage.getItem(USER_LOCATION, {}).then(value => {
        resolve(value);
      });
    });
  },
  setLanguage: (language: string) => {
    LocalStorage.setItem(LANGUAGE, language);
  },
  getLanguage: async () => {
    return new Promise((resolve, reject) => {
      LocalStorage.getItem(LANGUAGE, '').then(value => {
        resolve(value);
      });
    });
  },
};
