import type { InvestigatorDetails } from '@shared/model';
import type { InvestigatorDetailItem } from '../../model/common';
import * as C from './InvestigatorDescription.components';
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
    <C.Container>
      <C.MainInfo>
        <Column>
          
        </Column>
        <Column>
          <C.Image
            source={source}
          />
        </Column>
      </C.MainInfo>
      <C.InvestigatorTextContainer>
        <C.InvestigatorText value={investigator.text}/>
      </C.InvestigatorTextContainer>
    </C.Container>
  );
}