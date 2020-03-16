import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { sampleReducer } from './sample/sample.reducer';

const reducers = combineReducers({
  sample: sampleReducer,
});

export type AppState = ReturnType<typeof reducers>;
export const store = createStore(
  reducers,
  applyMiddleware(thunk as ThunkMiddleware<AppState>),
);
