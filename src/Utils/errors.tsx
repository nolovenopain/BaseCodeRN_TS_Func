import {AlertCus} from '../Components';
import {translate} from '../Language';
import {store} from '../Redux';

export const sessionExpired = () => {
  return translate('sessionExpired', store.getState().globalReducer.language);
};

export const badRequest = () => {
  return translate('otherError', store.getState().globalReducer.language);
};

export const serverError = () => {
  return translate('otherError', store.getState().globalReducer.language);
};

export const notFound = () => {
  return translate('otherError', store.getState().globalReducer.language);
};

export const notPermission = () => {
  return translate('notPermission', store.getState().globalReducer.language);
};

export const missingToken = () => {
  return translate('otherError', store.getState().globalReducer.language);
};

export const otherError = () => {
  return translate('otherError', store.getState().globalReducer.language);
};

export const noInternetAlert = () => {
  AlertCus.Alert(
    translate('noInternetTitle', store.getState().globalReducer.language),
    translate('noInternetContent', store.getState().globalReducer.language),
    () => {},
  );
};
