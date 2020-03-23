import React, { FC } from 'react';
import { JumbotronList, JumbotronListProps } from '../organisms/JumbotronList';
import { hocAdaptiveRender } from '../../../../common/hoc';
import { JumbotronSlider } from '../organisms/JumbotronSlider';

const TabletOnly: FC<JumbotronListProps> = () => <div>태블릿은 안나와요 ^^</div>;

/**
 * 적응형: 점보트론 컴포넌트를 출력한다.
 * @param props
 */
export const AdaptiveJumbotronList = hocAdaptiveRender<JumbotronListProps>({
  desktop: JumbotronList,
  tablet: TabletOnly,
  mobile: JumbotronSlider,
});
