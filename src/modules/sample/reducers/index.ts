import { sampleBasicReducer } from './sampleBasic.reducer';
import { sampleSigninReducer } from './sampleSignin.reducer';
import { combineReducers } from 'redux';

export const sampleReducer = combineReducers({
  basic: sampleBasicReducer,
  signin: sampleSigninReducer,
});
