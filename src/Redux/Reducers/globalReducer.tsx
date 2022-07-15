import {GlobalAction} from '../Actions/globalAction';

export const initialGlobalState = {
  isInternetConnected: true,
  isLoading: false,
  loadingTitle: '',
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
    default:
      return state;
  }
};

export {GlobalReducer};
