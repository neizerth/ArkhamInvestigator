import type { InvestigatorDetails, InvestigatorDetailItem } from '@shared/model';
import * as C from './InvestigatorDescription.components';
import { getInvestigatorImageUrl as getImageUrl } from '@shared/api/getInvestigatorImageUrl';
import { useAppTranslation } from '@features/i18n';

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
  const { t } = useAppTranslation();

  const { investigator } = variant?.details || data;
  const { code } = investigator;
  const imageId = skin?.imageId || variant?.imageId || code;
  const uri = getImageUrl(imageId, 'square');
  const source = { uri }
  
  const text = t(investigator.text);
  const traits = t(investigator.traits || '');

  return (
    <C.Container>
      <C.MainInfo>
        <C.Details>
          <C.Traits>{traits}</C.Traits>
          <C.Skills investigator={investigator}/>
          <C.Stats investigator={investigator}/>
        </C.Details>
        <C.ImageContainer>
          <C.Image source={source}/>
        </C.ImageContainer>
      </C.MainInfo>
      <C.InvestigatorTextContainer>
        <C.InvestigatorText value={text}/>
      </C.InvestigatorTextContainer>
    </C.Container>
  );
}