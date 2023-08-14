import {Alert as AlertRN} from 'react-native';
import {store} from '../Redux';
import {translate} from '../Language';

export const AlertCus = {
  Confirm: (
    callback: Function,
    mess: string,
    title: string,
    textButtonCancel: string,
    textButtonOK: string,
    cancelPress?: Function,
    textAskMe?: string,
    askMePress?: Function,
  ) => {
    AlertRN.alert(
      title || translate('alert', store.getState().globalReducer.language),
      mess ||
        translate('doUWantToDel', store.getState().globalReducer.language),
      (textAskMe != null
        ? [
            {
              text:
                textAskMe ||
                translate(
                  'askMeLater',
                  store.getState().globalReducer.language,
                ),
              onPress: () => {
                if (askMePress) askMePress();
              },
            },
          ]
        : []
      ).concat([
        {
          text:
            textButtonCancel ||
            translate('cancel', store.getState().globalReducer.language),
          onPress: () => {
            if (cancelPress) cancelPress();
          },
        },
        {
          text: textButtonOK || 'OK',
          onPress: () => {
            if (callback) callback();
          },
        },
      ]),
      {cancelable: false},
    );
  },
  Alert: (title: string, mess: string, callback: Function) => {
    AlertRN.alert(
      title || translate('alert', store.getState().globalReducer.language),
      mess || translate('anErrOcc', store.getState().globalReducer.language),
      [
        {
          text: 'OK',
          onPress: () => {
            if (callback) callback();
          },
        },
      ],
      {cancelable: false},
    );
  },
};
