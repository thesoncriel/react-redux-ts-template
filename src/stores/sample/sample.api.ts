import { ListDataRes } from '../../models/common';
import { cdnApi } from '../../services/base-api.service';
import { SampleResItem } from '../../models/sample.model';

/**
 * 샘플 데이터를 불러오는 서비스.
 */
export const sampleApi = {
  /**
   * 샘플 목록을 불러온다.
   */
  loadList() {
    return cdnApi.get<ListDataRes<SampleResItem>>('/data/sample-list.json');
  },
};
