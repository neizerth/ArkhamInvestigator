import type { ViewProps } from 'react-native';
import { Container } from './InvestigatorSelectFooter.components';
import { selectSelectedInvestigators, useAppSelector } from '@shared/lib';
import { StartButton } from '../StartButton';
import { ClearButton } from '../ClearButton';

export type InvestigatorSelectFooterProps = ViewProps

export const InvestigatorSelectFooter = (props: InvestigatorSelectFooterProps) => {
  const investigators = useAppSelector(selectSelectedInvestigators);

  if (investigators.length === 0) {
    return null;
  }
  return (
    <Container {...props}>
      <ClearButton/>
      <StartButton/>
    </Container>
  );
}