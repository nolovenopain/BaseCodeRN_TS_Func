import React, {forwardRef} from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {ButtonCus, Ionicons} from '.';
import {iconSize18, iconSize5, px5} from '../Constants';
import {Color} from '../Utils';

interface SearchBarCusProps extends TextInputProps {
  onTextChange(e: string): void;
  containerStyle?: StyleProp<ViewStyle>;
  searchByIcon?(): void;
  textInputStyle?: StyleProp<TextStyle>;
  leftIcon?: boolean;
  rightIcon?: boolean;
}

export const SearchBarCus = React.memo<SearchBarCusProps>(
  forwardRef((props: SearchBarCusProps, ref) => {
    const onChangeText = (txt: string) => {
      const value =
        props.keyboardType &&
        (props.keyboardType == 'numeric' ||
          props.keyboardType == 'number-pad' ||
          props.keyboardType == 'phone-pad')
          ? txt.replace(/[^0-9]/g, '')
          : txt;
      props.onTextChange(value);
    };

    const clearText = () => {
      props.onTextChange('');
    };

    return (
      <View style={[styles.container, props.containerStyle]}>
        {props.leftIcon ? (
          <ButtonCus
            children={
              <Ionicons
                name="search-outline"
                size={iconSize5 * 4}
                color={Color.gray}
              />
            }
            isOpacity
            onPress={() => (props.searchByIcon ? props.searchByIcon() : {})}
          />
        ) : null}
        <TextInput
          {...props}
          style={[
            props.textInputStyle,
            {
              flex: 1,
              marginLeft: props.leftIcon ? px5 : 0,
              marginRight: px5,
            },
          ]}
          onChangeText={onChangeText}
          value={props.value}
          keyboardType={props.keyboardType}
          onSubmitEditing={e =>
            props.onSubmitEditing ? props.onSubmitEditing(e) : {}
          }
        />
        {props.value && props.value.trim() != '' ? (
          <ButtonCus
            children={
              <Ionicons name="close" size={iconSize18} color={Color.gray} />
            }
            isOpacity
            onPress={clearText}
          />
        ) : null}
        {props.rightIcon ? (
          <ButtonCus
            style={{marginLeft: px5 * 1.5}}
            children={
              <Ionicons
                name="search-outline"
                size={iconSize5 * 4}
                color={Color.gray}
              />
            }
            isOpacity
            onPress={() => (props.searchByIcon ? props.searchByIcon() : {})}
          />
        ) : null}
      </View>
    );
  }),
  (prevProps, nextProps) => {
    if (
      prevProps.value === nextProps.value &&
      prevProps.placeholder === nextProps.placeholder
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
    paddingHorizontal: px5 * 2,
    paddingVertical: px5,
    flexDirection: 'row',
  },
});
