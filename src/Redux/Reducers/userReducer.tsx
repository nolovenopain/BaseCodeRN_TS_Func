
import { LocalStorage } from "../../Utils"
import { UserAction } from "../actions"
import { UserModel, UserState } from "../models"

export const initialUserState: UserState = {
    user: {} as UserModel,
    location: {},
    error: undefined,
}

const UserReducer = (state: UserState = initialUserState, action: UserAction) => {
    switch (action.type) {
        case 'ON_UPDATE_LOCATION':       
            var _state = {
                ...state,
                location: action.payload
            }
            if(action.isSaveLocalStore) {
                LocalStorage.setUserLocation(action.payload);
            }
            return _state;
        default:
            return state;
    }
}

export { UserReducer }