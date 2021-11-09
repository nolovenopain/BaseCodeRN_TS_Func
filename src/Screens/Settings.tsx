import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { ApplicationState, UserState } from '../Redux'

interface SettingsProps {
    user: UserState,
}

const _Settings: React.FC<SettingsProps> = ({ user }) => {
    return (
        <View style={styles.container}>
            <View style={styles.navigation}></View>
            <View style={styles.body}>
                <Text>Settings</Text>
            </View>
            <View style={styles.footer}></View>
        </View>
    )
}

const mapStateToProps = (state: ApplicationState) => ({
    user: state.userReducer,
})

const Settings = connect(mapStateToProps, { })(_Settings)

export default Settings

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

