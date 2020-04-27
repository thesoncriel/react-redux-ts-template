import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { cmbSampleReducer } from '../modules/sample/reducers';
import { trackingMiddleware } from '../common/middleware/tracking.middleware';

const reducers = combineReducers({
  sample: cmbSampleReducer,
});

export type AppState = ReturnType<typeof reducers>;
export const store = createStore(
  reducers,
  applyMiddleware(thunk as ThunkMiddleware<AppState>, trackingMiddleware),
);
