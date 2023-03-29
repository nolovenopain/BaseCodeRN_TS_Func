import {AlertCus} from '../Components';

export const sessionExpired = () => {
  return "Your session is expired. Please log in again";
};

export const badRequest = () => {
  return "Bad request";
};

export const serverError = () => {
  return "Internal server error";
};

export const notFound = () => {
  return "Data not found";
};

export const notPermission = () => {
  return "You don't have permission to access this resource";
};

export const missingToken = () => {
  return "Missing token";
};

export const otherError = () => {
  return "Data not found / Your access is denied";
};

export const noInternetAlert = () => {
  AlertCus.Alert(
    "Network error",
    "Check your internet connection and try again",
    () => {},
  );
};
