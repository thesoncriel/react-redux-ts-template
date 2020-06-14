import React, { FC } from 'react';
import { JumbotronList, JumbotronListProps } from '../organisms/JumbotronList';
import { withAdaptiveRender } from '../../../../common/hoc';
import { JumbotronSlider } from '../organisms/JumbotronSlider';

const TabletOnly: FC<JumbotronListProps> = () => (
  <div>태블릿은 안나와요 ^^</div>
);

/**
 * 적응형: 점보트론 컴포넌트를 출력한다.
 * @param props
 */
export const AdaptiveJumbotronList = withAdaptiveRender<JumbotronListProps>({
  desktop: JumbotronList,
  tablet: TabletOnly,
  mobile: JumbotronSlider,
});
