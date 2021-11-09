import React from 'react';
import { TouchableOpacity } from 'react-native';
import { TextCus } from './textCustom';
import { connect } from 'react-redux';
import { ApplicationState } from '../Redux';

interface ButtonCus {
    children: any
    onPress: Function
    style: any
    isShowTouch?: boolean
    styleText?: any
}

const _ButtonCus: React.FC<ButtonCus> = ({
    children,
    onPress,
    style,
    isShowTouch,
    styleText,
}) => {
    return (
        <TouchableOpacity
            activeOpacity={.8}
            onPress={() => onPress()}
            style={[
                {
                    padding: 10,
                    alignItems: 'center'
                },
                style,
                isShowTouch && {
                    borderColor: 'red',
                    borderWidth: 1,
                }
            ]}
        >
            {children != null && typeof(children) === 'string' ?
                <TextCus
                    style={[
                        {
                            textAlign: 'center'
                        },
                        styleText
                    ]}
                >
                    {children}
                </TextCus> : children
            }
        </TouchableOpacity>
    )
}

const mapStateToProps = (state: ApplicationState) => ({
    settings: state.settingsReducer,
})

const ButtonCus = connect(mapStateToProps, { })(_ButtonCus)

export { ButtonCus }