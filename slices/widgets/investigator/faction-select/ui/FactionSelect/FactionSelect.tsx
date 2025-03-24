import type { Faction } from '@shared/model';
import * as C from './FactionSelect.components';
import type { ViewProps } from "react-native";
import { FACTION_SELECT_VALUES as factions } from '../../config';
import { useCallback } from 'react';

export type FactionSelectProps = ViewProps & {
  onChange?: (value: Faction | null) => void
  value?: Faction | null
}

export const FactionSelect = ({
  value,
  onChange,
  ...props
}: FactionSelectProps) => {
  const onPress = useCallback((faction: Faction) => () => {
    if (!onChange) {
      return false;
    }
    if (faction === value) {
      onChange(null);
      return;
    }
    onChange(faction);
  }, [value, onChange]);
  return (
    <C.Container {...props}>
      {factions.map((faction, index) => (
        <C.Button
          key={faction}
          faction={faction}
          selected={value === faction}
          onPress={onPress(faction)}
          first={index === 0}
          last={index === factions.length - 1}
        />
      ))}
    </C.Container>
  );
}