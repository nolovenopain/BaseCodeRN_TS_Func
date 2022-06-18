import React, {useState, forwardRef, ReactNode} from 'react';
import {
  FlexStyle,
  KeyboardTypeOptions,
  StyleProp,
  TextInput as TextInputRN,
  View,
  ViewStyle,
} from 'react-native';
import {Color} from '../Utils';
import {ButtonCus} from './buttonCustom';
import {Ionicons} from './iconCustom';
import {FontCustom, TextCus} from './textCustom';

interface TextInputCus {
  onRef?: any;
  valueProps: any;
  label?: string;
  borderWidth?: number;
  onTextChange(text: string): void;
  leftIcon?: ReactNode;
  placeholder?: string;
  multiline?: boolean;
  enterToNextInput?(): void;
  nextInput?: any;
  editable?: boolean;
  hideshowIcon?: boolean;
  hideshowText?: boolean;
  requiredProps?: boolean;
  styleContainer?: StyleProp<ViewStyle>;
  styleContainerTextInput?: StyleProp<ViewStyle>;
  styleTextInput?: StyleProp<FlexStyle>;
  styleLeftIcon?: StyleProp<FlexStyle>;
  keyboardType?: KeyboardTypeOptions | undefined;
  validateError?: string;
  maxLength?: number;
  onFocusInput?(): void;
  onBlurInput?(): void;
}

export const TextInputCus = React.memo<TextInputCus>(
  forwardRef((props: TextInputCus, ref) => {
    const {
      onRef,
      valueProps,
      maxLength,
      label,
      styleContainer,
      borderWidth,
      onTextChange,
      leftIcon,
      placeholder,
      multiline,
      enterToNextInput,
      nextInput,
      editable,
      hideshowIcon,
      hideshowText,
      requiredProps,
      styleContainerTextInput,
      styleTextInput,
      styleLeftIcon,
      keyboardType,
      validateError,
      onFocusInput,
      onBlurInput,
    } = props;

    const [required, setRequired] = useState(false);
    const [showPass, setShowPass] = useState(hideshowText);
    const [focus, setFocus] = useState(false);

    const clearText = () => {
      onTextChange('');
      setRequired(true);
    };

    const onChangeText = (txt: string) => {
      const value =
        keyboardType &&
        (keyboardType == 'numeric' ||
          keyboardType == 'number-pad' ||
          keyboardType == 'phone-pad')
          ? txt.replace(/[^0-9]/g, '')
          : txt;
      onTextChange(value);
      setRequired(false);
    };

    const showText = () => {
      setShowPass(!showPass);
    };

    const onFocus = () => {
      setFocus(true);
      onFocusInput ? onFocusInput() : null;
    };

    const onBlur = () => {
      setFocus(false);
      onBlurInput ? onBlurInput() : null;
    };

    return (
      <View
        style={[
          {
            width: '100%',
          },
          styleContainer,
        ]}>
        <View
          style={[
            {
              padding: 5,
              borderColor: validateError
                ? Color.red
                : focus
                ? Color.yellow
                : '#CCCCCC',
              borderWidth: borderWidth || 0,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            },
            styleContainerTextInput,
          ]}>
          {leftIcon && (
            <View style={[{marginRight: 10}, styleLeftIcon]}>{leftIcon}</View>
          )}
          {label && (
            <View
              style={{
                backgroundColor: Color.white,
                position: 'absolute',
                paddingHorizontal: 5,
                flexDirection: 'row',
                top: -10,
                left: 20,
              }}>
              <TextCus
                children={label}
                style={{color: Color.silver, fontSize: 13}}
              />
              {requiredProps && (
                <TextCus children=" *" style={{color: Color.red}} />
              )}
            </View>
          )}
          <TextInputRN
            ref={onRef}
            placeholder={placeholder ? placeholder : ''}
            placeholderTextColor={Color.gray}
            maxLength={maxLength}
            style={[
              {
                padding: 0,
                flex: 1,
                fontFamily: FontCustom.Arial,
                fontSize: 15,
                minHeight: multiline === true ? 100 : 30,
                paddingTop: multiline === true ? 5 : 0,
                paddingLeft: leftIcon ? 0 : 10,
              },
              styleTextInput,
            ]}
            value={valueProps}
            onChangeText={onChangeText}
            secureTextEntry={showPass}
            underlineColorAndroid="transparent"
            autoComplete="off"
            textAlignVertical={multiline === true ? 'top' : 'center'}
            onSubmitEditing={enterToNextInput}
            blurOnSubmit={nextInput ? false : true}
            keyboardType={keyboardType}
            multiline={multiline}
            onFocus={onFocus}
            onBlur={onBlur}
            editable={editable}
          />
          {valueProps &&
          valueProps.trim() != '' &&
          !multiline &&
          editable != false ? (
            <ButtonCus
              style={{
                backgroundColor: Color.transparent,
                padding: 5,
              }}
              onPress={clearText}
              children={<Ionicons icon="close" size={18} />}
            />
          ) : null}
          {hideshowText && hideshowIcon ? (
            <ButtonCus
              style={{
                alignItems: 'center',
                backgroundColor: Color.transparent,
                padding: 5,
              }}
              onPress={showText}>
              <Ionicons
                icon={showPass ? 'ios-eye' : 'ios-eye-off'}
                size={20}
                color="silver"
              />
            </ButtonCus>
          ) : null}
        </View>
        {validateError && (
          <TextCus
            children={validateError}
            style={{
              color: Color.red,
              marginTop: 10,
              fontSize: 12,
              marginLeft: 10,
            }}
          />
        )}
      </View>
    );
  }),
  (prevProps, nextProps) => {
    if (
      prevProps.valueProps === nextProps.valueProps &&
      prevProps.validateError === nextProps.validateError
    ) {
      return true;
    }
    return false;
  },
);
