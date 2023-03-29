import CheckBox, {CheckBoxProps} from '@react-native-community/checkbox';
import React from 'react';

interface CheckBoxCusProps extends CheckBoxProps {}

export const CheckBoxCus: React.FC<CheckBoxCusProps> = (props) => {
  return (
    <CheckBox
      {...props}
    />
  );
};
