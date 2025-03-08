import type { ImageBackgroundProps, ImageProps } from 'react-native';
import * as C from './InvestigatorTitle.components';
import { getTitleSize, useFactionImage } from '@pages/board/lib';
import { images } from './images';
import type { HeaderLayout } from '@pages/board/model';
import { useContext } from 'react';
import { LayoutContext } from '@pages/board/config';
import { getTitleStyle } from './InvestigatorTitle.styles';
import { selectCurrentBoard, useAppSelector } from '@shared/lib';
import type { Faction } from '@shared/model';

export type InvestigatorTitleProps = Omit<ImageBackgroundProps, 'source'>

export const InvestigatorTitle = ({
  ...props
}: InvestigatorTitleProps) => {
  const { layout } = useContext(LayoutContext);
  const { investigator, isParallel, unique } = useAppSelector(selectCurrentBoard);
  const faction = investigator.faction_code as Faction;

  const { name, subname = '' } = investigator;

  const box = getTitleSize(layout);
  const source = useFactionImage(images)
  
  const style = getTitleStyle({
    view: box,
    faction,
    isParallel
  });

  return (
    <C.Container
      {...props}
      {...box}
      source={source}
      style={[
        props.style,
        style.container
      ]}
    >
      <C.Title style={style.title}>
        {unique && (
          <C.Unique style={style.unique}/>
        )}
        <C.TitleText style={style.titleText}>
          {name}
        </C.TitleText>
      </C.Title>
      <C.Subtitle style={style.subtitle}>
        <C.SubtitleText style={style.subtitleText}>
          {subname}
        </C.SubtitleText>
      </C.Subtitle>
    </C.Container>
  );
}