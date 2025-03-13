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
import { selectLanguage, TranslatableProps, useAppTranslation } from '@features/i18n';

export type InvestigatorTitleProps = Omit<ImageBackgroundProps, 'source'> & TranslatableProps

export const InvestigatorTitle = ({
...props
}: InvestigatorTitleProps) => {
  const { layout } = useContext(LayoutContext);
  const { translate } = useAppTranslation();
  const language = useAppSelector(selectLanguage);
  const { investigator, isParallel, unique, id } = useAppSelector(selectCurrentBoard);
  const faction = investigator.faction_code as Faction;

  const [name, nameLanguage] = translate(investigator.name);
  const [subname] = translate(investigator.subname || '');

  const box = getTitleSize(layout);
  const source = useFactionImage(images)
  
  const style = getTitleStyle({
    view: box,
    faction,
    isParallel,
    language: nameLanguage
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
        {!unique && (
          <C.Id style={style.id}> ({id})</C.Id>
        )}
      </C.Title>
      <C.Subtitle style={style.subtitle}>
        <C.SubtitleText style={style.subtitleText}>
          {subname}
        </C.SubtitleText>
      </C.Subtitle>
    </C.Container>
  );
}