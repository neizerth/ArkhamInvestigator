import type { InvestigatorDetails } from '@shared/model';
import type { InvestigatorDetailItem } from '../../model/common';
import { Container } from './InvestigatorDescription.components';
import { Column, Row } from '@shared/ui';
import { Text } from 'react-native';

export type InvestigatorDescriptionProps = {
  data: InvestigatorDetails
  skin: InvestigatorDetailItem | null
  variant: InvestigatorDetailItem | null
}

export const InvestigatorDescription = ({
  data,
  skin,
  variant
}: InvestigatorDescriptionProps) => {
  
  const { investigator, story } = variant?.details || data;
  // const 

  return (
    <Container>
      <Text>{investigator.text}</Text>
    </Container>
  );
}