
import { LocalStorage } from "../../Utils"
import { SettingsAction } from "../Actions/settingsAction"

export const initialSettingsState = {
    language: 'vi',
    error: undefined,
}

const SettingsReducer = (state = initialSettingsState, action: SettingsAction) => {
    switch (action.type) {
        case 'ON_CHANGE_LANGUAGE':       
            var _state = {
                ...state,
                language: action.payload
            }
            if(action.isSaveLocalStore) {
                LocalStorage.setLanguage(action.payload);
            }
            return _state;
        default:
            return state;
    }
}

export { SettingsReducer }