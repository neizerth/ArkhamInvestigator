import { InvestigatorPreview } from '@widgets/investigator/investigator-preview';
import type { InvestigatorDetailItem } from '../../model';
import { UnselectedDetail } from '../UnselectedDetail';
import { Container } from './DetailSelect.components';
import { CARD_SIZE } from '../../config';
import { useCallback } from 'react';

export type DetailSelectProps = {
  data: InvestigatorDetailItem[]
  selected: string | null
  onChange: (id: string | null) => void
}

export const DetailSelect = ({
  data,
  selected,
  onChange
}: DetailSelectProps) => {
  const setValue = useCallback(
    (id: string | null) => () => onChange(id),
    [onChange]
  )
  return (
    <Container>
      <UnselectedDetail 
        selected={selected === null} 
        onPress={setValue(null)}
      />
      {data.map(item => (
        <InvestigatorPreview
          key={item.id}
          imageId={item.id}
          investigator={item.investigator}
          selected={item.id === selected}
          onPress={setValue(item.id)}
          icon={item.icon}
          size={CARD_SIZE}
        />
      ))}
    </Container>
  );
}