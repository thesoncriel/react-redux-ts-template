import { sampleReducer } from './sample.reducer';
import { sampleSigninReducer } from './sampleSignin.reducer';
import { combineReducers } from 'redux';

export const cmbSampleReducer = combineReducers({
  basic: sampleReducer,
  signin: sampleSigninReducer,
});
