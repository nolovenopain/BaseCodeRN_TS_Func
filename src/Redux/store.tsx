import {configureStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import {rootReducer} from './Reducers';

const store = configureStore({reducer: rootReducer, middleware: [thunk]});

export {store};
