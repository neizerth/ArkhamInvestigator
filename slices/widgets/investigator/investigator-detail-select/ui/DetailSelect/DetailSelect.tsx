import { InvestigatorPreview } from '@widgets/investigator/investigator-preview';
import type { InvestigatorDetailItem } from '../../model';
import { UnselectedDetail } from '../UnselectedDetail';
import { Container } from './DetailSelect.components';
import { CARD_SIZE } from '../../config';

export type DetailSelectProps = {
  data: InvestigatorDetailItem[]
  selected: string | null
  onChange: (id: string) => void
}

export const DetailSelect = ({
  data,
  selected
}: DetailSelectProps) => {
  console.log(data);
  return (
    <Container>
      <UnselectedDetail selected={selected === null}/>
      {data.map(item => (
        <InvestigatorPreview
          key={item.id}
          imageId={item.id}
          investigator={item.investigator}
          selected={item.id === selected}
          icon={item.icon}
          size={CARD_SIZE}
        />
      ))}
    </Container>
  );
}