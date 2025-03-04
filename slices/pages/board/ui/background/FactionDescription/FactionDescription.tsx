import { useAppSelector } from '@shared/lib';
import { selectBoard } from '@pages/board/lib';
import type { Faction, PropsWithFaction } from '@shared/model';
import { images } from './images';
import * as C from './FactionDescription.components'
import { ImageBackgroundProps } from 'react-native';

export type FactionDescriptionProps = Omit<ImageBackgroundProps, 'source'> & PropsWithFaction;

export const FactionDescription = ({
  children,
  ...props
}: FactionDescriptionProps) => {
  const { investigator } = useAppSelector(selectBoard);
  const faction = investigator.faction_code as Faction;
  const source = images[faction];

  return (
    <C.Background
      {...props}
      source={source}
    >
      <C.Content>
        {children}
      </C.Content>
    </C.Background>
  );
}







