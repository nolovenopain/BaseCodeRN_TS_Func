import React, { useState, useEffect, createRef } from 'react';
import { TextInput as TextInputRN, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { translate } from '../Language';
import { ApplicationState } from '../Redux';
import { Color } from '../Utils';
import { ButtonCus } from './buttonCustom';
import { Ionicons } from './iconCustom';

interface TextInputCus {
    onRef?: any
    valueProps: string
    label?: string
    styleContainer: any
    borderWidth?: number
    onTextChange: Function
    leftIcon?: any
    placeholder?: string
    multiline?: boolean
    enterToNextInput?: any
    nextInput?: any
    editable?: boolean
    hideshowIcon?: boolean
    hideshowText?: boolean
    requiredProps?: boolean
    styleContainerTextInput?: any
    styleTextInput?: any
    styleLeftIcon?: any
    settings: any
}

const _TextInputCus = React.memo<TextInputCus>(props => {
    
    const { onRef,
            valueProps,
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
            settings } = props

    const [required, setRequired] = useState(false)
    const [showPass, setShowPass] = useState(hideshowText)

    const textInputRef = createRef<TextInputRN>();

    useEffect(() => {
        onRef ? onRef(this) : null
        return () => {
            onRef ? onRef(null) : null
        }
    }, [])

    const clearText = () => {
        onTextChange('')
        setRequired(true)
    }

    const onChangeText = (txt: string) => {
        onTextChange(txt)
        setRequired(false)
    }

    const showText = () => {
        setShowPass(!showPass)
    }

    return (
        <View
            style={[
                {
                    width: '100%'
                },
                label && { marginTop: 10 },
                styleContainer
            ]}
        >
            {label &&
                <Text>
                    {label}
                </Text>
            }
            <View
                style={[
                    {
                        padding: 5,
                        borderColor: '#ccc',
                        borderWidth: borderWidth || 0,
                        paddingHorizontal: 8,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 5
                    },
                    label && { marginTop: 5 },
                    styleContainerTextInput,
                ]}
            >
                {leftIcon &&
                    <View style={[{ marginRight: 12 }, styleLeftIcon]}>
                        {leftIcon}
                    </View>
                }
                <TextInputRN
                    ref={textInputRef}
                    placeholder={placeholder ? translate(placeholder, settings.language) : ''}
                    placeholderTextColor='#ccc'
                    style={[
                        {
                            padding: 0,
                            flex: 1,
                            // fontFamily: FontCustom.ProximaNovaLg_Regular[Platform.OS == 'android' ? 'android' : 'ios'],
                            fontSize: 16,
                            minHeight: multiline === true ? 50 : 30,
                            paddingTop: multiline === true ? 5 : 0,
                        },
                        styleTextInput
                    ]}
                    value={valueProps}
                    onChangeText={onChangeText}
                    secureTextEntry={showPass}
                    underlineColorAndroid='transparent'
                    autoCompleteType='off'
                    textAlignVertical={multiline === true ? 'top' : 'center'}
                    onSubmitEditing={enterToNextInput}
                    blurOnSubmit={nextInput ? false : true}
                />
                {
                    valueProps && valueProps.trim() != '' && !multiline && editable !== false ?
                        <ButtonCus
                            style={{
                                backgroundColor: Color.transparent,
                                padding: 5
                            }}
                            onPress={clearText} 
                            children={<Ionicons icon='close' size={18} />} 
                        /> 
                        : null
                }
                {
                    hideshowText && hideshowIcon ? 
                        <ButtonCus
                            style={{ 
                                alignItems: 'center',
                                backgroundColor: Color.transparent, 
                                padding: 5
                            }}
                            onPress={showText}
                        >
                            <Ionicons 
                                icon={showPass ? 'ios-eye' : 'ios-eye-off'}
                                size={23}
                                color='silver' 
                            />
                        </ButtonCus> : null
                }
            </View>
            {
                required && requiredProps ? 
                <View
                    style={{
                        marginTop: 5
                    }}
                >
                    <Text
                        style={{
                            fontSize: 12,
                            color: Color.materialRed
                        }}
                    >
                        {'Không được để trống.'}
                    </Text>
                </View> : null
            }
        </View>
    )
}, (prevProps, nextProps) => {
    if(prevProps.valueProps === nextProps.valueProps && prevProps.settings.language === nextProps.settings.language) {
        return true
    }
    return false }
)

const mapStateToProps = (state: ApplicationState) => ({
    settings: state.settingsReducer,
})

const TextInputCus = connect(mapStateToProps, { })(_TextInputCus)

export { TextInputCus }