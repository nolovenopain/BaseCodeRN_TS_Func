import React, {createRef, forwardRef} from 'react';
import {
  KeyboardTypeOptions,
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
  textInputStyle?: StyleProp<ViewStyle>;
  leftIcon?: boolean;
  rightIcon?: boolean;
  onSubmitEditing(): void;
  keyboardType?: KeyboardTypeOptions | undefined;
}

export const SearchBarCustom = React.memo<searchBarCustomProps>(
  forwardRef((props: searchBarCustomProps, ref) => {
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
      keyboardType
    } = props;

    const searchBar = createRef<TextInput>();

    const onChangeText = (txt: string) => {
      const value =
        keyboardType &&
        (keyboardType == 'numeric' ||
          keyboardType == 'number-pad' ||
          keyboardType == 'phone-pad')
          ? txt.replace(/[^0-9]/g, '')
          : txt;
      onTextChange(txt);
    };

    const clearText = () => {
      onTextChange('');
    };

    return (
      <View style={[styles.container, containerStyle]}>
        {leftIcon ? (
          <TouchableOpacity
            onPress={() => (searchByIcon ? searchByIcon() : {})}>
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
              marginRight: 5,
            },
          ]}
          onChangeText={onChangeText}
          value={valueProps}
          keyboardType={keyboardType}
          onSubmitEditing={() => onSubmitEditing()}
        />
        {valueProps && valueProps.trim() != '' ? (
          <TouchableOpacity onPress={clearText}>
            <Ionicons name="close" size={18} color="gray" />
          </TouchableOpacity>
        ) : null}
        {rightIcon ? (
          <TouchableOpacity
            onPress={() => (searchByIcon ? searchByIcon() : {})}>
            <Ionicons name="search-outline" size={20} color="gray" />
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }),
  (prevProps, nextProps) => {
    if (
      prevProps.valueProps === nextProps.valueProps
    ) {
      return true;
    }
    return false;
  },
);

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
