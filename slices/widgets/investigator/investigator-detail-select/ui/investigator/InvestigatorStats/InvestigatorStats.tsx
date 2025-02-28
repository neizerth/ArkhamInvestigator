import type { InvestigatorSource } from '@shared/model/index.js';
import * as C from './InvestigatorStats.components';
import { IconNumber } from '@shared/ui';

export type InvestigatorStatsProps = {
  investigator: InvestigatorSource
}

export const InvestigatorStats = ({
  investigator
}: InvestigatorStatsProps) => {
  const { health, sanity } = investigator;
  return (
    <C.Container>
      <C.Health>
        <C.HealthValue value={health}/>
      </C.Health>
      <C.Sanity>
        <C.SanityValue value={sanity}/>
      </C.Sanity>
    </C.Container>
  );
}