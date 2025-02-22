import { type ImageProps, useWindowDimensions } from 'react-native';
import * as C from './InvestigatorTitle.components';
import { useAppSelector } from '@shared/lib';
import { getTitleSize, selectBoard } from '@pages/board/lib';
import { parallelImages, regularImages } from './images';
import type { Faction } from '@shared/model';

export type InvestigatorTitleProps = Omit<ImageProps, 'source'>;

export const InvestigatorTitle = (props: InvestigatorTitleProps) => {
  const { investigator, isParallel } = useAppSelector(selectBoard);
  const faction = investigator.faction_code as Faction;

  const images = isParallel ? parallelImages : regularImages;
  const source = images[faction];

  const window = useWindowDimensions();
  const box = getTitleSize(window);
  
  return (
    <C.Container
      {...props}
      width={box.width}
      height={box.height}
      source={source}
    />
  );
}