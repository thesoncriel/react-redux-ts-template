import { AnyAction, Dispatch, MiddlewareAPI } from 'redux';
import { AppState } from '../../entries/stores';

// export type TrackingMiddleware<S = {}, A extends Action = AnyAction, E = undefined> = Middleware;

/**
 * 트래킹 미들웨어.
 *
 * TODO: 추 후 기능 보완 필요.
 * @param store
 */
export const trackingMiddleware = (api: MiddlewareAPI<Dispatch, AppState>) => (next: Dispatch<AnyAction>) => (action: {type: string; payload: string}) => {
  if (action.type === 'TRACKING') {
    console.log('tracking --- ', action.payload);

    return;
  }
  next(action);
};
