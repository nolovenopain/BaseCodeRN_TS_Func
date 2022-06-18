import React, { ReactNode } from 'react';
import {TouchableOpacity, StyleProp, ViewStyle, TextStyle} from 'react-native';
import {TextCus} from './textCustom';

interface ButtonCus {
  children: ReactNode;
  onPress(): void;
  style: StyleProp<ViewStyle>;
  isShowTouch?: boolean;
  styleText?: StyleProp<TextStyle>;
  disabled?: boolean
}

export const ButtonCus: React.FC<ButtonCus> = ({
  children,
  onPress,
  style,
  isShowTouch,
  styleText,
  disabled,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress()}
      style={[
        {
          padding: 10,
          alignItems: 'center', 
        },
        style,
        isShowTouch && {
          borderColor: 'red',
          borderWidth: 1,
        },
      ]}
      disabled={disabled}>
      {children != null && typeof children === 'string' ? (
        <TextCus
          style={[
            {
              textAlign: 'center',
            },
            styleText,
          ]}>
          {children}
        </TextCus>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};
