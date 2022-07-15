import React, {useState, forwardRef, ReactNode, useRef, useEffect} from 'react';
import {
  Animated,
  Easing,
  FlexStyle,
  StyleProp,
  TextInput as TextInputRN,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {Color} from '../Utils';
import {ButtonCus} from './buttonCustom';
import {Ionicons} from './iconCustom';
import {FontCustom, TextCus} from './textCustom';

interface TextInputCus extends TextInputProps {
  onRef?: any;
  label?: string;
  borderWidth?: number;
  onTextChange(text: string): void;
  leftIcon?: ReactNode;
  enterToNextInput?(): void;
  nextInput?: any;
  hideshowIcon?: boolean;
  hideshowText?: boolean;
  styleContainer?: StyleProp<ViewStyle>;
  styleContainerTextInput?: StyleProp<ViewStyle>;
  styleTextInput?: StyleProp<FlexStyle>;
  styleLeftIcon?: StyleProp<FlexStyle>;
  validateError?: string;
  onFocusInput?(): void;
  onBlurInput?(): void;
  shadow?: boolean;
  colorChangeOnFocus?: boolean;
  styleLabelContainer?: StyleProp<ViewStyle>;
  styleLabel?: StyleProp<TextStyle>;
}

export const TextInputCus = React.memo<TextInputCus>(
  forwardRef((props: TextInputCus, ref) => {
    const {
      onRef,
      value,
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
      styleContainerTextInput,
      styleTextInput,
      styleLeftIcon,
      keyboardType,
      validateError,
      onFocusInput,
      onBlurInput,
      shadow,
      colorChangeOnFocus,
      styleLabelContainer,
      styleLabel,
    } = props;

    const [required, setRequired] = useState(false);
    const [showPass, setShowPass] = useState(hideshowText);
    const [focus, setFocus] = useState(false);

    const focusAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.timing(focusAnim, {
        toValue: focus || (!focus && value != '') ? 1 : 0,
        // I took duration and easing values
        // from material.io demo page
        duration: 150,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
        // we'll come back to this later
        useNativeDriver: false,
      }).start();
    }, [focusAnim, focus]);

    const clearText = () => {
      onRef.current?.focus();
      setFocus(true);
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

    let colorLabel =
      focus || (!focus && value != '') ? Color.blue : '#B9C4CA';
    if (validateError) {
      colorLabel = Color.red;
    }

    return (
      <View
        style={[
          {
            width: '100%',
          },
          styleContainer,
          shadow
            ? {
                shadowColor: Color.gray,
                shadowOffset: {width: 0, height: 4},
                shadowOpacity: 0.8,
                shadowRadius: 3,
                elevation: 5,
              }
            : null,
        ]}>
        <View
          style={[
            {
              paddingHorizontal: 5,
              borderColor: validateError
                ? Color.red
                : focus && colorChangeOnFocus
                ? Color.blue
                : '#E5E5E5',
              borderWidth: borderWidth || 0,
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: 5,
              backgroundColor: Color.white,
            },
            styleContainerTextInput,
          ]}>
          {leftIcon && (
            <View style={[{marginRight: 10}, styleLeftIcon]}>{leftIcon}</View>
          )}
          <TextInputRN
            ref={onRef}
            placeholder={placeholder ? placeholder : ''}
            placeholderTextColor="#909090"
            maxLength={maxLength}
            style={[
              {
                padding: 0,
                flex: 1,
                fontFamily: FontCustom.Arial,
                fontSize: 15,
                minHeight: multiline === true ? 100 : 45,
                paddingTop: multiline === true ? 15 : 0,
                paddingLeft: leftIcon ? 0 : 10,
              },
              styleTextInput,
            ]}
            value={value}
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

          {label && (
            <Animated.View
              style={[
                styleLabelContainer,
                {
                  position: 'absolute',
                  paddingHorizontal:
                    focus || (!focus && value != '') ? 8 : 0,
                  backgroundColor: Color.white,
                  transform: [
                    {
                      scale: focusAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 0.75],
                      }),
                    },
                    {
                      translateY: focusAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [multiline ? -30 : 0, multiline ? -68 : -30],
                      }),
                    },
                    {
                      translateX: focusAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [16, 0],
                      }),
                    },
                  ],
                },
              ]}>
              <TextCus
                children={label}
                style={[
                  styleLabel,
                  {
                    color: colorLabel,
                  },
                ]}
              />
            </Animated.View>
          )}

          {value &&
          value.trim() != '' &&
          !multiline &&
          editable != false ? (
            <ButtonCus
              style={{
                backgroundColor: Color.transparent,
                padding: 5,
              }}
              onPress={clearText}
              children={
                <Ionicons
                  icon="close"
                  size={18}
                  color={
                    validateError
                      ? Color.red
                      : focus && colorChangeOnFocus
                      ? Color.blue
                      : '#909090'
                  }
                />
              }
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
                color={
                  validateError
                    ? Color.red
                    : focus && colorChangeOnFocus
                    ? Color.blue
                    : '#909090'
                }
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
      prevProps.value === nextProps.value &&
      prevProps.validateError === nextProps.validateError
    ) {
      return true;
    }
    return false;
  },
);
