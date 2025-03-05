import { useAppSelector } from '@shared/lib';
import * as C from './FactionBackground.components';
import { selectBoard } from '@pages/board/lib';
import type { Box, Faction } from '@shared/model';
import { images } from './images';
import type { ImageProps } from 'react-native';
import type { PropsWithLayout } from '@pages/board/model';

export type FactionBackgroundProps = ImageProps & PropsWithLayout & {
  view: Box
}

export const FactionBackground = ({
  view,
  ...props
}: FactionBackgroundProps) => {

  const { investigator } = useAppSelector(selectBoard);
  const faction = investigator.faction_code as Faction;

  const background = images[faction]
  
  return (
    <C.Background
      {...props}
      source={background}
      width={view.width}
      height={view.height}
    />
  );
}