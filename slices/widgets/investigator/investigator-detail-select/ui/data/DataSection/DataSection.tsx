import { memo, useCallback, useState } from 'react';
import { DetailSection as Section, type DetailSectionProps } from '../../DetailSection';
import { DetailSelectMemo as Select, type DetailSelectProps } from '../DetailSelect';

type Item = DetailSelectProps['selected'];

export type DataSectionProps = Omit<DetailSectionProps, 'value'> & DetailSelectProps;


export const DataSection = ({
  data,
  title,
  selected = data[0],
  onChange,
  ...props
}: DataSectionProps) => {
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
        onChange={onChange}
        data={data}
      />
    </Section>
  );
}

export const DataSectionMemo = memo(DataSection);