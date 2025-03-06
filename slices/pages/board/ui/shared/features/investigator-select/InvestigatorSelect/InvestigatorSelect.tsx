import { selectCurrentBoard, useAppSelector } from '@shared/lib';
import * as C from './InvestigatorSelect.components';
import { getInvestigatorImageUrl } from '@shared/api';
import { Faction } from '@shared/model';

export type InvestigatorSelectProps = {

}

export const InvestigatorSelect = ({}: InvestigatorSelectProps) => {
  const { picture, investigator } = useAppSelector(selectCurrentBoard);
  const faction = investigator.faction_code as Faction;

  const uri = getInvestigatorImageUrl(picture.id, 'square');
  const source = { uri };

  return (
    <C.Container>
      <C.Image 
        source={source} 
        faction={faction}
      />
    </C.Container>
  );
}