import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { ApplicationState, UserState } from '../Redux'

interface AccountProps {
    user: UserState,
}

const _Account: React.FC<AccountProps> = ({ user }) => {
    return (
        <View style={styles.container}>
            <View style={styles.navigation}></View>
            <View style={styles.body}>
                <Text>Account</Text>
            </View>
            <View style={styles.footer}></View>
        </View>
    )
}

const mapStateToProps = (state: ApplicationState) => ({
    user: state.userReducer,
})

const Account = connect(mapStateToProps, { })(_Account)

export default Account

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

