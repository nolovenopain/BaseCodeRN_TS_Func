import React from 'react';
import {StyleProp, TouchableOpacity, View, ViewStyle} from 'react-native';
import {TextCus} from './textCustom';

interface radioButtonProps {
  label: string;
  id: number | string;
  selectedId: number | string;
  radioClick: () => void;
  styleContainer?: StyleProp<ViewStyle>;
  selectedColor: string;
}

export const RadioButtonCus: React.FC<radioButtonProps> = ({
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
      <TouchableOpacity
        style={{
          width: 20,
          height: 20,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: id == selectedId ? selectedColor : 'gray',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={radioClick}>
        {id == selectedId ? (
          <View
            style={{
              width: 12,
              height: 12,
              borderRadius: 6,
              backgroundColor: selectedColor,
            }}
          />
        ) : null}
      </TouchableOpacity>
      <TextCus
        children={label}
        style={{
          marginLeft: 5,
          color: id == selectedId ? selectedColor : 'gray',
          fontSize: 13,
        }}
      />
    </View>
  );
};
