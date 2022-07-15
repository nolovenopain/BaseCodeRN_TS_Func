import React, {Dispatch, useEffect, useState} from 'react';
import AppNavigation from './Navigations/appNavigation';
import {useNetInfo} from '@react-native-community/netinfo';
import {
  AccountLogin,
  onChangeLanguage,
  onCheckInternetConnection,
  onUpdateAccountLogin,
  onUpdateUser,
  store,
  UserModel,
} from './Redux';
import {ModalInternetConnectionStatus} from './Components';
import {LocalStorage} from './Utils';

export const RootComponent = () => {
  const netInfo = useNetInfo();
  const dispatch = store.dispatch as typeof store.dispatch | Dispatch<any>;

  const [
    modalInternetConnectionStatusVisible,
    setModalInternetConnectionStatusVisible,
  ] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (netInfo.isInternetReachable != null) {
      dispatch(onCheckInternetConnection(netInfo.isInternetReachable, false));
      setIsOffline(!netInfo.isInternetReachable);
      setCount(count + 1);
      if (count > 1 || !netInfo.isInternetReachable) {
        setModalInternetConnectionStatusVisible(true);
        setTimeout(() => {
          setModalInternetConnectionStatusVisible(false);
        }, 3000);
      }
    }
  }, [netInfo.isInternetReachable]);

  useEffect(() => {
    let isMounted = true;
    isMounted && getInfo();
    return () => {
      isMounted = false;
    };
  }, []);

  const getInfo = async () => {
    const user = (await LocalStorage.getUserSaved()) as UserModel;
    user.Token && dispatch(onUpdateUser(user, false));

    const accountLogin =
      (await LocalStorage.getAccountRemember()) as AccountLogin;
    accountLogin.username &&
      dispatch(onUpdateAccountLogin(accountLogin, false));

    const language = (await LocalStorage.getLanguage()) as string;
    language && dispatch(onChangeLanguage(language, false));
    setIsReady(true);
  };

  const onBackdropPress = () => {
    setModalInternetConnectionStatusVisible(false);
  };

  return (
    <>
      {isReady ? <AppNavigation /> : null}
      <ModalInternetConnectionStatus
        modalInternetConnectionStatusVisible={
          modalInternetConnectionStatusVisible
        }
        isOffline={isOffline}
        onBackdropPress={onBackdropPress}
      />
    </>
  );
};
