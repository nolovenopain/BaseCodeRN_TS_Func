import React from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {FontCustom, TextCus} from '../../Components';
import {iconSize5} from '../../Constants';
import {ApplicationState} from '../../Redux';
import {Color} from '../color';
import PacmanIndicator from './pacmanIndicator';

interface LoadingProps {}

export const Loading: React.FC<LoadingProps> = () => {
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
      <PacmanIndicator color={Color.blue} size={iconSize5 * 16} />
      <TextCus
        children={
          globalState.loadingTitle && globalState.loadingTitle != ''
            ? globalState.loadingTitle + '...'
            : ''
        }
        style={{
          color: Color.blue,
          fontSize: 18,
          fontFamily: FontCustom.Arial,
        }}
      />
    </View>
  );
};
