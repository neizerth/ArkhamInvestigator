import type { Investigator } from 'arkham-investigator-data';

export type VariantSelectProps = {
  data: Investigator['variants']
  selected: string
  onChange: (variantId: string) => void
}

export const VariantSelect = ({
  data,
  selected,
  onChange
}: VariantSelectProps) => {
  return (
    <></>
  );
}