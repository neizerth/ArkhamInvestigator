import type { InvestigatorDetails, SelectedInvestigator } from '@shared/model';
import { InvestigatorPreviewMemo as InvestigatorPreview } from '@widgets/investigator/investigator-preview';
import { 
  includesBy, 
} from '@shared/lib';
import { useCallback } from 'react';
import { propEq } from 'ramda';
import { Container } from './InvestigatorList.components';
import type { FlatListProps } from 'react-native';

type OmitProps = 'data' | 'key' | 'numColumns' | 'renderItem' | 'keyExtractor';

export type InvestigatorListProps = 
  Omit<FlatListProps<InvestigatorDetails>, OmitProps> & {
    data: InvestigatorDetails[]
    selected: SelectedInvestigator[]
    onChange: (item: InvestigatorDetails) => void
  }

export const InvestigatorList = ({
  data,
  selected,
  onChange,
  ...props
}: InvestigatorListProps) => {
  const toggleSelected = useCallback(
    (item: InvestigatorDetails) => () => onChange(item), 
    [onChange]
  )

  const isSelected = ({ investigator }: InvestigatorDetails) => includesBy(
    propEq(investigator.code, 'code'), 
    selected
  )

  return (
    <Container {...props}>
      {data.map(item => (
        <InvestigatorPreview
          delayPressIn={0}
          key={item.investigator.code}
          onPress={toggleSelected(item)}
          selected={isSelected(item)}
          investigator={item.investigator}
          media={item.media}
        />
      ))}
    </Container>
  )
}