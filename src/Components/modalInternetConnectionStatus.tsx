import React from 'react';
import {View} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import {width} from '../Constants';
import {Color} from '../Utils';
import {Feather} from './iconCustom';
import {TextCus} from './textCustom';

interface ModalInternetConnectionStatus {
  modalInternetConnectionStatusVisible: boolean;
  isOffline: boolean;
  onBackdropPress(): void;
}

const ModalInternetConnectionStatus: React.FC<ModalInternetConnectionStatus> =
  ({modalInternetConnectionStatusVisible, isOffline, onBackdropPress}) => {
    return (
      <ReactNativeModal
        isVisible={modalInternetConnectionStatusVisible}
        style={{alignItems: 'center'}}
        backdropColor="transparent"
        onBackdropPress={onBackdropPress}>
        <View
          style={{
            width: width - 20,
            borderRadius: 15,
            paddingVertical: 10,
            backgroundColor: '#535659',
            alignItems: 'center',
            bottom: 80,
            position: 'absolute',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Feather
            name={isOffline ? 'wifi-off' : 'wifi'}
            size={24}
            color={isOffline ? Color.white : 'lightgreen'}
          />
          <TextCus
            children={
              isOffline ? 'Bạn đang offline' : 'Đã khôi phục kết nối Internet'
            }
            style={{color: Color.white, fontSize: 17, marginLeft: 10}}
          />
        </View>
      </ReactNativeModal>
    );
  };

export {ModalInternetConnectionStatus};
