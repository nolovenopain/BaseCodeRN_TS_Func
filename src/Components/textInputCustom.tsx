import React, {
  useState,
  forwardRef,
  ReactNode,
  useRef,
  useEffect,
  LegacyRef,
} from 'react';
import {TextInput} from 'react-native';
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
import {font12, font14, font15, iconSize18, iconSize5, px5} from '../Constants';
import {Color} from '../Utils';
import {ButtonCus} from './buttonCustom';
import {Ionicons} from './iconCustom';
import {FontCustom, TextCus} from './textCustom';

interface TextInputCusProps extends TextInputProps {
  onRef?: any;
  label?: string;
  borderWidth?: number;
  onTextChange(text: string): void;
  leftIcon?: ReactNode;
  nextInput?: any;
  hideshowIcon?: boolean;
  hideshowText?: boolean;
  styleContainer?: StyleProp<ViewStyle>;
  styleContainerTextInput?: StyleProp<ViewStyle>;
  styleTextInput?: StyleProp<TextStyle>;
  styleLeftIcon?: StyleProp<FlexStyle>;
  validateError?: string;
  onFocusInput?(): void;
  onBlurInput?(): void;
  shadow?: boolean;
  colorChangeOnFocus?: boolean;
  styleLabelContainer?: StyleProp<ViewStyle>;
  styleLabel?: StyleProp<TextStyle>;
}

export const TextInputCus = React.memo<TextInputCusProps>(
  forwardRef((props: TextInputCusProps, ref) => {
    const [required, setRequired] = useState<boolean>(false);
    const [showPass, setShowPass] = useState<boolean | undefined>(
      props.hideshowText,
    );
    const [focus, setFocus] = useState<boolean>(false);

    const focusAnim = useRef<Animated.Value>(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.timing(focusAnim, {
        toValue: focus || (!focus && props.value != '') ? 1 : 0,
        // I took duration and easing values
        // from material.io demo page
        duration: 150,
        easing: Easing.bezier(0.4, 0, 0.2, 1),
        // we'll come back to this later
        useNativeDriver: false,
      }).start();
    }, [focusAnim, focus]);

    const clearText = () => {
      props.onRef.current.focus();
      setFocus(true);
      props.onTextChange('');
      setRequired(true);
    };

    const onChangeText = (txt: string) => {
      const value =
        props.keyboardType &&
        (props.keyboardType == 'numeric' ||
          props.keyboardType == 'number-pad' ||
          props.keyboardType == 'phone-pad')
          ? txt.replace(/[^0-9]/g, '')
          : txt;
      props.onTextChange(value);
      setRequired(false);
    };

    const showText = () => {
      setShowPass(!showPass);
    };

    const onFocus = () => {
      setFocus(true);
      props.onFocusInput ? props.onFocusInput() : null;
    };

    const onBlur = () => {
      setFocus(false);
      props.onBlurInput ? props.onBlurInput() : null;
    };

    let colorLabel =
      focus || (!focus && props.value != '') ? Color.blue : '#B9C4CA';
    if (props.validateError) {
      colorLabel = Color.red;
    }

    return (
      <View
        style={[
          {
            width: '100%',
          },
          props.styleContainer,
          props.shadow
            ? {
                shadowColor: 'gray',
                shadowOffset: {width: 0, height: px5},
                shadowOpacity: 0.3,
                shadowRadius: 3,
                elevation: px5 * 2,
              }
            : null,
        ]}>
        <View
          style={[
            {
              paddingHorizontal: px5,
              borderColor: props.validateError
                ? Color.red
                : focus && props.colorChangeOnFocus
                ? Color.blue
                : Color.borderInput,
              borderWidth: props.borderWidth || 0,
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: px5,
              backgroundColor: Color.white,
            },
            props.styleContainerTextInput,
          ]}>
          {props.leftIcon && (
            <View
              style={[
                {marginRight: px5 * 2, marginLeft: px5},
                props.styleLeftIcon,
              ]}>
              {props.leftIcon}
            </View>
          )}
          <TextInputRN
            {...props}
            ref={props.onRef}
            placeholderTextColor={Color.inputPlaceHolder}
            style={[
              {
                padding: 0,
                flex: 1,
                fontFamily: FontCustom.Arial,
                fontSize: font14,
                minHeight: px5 * 9,
                marginTop: props.multiline === true ? px5 : 0,
                marginBottom: props.multiline === true ? px5 * 2 : 0,
                marginRight: props.multiline === true ? px5 * 1.5 : 0,
                paddingLeft: props.leftIcon ? 0 : px5 * 2,
                color: Color.baseText,
              },
              props.styleTextInput,
            ]}
            onChangeText={onChangeText}
            secureTextEntry={showPass}
            underlineColorAndroid="transparent"
            autoComplete="off"
            textAlignVertical={props.multiline === true ? 'top' : 'center'}
            blurOnSubmit={props.nextInput ? false : true}
            onFocus={onFocus}
            onBlur={onBlur}
          />

          {props.label && (
            <Animated.View
              style={[
                props.styleLabelContainer,
                {
                  position: 'absolute',
                  paddingHorizontal:
                    focus || (!focus && props.value != '') ? 8 : 0,
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
                        outputRange: [
                          props.multiline ? -30 : 0,
                          props.multiline ? -68 : -30,
                        ],
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
                children={props.label}
                style={[
                  props.styleLabel,
                  {
                    color: colorLabel,
                  },
                ]}
              />
            </Animated.View>
          )}

          {props.value &&
          props.value.trim() != '' &&
          !props.multiline &&
          props.editable != false ? (
            <ButtonCus
              style={{
                backgroundColor: Color.transparent,
                paddingHorizontal: px5,
              }}
              onPress={clearText}
              children={
                <Ionicons
                  name="close"
                  size={iconSize18}
                  color={
                    props.validateError
                      ? Color.red
                      : focus && props.colorChangeOnFocus
                      ? Color.blue
                      : Color.inputPlaceHolder
                  }
                />
              }
            />
          ) : null}
          {props.hideshowText && props.hideshowIcon ? (
            <ButtonCus
              style={{
                alignItems: 'center',
                backgroundColor: Color.transparent,
                paddingHorizontal: px5,
              }}
              children={
                <Ionicons
                  name={showPass ? 'ios-eye' : 'ios-eye-off'}
                  size={iconSize5 * 4}
                  color={
                    props.validateError
                      ? Color.red
                      : focus && props.colorChangeOnFocus
                      ? Color.blue
                      : Color.inputPlaceHolder
                  }
                />
              }
              onPress={showText}
            />
          ) : null}
        </View>
        {props.validateError && (
          <TextCus
            children={props.validateError}
            style={{
              color: Color.red,
              marginVertical: px5 * 2,
              marginLeft: px5 * 2,
              fontSize: font12,
            }}
          />
        )}
      </View>
    );
  }),
  (prevProps, nextProps) => {
    if (
      prevProps.value === nextProps.value &&
      prevProps.validateError === nextProps.validateError &&
      prevProps.label === nextProps.label
    ) {
      return true;
    }
    return false;
  },
);
