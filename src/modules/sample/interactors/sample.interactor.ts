import { SampleContextModel } from '../contexts/sample.context';
import { timeout } from '../../../util';

export const sampleInteractor = (
  getState: () => SampleContextModel,
  dispatch: (state: Partial<SampleContextModel>) => void,
) => ({
  changeValume(volume: string) {
    dispatch({
      volume,
    });
    console.log('volume', volume);
  },
  async loadList() {
    dispatch({ loading: true });

    await timeout(300);

    dispatch({
      loading: false,
      items: [...getState().items, Date.now().toString()],
    });
  },
});
