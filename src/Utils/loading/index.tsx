import React from 'react';
import {Image, View} from 'react-native';
import {useSelector} from 'react-redux';
import {FontCustom, TextCus} from '../../Components';
import {ApplicationState} from '../../Redux';
import {Color} from '../color';
import WaveIndicator from './waveIndicator';

interface Loading {}

export const Loading: React.FC<Loading> = () => {
  const globalState = useSelector(
    (state: ApplicationState) => state.globalReducer,
  );

  return !globalState.isLoading ? null : (
    <View
      style={{
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <WaveIndicator color={Color.red} size={80} />
      <TextCus
        children={
          globalState.loadingTitle && globalState.loadingTitle != ''
            ? globalState.loadingTitle + '...'
            : ''
        }
        style={{
          color: Color.red,
          fontSize: 18,
          fontFamily: FontCustom.Arial,
        }}
      />
    </View>
  );
};
