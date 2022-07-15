import CheckBox, { CheckBoxProps } from '@react-native-community/checkbox';
import React from 'react';

interface CheckBoxCus extends CheckBoxProps {}

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
