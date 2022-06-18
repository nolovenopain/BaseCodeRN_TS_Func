import React, { Dispatch } from 'react';
import deviceInfoModule from 'react-native-device-info';
import {
  badRequest,
  notFound,
  notPermission,
  otherError,
  serverError,
  sessionExpired,
} from './errors';
import {Platform} from 'react-native';
import {Image} from 'react-native-image-crop-picker';
import { AxiosResponse } from 'axios';
import { onUserLogout } from '../Redux';

export const createFormData = (images: Image[], body: any) => {
  let formData = new FormData();

  images.length > 0 &&
    images.forEach(image => {
      const singleImage = {
        uri: Platform.select({
          ios: image.path,
          android: image.path.replace('file://', ''),
        }),
        name: image.filename,
        type: image.mime,
      };
      formData.append('Image', singleImage);
    });

  Object.keys(body).length > 0 &&
    Object.keys(body).forEach(key => {
      formData.append(key, body[key]);
    });

  return formData;
};

export const hasNotch = () => {
  return deviceInfoModule.hasNotch();
};

export const checkStatus = async (
  res: AxiosResponse | undefined,
  dispatch: Dispatch<any>,
) => {
  var data = null;
  var message = '';
  var error = false;
  switch (res?.status) {
    case 200:
      if (res.data.Success) {
        data = res.data;
      } else {
        message = res.data.Message;
        error = true;
      }
      break;
    case 401:
      error = true;
      message = sessionExpired();
      dispatch(onUserLogout());
      break;
    case 400:
      error = true;
      message = badRequest();
      break;
    case 403:
      error = true;
      message = notPermission();
      dispatch(onUserLogout());
      break;
    case 417:
      error = true;
      message = notPermission();
      dispatch(onUserLogout());
      break;
    case 404:
      error = true;
      message = notFound();
      break;
    case 500:
      error = true;
      message = serverError();
      break;
    default:
      error = true;
      message = otherError();
      break;
  }
  return {error, data, message, status: res?.status};
};
