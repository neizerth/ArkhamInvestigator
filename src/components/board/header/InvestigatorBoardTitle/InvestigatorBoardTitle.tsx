import { IInvestigator } from '@/types/api';
import { useTranslation } from 'react-i18next';
import { getBackground } from './images';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectLanguage } from '@/store/features/language/language';
import { Background, Container, Name, Subname, Unique } from './components';
import { CSSProperties, useRef } from 'react';
import { useResizedRect } from '@/hooks/useBoundingRect';
import { Icon } from '@/components';

export type InvestigatorBoardTitleProps = {
  investigator: IInvestigator
}

export const InvestigatorBoardTitle = ({
  investigator
}: InvestigatorBoardTitleProps) => {
  const { t } = useTranslation();
  const language = useAppSelector(selectLanguage);
  const {
    name,
    subname,
    faction_code
  } = investigator;
  const background = getBackground();

  const ref = useRef(null);
  const [rect, updateRect] = useResizedRect(ref);

  const containerStyle = {
    '--unit': `${rect?.width || 0}px`
  } as CSSProperties

  return (
    <Container 
      $language={language}
      $faction={faction_code}
      style={containerStyle}
    >
      <Background
        src={background}
        onLoad={updateRect}
        ref={ref}
      />
      <Name>
        <Unique>
          <Icon icon='unique'/>
        </Unique>
        {t(name)}
      </Name>
      {subname && (
        <Subname>
          {t(subname)}
        </Subname>
      )}
    </Container>
  );
}