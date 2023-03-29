import React from 'react';
import {StyleProp, TouchableOpacity, View, ViewStyle} from 'react-native';
import {Color} from '../Utils';
import {ButtonCus} from './buttonCustom';
import {TextCus} from './textCustom';

interface RadioButtonCusProps {
  label: string;
  id: number | string;
  selectedId: number | string;
  radioClick(): void;
  styleContainer?: StyleProp<ViewStyle>;
  selectedColor: string;
}

export const RadioButtonCus: React.FC<RadioButtonCusProps> = ({
  label,
  id,
  selectedId,
  radioClick,
  styleContainer,
  selectedColor,
}) => {
  return (
    <View
      style={[{flexDirection: 'row', alignItems: 'center'}, styleContainer]}>
      <ButtonCus
        style={{
          width: 20,
          height: 20,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: id == selectedId ? selectedColor : Color.gray,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        children={
          id == selectedId ? (
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: selectedColor,
              }}
            />
          ) : null
        }
        isOpacity
        onPress={radioClick}
      />
      <TextCus
        children={label}
        style={{
          marginLeft: 5,
          color: id == selectedId ? selectedColor : Color.gray,
          fontSize: 13,
        }}
      />
    </View>
  );
};
