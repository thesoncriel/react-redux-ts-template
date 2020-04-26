import { css } from 'styled-components';

export const cssCenterBlock = css`
  max-width: ${props => props.theme.deviceSize.desktop};
  margin: 0 auto;
`;
