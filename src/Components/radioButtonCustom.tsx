import React from 'react';
import {StyleProp, TextStyle, View, ViewStyle} from 'react-native';
import {Color} from '../Utils';
import {ButtonCus} from './buttonCustom';
import {TextCus} from './textCustom';
import {px5} from '../Constants';

interface RadioButtonCusProps {
  label: string;
  id: number | string;
  selectedId: number | string;
  radioClick(): void;
  styleContainer?: StyleProp<ViewStyle>;
  styleText?: StyleProp<TextStyle>;
  selectedColor: string;
}

export const RadioButtonCus: React.FC<RadioButtonCusProps> = ({
  label,
  id,
  selectedId,
  radioClick,
  styleContainer,
  selectedColor,
  styleText,
}) => {
  return (
    <View
      style={[{flexDirection: 'row', alignItems: 'center'}, styleContainer]}>
      <ButtonCus
        style={{
          width: px5 * 4,
          height: px5 * 4,
          borderRadius: px5 * 2,
          borderWidth: px5 / 5,
          borderColor: id == selectedId ? selectedColor : Color.gray,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Color.white,
        }}
        children={
          id == selectedId ? (
            <View
              style={{
                width: px5 * 2,
                height: px5 * 2,
                borderRadius: 100,
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
        style={[
          {
            marginLeft: px5,
            color: id == selectedId ? selectedColor : Color.gray,
          },
          styleText,
        ]}
      />
    </View>
  );
};
