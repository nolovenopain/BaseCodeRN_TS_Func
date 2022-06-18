import React, {Dispatch, useEffect, useState} from 'react';
import AppNavigation from './Navigations/appNavigation';
import {useNetInfo} from '@react-native-community/netinfo';
import {useDispatch, useSelector} from 'react-redux';
import {
  AccountLogin,
  ApplicationState,
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
  const dispatch = store.dispatch as typeof store.dispatch | Dispatch<any>;;
  const globalState = useSelector(
    (state: ApplicationState) => state.globalReducer,
  );
  const [
    modalInternetConnectionStatusVisible,
    setModalInternetConnectionStatusVisible,
  ] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // useEffect(() => {
  //   dispatch(
  //     onCheckInternetConnection(
  //       netInfo.isInternetReachable ? netInfo.isInternetReachable : false,
  //       false,
  //     ),
  //   );
  //   setIsOffline(
  //     netInfo.isInternetReachable ? netInfo.isInternetReachable : false,
  //   );
  //   setModalInternetConnectionStatusVisible(true);
  //   setTimeout(() => {
  //     setModalInternetConnectionStatusVisible(false);
  //   }, 3000);
  // }, [netInfo.isInternetReachable]);

  useEffect(() => {
    let isMounted = true;
    isMounted && getInfo();
    return () => {
      isMounted = false;
    };
  }, []);

  const getInfo = async () => {
    const user = (await LocalStorage.getUserSaved()) as UserModel;
    if (user.Token) {
      await dispatch(onUpdateUser(user as UserModel, false));
    }
    const accountLogin =
      (await LocalStorage.getAccountRemember()) as AccountLogin;
    if (accountLogin.username) {
      await dispatch(onUpdateAccountLogin(accountLogin as AccountLogin, false));
    }
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
