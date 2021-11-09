import axios from 'axios';
import { Dispatch } from 'react'
import Config from 'react-native-config';
import { UserModel } from '..';

export interface Address {
    displayAddress: string
    postalCode: string
    city: string
    country: string
    street: string
    latitude?: number
    longitude?: number
}

export interface UpdateLocationAction {
    readonly type: 'ON_UPDATE_LOCATION'
    payload: Object
    isSaveLocalStore: boolean
}

export interface UpdateUser {
    readonly type: 'ON_UPDATE_USER'
    payload: UserModel
    isSaveLocalStore: boolean
}

export interface UserLoginAction {
    readonly type: 'ON_USER_LOGIN'
    payload: UserModel
}

export interface UserSignUpAction {
    readonly type: 'ON_USER_SIGN_UP'
    payload: UserModel
}

export interface UserLogoutAction {
    readonly type: 'ON_USER_LOGOUT'
}

export interface UserErrorAction {
    readonly type: 'ON_USER_ERROR'
    payload: any
}

export type UserAction = 
    UserLoginAction |
    UserSignUpAction |
    UserLogoutAction |
    UpdateLocationAction | 
    UpdateUser | 
    UserErrorAction

export const onUpdateLocation = (location: Object, isSaveLocalStore: boolean) => {
    isSaveLocalStore = isSaveLocalStore == null ? false : isSaveLocalStore;
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            dispatch({
                type: 'ON_UPDATE_LOCATION',
                payload: location,
                isSaveLocalStore
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            })
        }
    }
}

export const onUpdateUser = (user: UserModel, isSaveLocalStore: boolean) => {
    isSaveLocalStore = isSaveLocalStore == null ? false : isSaveLocalStore;
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            dispatch({
                type: 'ON_UPDATE_USER',
                payload: user,
                isSaveLocalStore
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            })
        }
    }
}

export const onUserLogin = (email: string, password: string) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            const response = await axios.post<UserModel>(`${Config.DEV_BASE_URL}/user/login`, {
                email,
                password
            });
            if(!response) {
                dispatch({
                    type: 'ON_USER_ERROR',
                    payload: 'User login Error'
                })
            } else {
                dispatch({
                    type: 'ON_USER_LOGIN',
                    payload: response.data
                })
            }
        } catch (error) {
            console.log(error);
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            })
        }
    }
}

export const onUserSignup = (email: string, phone: string, password: string) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            const response = await axios.post<UserModel>(`${Config.DEV_BASE_URL}/user/create-account`, {
                email,
                phone,
                password
            });
            
            if(!response) {
                dispatch({
                    type: 'ON_USER_ERROR',
                    payload: 'User Sign Up Error'
                })
            } else {
                dispatch({
                    type: 'ON_USER_LOGIN',
                    payload: response.data
                })
            }
        } catch (error) { 
            console.log(error);
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            })
        }
    }
}

export const onOTPRequest = (user: UserModel) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {

            axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`

            const response = await axios.get<UserModel>(`${Config.DEV_BASE_URL}/user/verify`);
            if(!response) {
                dispatch({
                    type: 'ON_USER_ERROR',
                    payload: 'User Verification Error'
                })
            } else {
                dispatch({
                    type: 'ON_USER_LOGIN',
                    payload: response.data
                })
            }
        } catch (error) {
            console.log(error);
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            })
        }
    }
}

export const onVerifyOTP = (otp: string, user: UserModel) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {

            axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`

            const response = await axios.patch<UserModel>(`${Config.DEV_BASE_URL}/user/verify`, {
                otp
            });
            if(!response) {
                dispatch({
                    type: 'ON_USER_ERROR',
                    payload: 'User Verification Error'
                })
            } else {
                dispatch({
                    type: 'ON_USER_LOGIN',
                    payload: response.data
                })
            }
        } catch (error) {
            console.log(error);
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            })
        }
    }
}

export const onUserLogout = () => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            dispatch({
                type: 'ON_USER_LOGOUT'
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: 'ON_USER_ERROR',
                payload: error
            })
        }
    }
}
