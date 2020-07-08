import { contextInjector } from '../../../common/services/contextInjector';
import { sampleInteractor } from '../interactors/sample.interactor';

export interface SampleContextModel {
  sharedValue: string;
  volume: string;
}

function getInitState(): SampleContextModel {
  return {
    sharedValue: '',
    volume: '',
  };
}

export const sampleCtx = contextInjector(getInitState(), sampleInteractor);
