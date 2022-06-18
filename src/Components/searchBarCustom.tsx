import React, {createRef} from 'react';
import {
  FlexStyle,
  StyleProp,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {Ionicons} from '.';

interface searchBarCustomProps {
  valueProps: string;
  onTextChange(e: string): void;
  containerStyle?: StyleProp<ViewStyle>;
  placeholder: string;
  placeholderTextColor?: string;
  searchByIcon?(): void;
  textInputStyle?: StyleProp<FlexStyle>;
  leftIcon?: boolean;
  rightIcon?: boolean;
  onSubmitEditing(): void;
}

export const SearchBarCustom: React.FC<searchBarCustomProps> = props => {
  const {
    valueProps,
    onTextChange,
    containerStyle,
    placeholder,
    placeholderTextColor,
    searchByIcon,
    textInputStyle,
    leftIcon,
    rightIcon,
    onSubmitEditing,
  } = props;

  const searchBar = createRef<TextInput>();

  const onChangeText = (txt: string) => {
    onTextChange(txt);
  };

  const clearText = () => {
    onTextChange('');
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {leftIcon ? (
        <TouchableOpacity onPress={() => (searchByIcon ? searchByIcon() : {})}>
          <Ionicons name="search-outline" size={20} color="gray" />
        </TouchableOpacity>
      ) : null}
      <TextInput
        ref={searchBar}
        placeholder={placeholder ? placeholder : ''}
        placeholderTextColor={
          placeholderTextColor ? placeholderTextColor : '#ccc'
        }
        style={[
          textInputStyle,
          {
            flex: 1,
            marginLeft: leftIcon ? 5 : 0,
            marginRight: rightIcon ? 5 : 0,
          },
        ]}
        onChangeText={onChangeText}
        value={valueProps}
        onSubmitEditing={() => onSubmitEditing()}
      />
      {valueProps && valueProps.trim() != '' ? (
        <TouchableOpacity onPress={clearText}>
          <Ionicons name="close" size={18} color="gray" />
        </TouchableOpacity>
      ) : null}
      {rightIcon ? (
        <TouchableOpacity onPress={() => (searchByIcon ? searchByIcon() : {})}>
          <Ionicons name="search-outline" size={20} color="gray" />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
  },
});
