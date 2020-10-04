import contextInjector from 'context-kit';
import { sampleInteractor } from '../interactors/sample.interactor';

export interface SampleContextModel {
  sharedValue: string;
  volume: string;
  items: string[];
  loading: boolean;
}

function getInitState(): SampleContextModel {
  return {
    sharedValue: '',
    volume: '',
    items: [],
    loading: false,
  };
}

export const sampleCtx = contextInjector(getInitState(), sampleInteractor);
