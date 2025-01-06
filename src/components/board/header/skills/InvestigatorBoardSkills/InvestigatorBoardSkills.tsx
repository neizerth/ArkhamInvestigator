import { IInvestigator } from '@/types/api';
import { getBackground } from './images';
import { CSSProperties, useRef } from 'react';
import { useResizedRect } from '@/hooks/useBoundingRect';
import { Agility, Background, Combat, Container, Intellect, Willpower } from './components';
import { BACKGROUND_WIDTH } from './constants';

export type InvestigatorBoardSkillsProps = {
  investigator: IInvestigator
}

export const InvestigatorBoardSkills = ({
  investigator
}: InvestigatorBoardSkillsProps) => {
  const { 
    skill_agility,
    skill_combat,
    skill_intellect,
    skill_willpower
  } = investigator;
  const background = getBackground();
  const ref = useRef(null);
  const [rect, updateRect] = useResizedRect(ref);

  const width = rect?.width || BACKGROUND_WIDTH

  const containerStyle = {
    '--unit': `${width}px`
  } as CSSProperties;

  return (
    <Container
      style={containerStyle}
    >
      <Background 
        src={background}
        onLoad={updateRect}
        ref={ref}
      />
      <Willpower
        type='willpower'
        containerWidth={width}
      />
      <Intellect
        type='intellect'
        containerWidth={width}
      />
      <Combat
        type='combat'
        containerWidth={width}
      />
      <Agility
        type='agility'
        containerWidth={width}
      />
    </Container>
  );
}