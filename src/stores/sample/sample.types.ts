import { SampleResItem } from '../../models/sample.model';
import { ListDataRes } from '../../models/common';

export const LIST_INIT = '[Sample] LIST_INIT';
export const LIST_PENDING = '[Sample] LIST_PENDING';
export const LIST_LOAD = '[Sample] LIST_LOAD';

interface ListInitAction {
  type: typeof LIST_INIT;
}
interface ListPendingAction {
  type: typeof LIST_PENDING;
  payload: boolean;
}
interface ListLoadAction {
  type: typeof LIST_LOAD;
  payload: ListDataRes<SampleResItem>; // 타입 바꿔 줄 것.
}

export type SampleListActions =
  | ListInitAction
  | ListPendingAction
  | ListLoadAction;
