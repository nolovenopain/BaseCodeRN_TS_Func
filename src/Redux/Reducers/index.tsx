import {combineReducers} from 'redux';
import {GlobalReducer} from './globalReducer';
import {SettingsReducer} from './settingsReducer';
import {UserReducer} from './userReducer';

const rootReducer = combineReducers({
  userReducer: UserReducer,
  settingsReducer: SettingsReducer,
  globalReducer: GlobalReducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;

export {rootReducer};
