import { combineReducers } from 'redux'
import { SettingsReducer } from './settingsReducer'
import { UserReducer } from './userReducer'

const rootReducer = combineReducers({
    userReducer: UserReducer,
    settingsReducer: SettingsReducer
})

export type ApplicationState = ReturnType<typeof rootReducer>

export { rootReducer }