import I18n from 'i18n-js'
import React, { useState } from 'react'
import { Alert, StyleSheet, Switch, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { TextCus } from '../Components'
import { SearchBarCustom } from '../Components/searchBarCustom'
import { width } from '../Constants'
import { ApplicationState, UserState, onChangeLanguage } from '../Redux'

interface HomeProps {
    user: UserState
    onChangeLanguage: Function
    settings: any
}

const _Home: React.FC<HomeProps> = ({ user, onChangeLanguage, settings }) => {

    const [isEnabled, setIsEnabled] = useState(false);
    const [state, setstate] = useState('')

    const toggleSwitch = () => {
        if(isEnabled) {
            onChangeLanguage('vi', true)
            setIsEnabled(false)
        }
        else {
            onChangeLanguage('en', true)
            setIsEnabled(true)
        }
    };

    const onSubmitEditing = () => {
        Alert.alert('abc')
    }

    return (      
        <View style={styles.container}>
            <View style={styles.navigation}></View>
            <View style={styles.body}>
                <Text>
                    {isEnabled ? 'English' : 'Vietnamese'}
                </Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />

                <TextCus style={{}} children={'backToLogin'}/>
                <SearchBarCustom 
                    valueProps={state} 
                    onTextChange={setstate}  
                    placeholder='search'  
                    containerStyle={{
                        width: width - 40,
                        borderWidth: 1,
                        borderRadius: 10
                    }}          
                    leftIcon={true}     
                    onSubmitEditing={onSubmitEditing}
                />
            </View>
            <View style={styles.footer}></View>
        </View>
    )
}

const mapStateToProps = (state: ApplicationState) => ({
    user: state.userReducer,
    settings: state.settingsReducer
})

const Home = connect(mapStateToProps, { onChangeLanguage })(_Home)

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    navigation: {
        flex: 1
    },
    body: {
        flex: 9,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 1
    }
})

