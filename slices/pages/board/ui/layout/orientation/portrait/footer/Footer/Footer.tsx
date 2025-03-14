import type { RowProps } from '@shared/ui';
import * as C from './Footer.components';
import { Actions, Health, Sanity } from '../../../../../shared/stats';
export type FooterProps = RowProps;

export const Footer = ({
  ...props
}: FooterProps) => {
  return (
    <C.Container {...props}>
      <C.Stats>
        <C.Investigator>
          <Actions/>
        </C.Investigator>

        <C.MainStats>
          <Health />
          <Sanity />
        </C.MainStats>
      </C.Stats>
      <C.Description/>
    </C.Container>
  );
}