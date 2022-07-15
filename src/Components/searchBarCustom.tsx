import React, {createRef, forwardRef} from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {Ionicons} from '.';

interface searchBarCustomProps extends TextInputProps {
  onTextChange(e: string): void;
  containerStyle?: StyleProp<ViewStyle>;
  searchByIcon?(): void;
  textInputStyle?: StyleProp<ViewStyle>;
  leftIcon?: boolean;
  rightIcon?: boolean;
}

export const SearchBarCustom = React.memo<searchBarCustomProps>(
  forwardRef(
    (
      {
        value,
        onTextChange,
        containerStyle,
        placeholder,
        placeholderTextColor,
        searchByIcon,
        textInputStyle,
        leftIcon,
        rightIcon,
        onSubmitEditing,
        keyboardType,
      }: searchBarCustomProps,
      ref,
    ) => {
      const searchBar = createRef<TextInput>();

      const onChangeText = (txt: string) => {
        const value =
          keyboardType &&
          (keyboardType == 'numeric' ||
            keyboardType == 'number-pad' ||
            keyboardType == 'phone-pad')
            ? txt.replace(/[^0-9]/g, '')
            : txt;
        onTextChange(value);
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
            value={value}
            keyboardType={keyboardType}
            onSubmitEditing={e => (onSubmitEditing ? onSubmitEditing(e) : {})}
          />
          {value && value.trim() != '' ? (
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
    },
  ),
  (prevProps, nextProps) => {
    if (prevProps.value === nextProps.value) {
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
