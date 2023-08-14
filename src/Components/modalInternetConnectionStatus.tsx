import React from 'react';
import {View} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import {font16, iconSize24, px5, width} from '../Constants';
import {Color} from '../Utils';
import {Feather} from './iconCustom';
import {TextCus} from './textCustom';
import {translate} from '../Language';
import {store} from '../Redux';

interface ModalInternetConnectionStatusProps {
  modalInternetConnectionStatusVisible: boolean;
  isOffline: boolean;
  onBackdropPress(): void;
}

const ModalInternetConnectionStatus: React.FC<
  ModalInternetConnectionStatusProps
> = ({modalInternetConnectionStatusVisible, isOffline, onBackdropPress}) => {
  return (
    <ReactNativeModal
      isVisible={modalInternetConnectionStatusVisible}
      style={{alignItems: 'center'}}
      backdropColor="transparent"
      onBackdropPress={onBackdropPress}>
      <View
        style={{
          width: width - px5 * 4,
          borderRadius: px5 * 3,
          paddingVertical: px5 * 2,
          backgroundColor: '#535659',
          alignItems: 'center',
          bottom: px5 * 16,
          position: 'absolute',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Feather
          name={isOffline ? 'wifi-off' : 'wifi'}
          size={iconSize24}
          color={isOffline ? Color.white : 'lightgreen'}
        />
        <TextCus
          children={
            isOffline
              ? translate('offline', store.getState().globalReducer.language)
              : translate('online', store.getState().globalReducer.language)
          }
          style={{
            color: Color.white,
            fontSize: (font16 * 17) / 16,
            marginLeft: px5 * 2,
          }}
        />
      </View>
    </ReactNativeModal>
  );
};

export {ModalInternetConnectionStatus};
