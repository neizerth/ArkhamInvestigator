import { useAppSelector } from '@shared/lib';
import * as C from './FactionDescription.components';
import { selectBoard } from '@pages/board/lib';
import { Faction } from '@shared/model';
import { images } from './images';
import { Image, type ImageProps } from 'react-native';

export type FactionDescriptionProps = Omit<ImageProps, 'source'>;
export const FactionDescription = ({
  ...props
}: FactionDescriptionProps) => {
  const { investigator } = useAppSelector(selectBoard);
  const faction = investigator.faction_code as Faction;
  const source = images[faction];

  return (
    <Image
      {...props}
      source={source}
    />
  );
}







