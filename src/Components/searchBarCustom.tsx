import React, { createRef } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import { ButtonCus, Ionicons } from '.'
import { translate } from '../Language'
import { ApplicationState } from '../Redux'

interface searchBarCustomProps {
    valueProps: string
    settings: any
    onTextChange: Function
    containerStyle?: any
    placeholder: string
    placeholderTextColor?: string
    searchByIcon?: Function
    textInputStyle?: any
    leftIcon?: boolean
    rightIcon?: boolean
    onSubmitEditing: Function
}

const _SearchBarCustom = React.memo<searchBarCustomProps>(props => {

    const {
        valueProps,
        settings,
        onTextChange,
        containerStyle,
        placeholder,
        placeholderTextColor,
        searchByIcon,
        textInputStyle,
        leftIcon,
        rightIcon,
        onSubmitEditing
    } = props

    const searchBar = createRef<TextInput>();

    const onChangeText = (txt: string) => {
        onTextChange(txt)
    }

    const clearText = () => {
        onTextChange('')
    }

    return ( 
        <View style={[styles.container, containerStyle]}>
            {leftIcon ?
                <TouchableOpacity onPress={() => searchByIcon ? searchByIcon() : {}}>               
                    <Ionicons name='search-outline' size={20} color='gray'/>
                </TouchableOpacity> : null
            }
            <TextInput
                ref={searchBar}
                placeholder={placeholder ? translate(placeholder, settings.language) : ''}
                placeholderTextColor={placeholderTextColor ? placeholderTextColor : '#ccc'}
                style={[
                    textInputStyle,
                    {
                        flex: 1,
                        marginLeft: leftIcon ? 5 : 0,
                        marginRight: rightIcon ? 5 : 0
                    }
                ]}
                onChangeText={onChangeText}
                value={valueProps}
                onSubmitEditing={() => onSubmitEditing()}
            />
            {valueProps && valueProps.trim() != '' ?
                <TouchableOpacity onPress={clearText}>               
                    <Ionicons name='close' size={18} color='gray'/>
                </TouchableOpacity> : null
            }
            {rightIcon ?
                <TouchableOpacity onPress={() => searchByIcon ? searchByIcon() : {}}>               
                    <Ionicons name='search-outline' size={20} color='gray'/>
                </TouchableOpacity> : null
            }
        </View>
    )
}, (prevProps, nextProps) => {
    if(prevProps.valueProps === nextProps.valueProps && prevProps.settings.language === nextProps.settings.language) {
        return true
    }
    return false }
)

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        flexDirection: 'row'
    }
})

const mapStateToProps = (state: ApplicationState) => ({
    settings: state.settingsReducer,
})

const SearchBarCustom = connect(mapStateToProps, { })(_SearchBarCustom)

export { SearchBarCustom }
