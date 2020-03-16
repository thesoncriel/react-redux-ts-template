import {
  SampleListActions,
  LIST_INIT,
  LIST_PENDING,
  LIST_LOAD,
} from './sample.types';
import { SampleResItem } from '../../models/sample.model';

export interface SampleState {
  items: SampleResItem[];
  totalCount: number;
  pending: boolean;
}

export function getInitState(): SampleState {
  return {
    items: [],
    totalCount: 0,
    pending: false,
  };
}

export function sampleReducer(
  state = getInitState(),
  action: SampleListActions,
): SampleState {
  let ps: Partial<SampleState> | undefined;

  switch (action.type) {
    case LIST_INIT:
      return getInitState();
    case LIST_PENDING:
      ps = {
        pending: action.payload,
      };
      break;
    case LIST_LOAD:
      ps = {
        items: action.payload.items,
        totalCount: action.payload.totalCount,
        pending: false,
      };
      break;
    default:
      break;
  }
  return ps ? { ...state, ...ps } : state;
}
