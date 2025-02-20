import type { InvestigatorDetails } from '@shared/model';
import type { InvestigatorDetailItem } from '../../../model/common';
import * as C from './InvestigatorDescription.components';
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

  return (
    <C.Container>
      <C.MainInfo>
        <C.Details>
          <C.Traits>{investigator.traits}</C.Traits>
          <C.Skills investigator={investigator}/>
          <C.Stats investigator={investigator}/>
        </C.Details>
        <C.ImageContainer>
          <C.Image source={source}/>
        </C.ImageContainer>
      </C.MainInfo>
      <C.InvestigatorTextContainer>
        <C.InvestigatorText value={investigator.text}/>
      </C.InvestigatorTextContainer>
    </C.Container>
  );
}