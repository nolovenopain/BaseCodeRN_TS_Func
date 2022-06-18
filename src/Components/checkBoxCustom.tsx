import CheckBox from '@react-native-community/checkbox';
import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';

interface CheckBoxCus {
  onValueChange?: ((value: boolean) => void) | undefined;
  value: boolean;
  disabled?: boolean;
  boxType?: 'circle' | 'square';
  tintColor?: string;
  onAnimationType?:
    | 'stroke'
    | 'fill'
    | 'bounce'
    | 'flat'
    | 'one-stroke'
    | 'fade';
  offAnimationType?:
    | 'stroke'
    | 'fill'
    | 'bounce'
    | 'flat'
    | 'one-stroke'
    | 'fade';
  onCheckColor?: string;
  onTintColor?: string;
  onFillColor?: string;
  tintColors?: {
    true?: any;
    false?: any;
  };
  style?: StyleProp<ViewStyle>;
}

export const CheckBoxCus: React.FC<CheckBoxCus> = ({
  value,
  onValueChange,
  disabled,
  boxType,
  tintColor,
  onAnimationType,
  offAnimationType,
  onCheckColor,
  onTintColor,
  onFillColor,
  tintColors,
  style,
}) => {
  return (
    <CheckBox
      disabled={disabled}
      value={value}
      onValueChange={onValueChange}
      boxType={boxType}
      tintColor={tintColor}
      onCheckColor={onCheckColor}
      onTintColor={onTintColor}
      onFillColor={onFillColor}
      onAnimationType={onAnimationType}
      offAnimationType={offAnimationType}
      tintColors={tintColors}
      style={style}
    />
  );
};
