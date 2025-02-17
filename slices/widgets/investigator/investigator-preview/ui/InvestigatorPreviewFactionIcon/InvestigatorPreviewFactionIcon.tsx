import type { Faction } from '@shared/model';
import { Container, NeutralIcon, FactionIcon } from './InvestigatorPreviewFactionIcon.components';

export type InvestigatorPreviewFactionIconProps = {
  faction: Faction
}

export const InvestigatorPreviewFactionIcon = ({
  faction
}: InvestigatorPreviewFactionIconProps) => {
  return (
    <Container>
      {faction === 'neutral' ? (
        <NeutralIcon/>
      ) : (
        <FactionIcon faction={faction}/>
      )}
    </Container>
  );
}