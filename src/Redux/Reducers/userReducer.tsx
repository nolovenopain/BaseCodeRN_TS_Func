import {LocalStorage} from '../../Utils';
import {UserAction} from '../actions';
import {AccountLogin, UserModel, UserState} from '../models';

export const initialUserState: UserState = {
  user: {} as UserModel,
  accountLogin: {} as AccountLogin,
  error: undefined,
  success: undefined,
};

const UserReducer = (
  state: UserState = initialUserState,
  action: UserAction,
) => {
  switch (action.type) {
    case 'ON_USER_SIGN_UP':
      return {
        ...state,
        success: action.payload.Message,
      };
    case 'ON_USER_LOGIN':
      var _state = {
        ...state,
        user: action.payload.user,
        accountLogin: action.payload.accountLogin,
      };
      action.isSaveLocalStore && LocalStorage.setUserSaved(action.payload.user);
      if (action.isRemember) {
        LocalStorage.setAccountRemember(action.payload.accountLogin);
      } else {
        LocalStorage.removeItem('ACCOUNT_REMEMBER');
      }
      return _state;
    case 'ON_UPDATE_ACCOUNT_LOGIN':
      var _state = {
        ...state,
        accountLogin: action.payload,
      };
      if (action.isSaveLocalStore) {
        LocalStorage.setAccountRemember(action.payload);
      }
      return _state;
    default:
      return state;
  }
};

export {UserReducer};
