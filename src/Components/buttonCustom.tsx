import React, {ReactNode} from 'react';
import {StyleProp, ViewStyle, TextStyle, Pressable} from 'react-native';
import {TextCus} from './textCustom';

interface ButtonCusProps {
  children: ReactNode;
  onPress(): void;
  style?: StyleProp<ViewStyle>;
  isShowTouch?: boolean;
  styleText?: StyleProp<TextStyle>;
  disabled?: boolean;
  isOpacity?: boolean;
}

export const ButtonCus: React.FC<ButtonCusProps> = ({
  children,
  onPress,
  style,
  isShowTouch,
  styleText,
  disabled,
  isOpacity,
}) => { 
  return (
    <Pressable
      onPress={() => onPress()}
      style={({pressed}) => [
        style,
        isShowTouch && {
          borderColor: 'red',
          borderWidth: 1,
        },
        isOpacity && {opacity: pressed ? 0.5 : 1.0},
      ]}
      disabled={disabled}>
      {children != null && typeof children === 'string' ? (
        <TextCus
          style={[
            {
              textAlign: 'center',
              textAlignVertical: 'center',
            },
            styleText,
          ]}>
          {children}
        </TextCus>
      ) : (
        children
      )}
    </Pressable>
  );
};
