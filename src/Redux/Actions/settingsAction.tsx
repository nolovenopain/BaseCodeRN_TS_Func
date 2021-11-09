import { Dispatch } from "react";

export interface ChangeLanguage {
    readonly type: 'ON_CHANGE_LANGUAGE'
    payload: string
    isSaveLocalStore: boolean
}

export interface SettingsErrorAction {
    readonly type: 'ON_SETTINGS_ERROR'
    payload: any
}

export type SettingsAction = ChangeLanguage | SettingsErrorAction

export const onChangeLanguage = (language: string, isSaveLocalStore: boolean) => {
    isSaveLocalStore = isSaveLocalStore == null ? false : isSaveLocalStore;
    return async (dispatch: Dispatch<SettingsAction>) => {
        try {
            dispatch({
                type: 'ON_CHANGE_LANGUAGE',
                payload: language,
                isSaveLocalStore
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: 'ON_SETTINGS_ERROR',
                payload: error
            })
        }
    }
}