import { selectCurrentBoard, useAppSelector } from '@shared/lib';
import type { Faction, PropsWithFaction } from '@shared/model';
import { images } from './images';
import * as C from './FactionDescription.components'
import { ImageBackgroundProps } from 'react-native';
import { descriptionSize } from '@pages/board/config';
import { getBoxByRatio } from '@shared/lib/util/size/box';

export type FactionDescriptionProps = Omit<ImageBackgroundProps, 'source'> & PropsWithFaction;

export const FactionDescription = ({
  children,
  ...props
}: FactionDescriptionProps) => {
  const { width, height } = props

  const box = {
    width, 
    height
  }

  const imageBox = getBoxByRatio({
    ratio: descriptionSize.ratio,
    box
  })

  if (!imageBox) {
    return null;
  }

  const { investigator } = useAppSelector(selectCurrentBoard);
  const faction = investigator.faction_code as Faction;
  const source = images[faction];

  return (
    <C.Background
      {...props}
      source={source}
      box={imageBox}
    >
      <C.Content 
        box={imageBox}
        faction={faction}
      >
        {children}
      </C.Content>
    </C.Background>
  );
}







