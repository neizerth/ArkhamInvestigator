import type { Faction } from '@shared/model';
import { Container, NeutralIcon, FactionImage } from './InvestigatorPreviewFactionIcon.components';
import type { PropsWithFaction } from '@shared/model/ui';

export const InvestigatorPreviewFactionIcon = ({
  faction
}: PropsWithFaction) => {
  return (
    <Container>
      {faction === 'neutral' ? (
        <NeutralIcon/>
      ) : (
        <FactionImage faction={faction}/>
      )}
    </Container>
  );
}