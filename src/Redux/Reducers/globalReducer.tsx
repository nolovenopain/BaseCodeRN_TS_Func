import {LocalStorage} from '../../Utils';
import {GlobalAction} from '../Actions/globalAction';

export const initialGlobalState = {
  isInternetConnected: true,
  isLoading: false,
  loadingTitle: '',
  language: 'vi',
};

const GlobalReducer = (state = initialGlobalState, action: GlobalAction) => {
  switch (action.type) {
    case 'CHECK_INTERNET_CONNECTION':
      return {
        ...state,
        isInternetConnected: action.payload,
      };
    case 'TOGGLE_LOADING':
      var flag = action.payload === null ? !state.isLoading : action.payload;
      return {
        ...state,
        isLoading: flag,
        loadingTitle: action.loadingTitle,
      };
    case 'TOGGLE_LANGUAGE':
      var _state = {
        ...state,
        language: action.payload,
      };
      if (action.isSaveLocalStore) {
        LocalStorage.setLanguage(action.payload);
      }
      return _state;
    default:
      return state;
  }
};

export {GlobalReducer};
