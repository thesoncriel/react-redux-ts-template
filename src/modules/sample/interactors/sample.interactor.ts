import { SampleContextModel } from '../contexts/sample.context';

export const sampleInteractor = (
  _: () => SampleContextModel,
  dispatch: (state: Partial<SampleContextModel>) => void,
) => ({
  changeValume(volume: string) {
    dispatch({
      volume,
    });
    console.log('volume', volume);
  },
});
