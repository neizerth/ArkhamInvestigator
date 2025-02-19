import { useCallback, useState } from 'react';
import { DetailSection as Section, type DetailSectionProps } from '../DetailSection';
import { DetailSelect as Select, type DetailSelectProps } from '../DetailSelect';
import type { InvestigatorDetailItem } from '../../model';


type Item = DetailSelectProps['selected'];

export type DataSectionProps = Omit<DetailSectionProps, 'value'> & 
  Omit<DetailSelectProps, 'selected'> & {
    defaultValue?: Item
  }


export const DataSection = ({
  data,
  title,
  defaultValue = data[0],
  onChange,
  ...props
}: DataSectionProps) => {
  const [selected, setSelected] = useState<Item>(defaultValue);

  const onChangeValue = useCallback(
    (item: Item) => {
      setSelected(item);
      onChange(item);
    }, 
    [onChange]
  );

  const { length } = data;
  if (length < 2) {
    return null;
  }

  const sectionTitle = `${title} (${length})`;
  const selectedValue = selected?.name || 'Default';

  return (
    <Section
      title={sectionTitle}
      value={selectedValue}
    >
      <Select 
        {...props}
        selected={selected}
        onChange={onChangeValue}
        data={data}
      />
    </Section>
  );
}