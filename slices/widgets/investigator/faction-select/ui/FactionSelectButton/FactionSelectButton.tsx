import type { Faction, PropsWithFaction } from '@shared/model';
import * as C from './FactionSelectButton.components';
import type { TouchableOpacityProps } from '@shared/ui';

export type FactionSelectButtonProps = TouchableOpacityProps & PropsWithFaction & {
  selected?: boolean
  first?: boolean
  last?: boolean
}

export const FactionSelectButton = (props: FactionSelectButtonProps) => {
  const { faction, selected } = props;
  return (
    <C.Button {...props}>
      <C.Icon faction={faction} selected={selected}/>
    </C.Button>
  );
}