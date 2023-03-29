import {Alert as AlertRN} from 'react-native';

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
      title || 'Alert',
      mess || 'Do you want to delete?',
      (textAskMe != null
        ? [
            {
              text: textAskMe || 'Ask me later',
              onPress: () => {
                if (askMePress) askMePress();
              },
            },
          ]
        : []
      ).concat([
        {
          text: textButtonCancel || 'Cancel',
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
      title || 'Alert',
      mess || 'An error occurred. Please try again later !',
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
