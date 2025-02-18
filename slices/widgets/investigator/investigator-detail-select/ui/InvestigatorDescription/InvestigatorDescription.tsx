import type { InvestigatorDetails } from '@shared/model';
import type { InvestigatorDetailItem } from '../../model/common';
import { Container, Image, InvestigatorText, MainInfo } from './InvestigatorDescription.components';
import { Column, Row } from '@shared/ui';
import { Text } from 'react-native';
import { getInvestigatorImageUrl as getImageUrl } from '@shared/api/getInvestigatorImageUrl';

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
  
  const { investigator } = variant?.details || data;
  const { code } = investigator;
  const imageId = skin?.imageId || variant?.imageId || code;
  const uri = getImageUrl(imageId, 'square');
  const source = { uri }

  console.log({ variant });
  // const 

  return (
    <Container>
      <MainInfo>
        <Column>
          
        </Column>
        <Column>
          <Image
            source={source}
          />
        </Column>
      </MainInfo>
      <InvestigatorText>
        {investigator.text}
      </InvestigatorText>
    </Container>
  );
}