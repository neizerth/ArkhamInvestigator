import { getBackground } from './images';
import { useRef } from 'react';
import type { CSSProperties } from 'react';
import { useResizedRect } from '@/hooks/useBoundingRect';
import { Agility, Background, Combat, Container, Intellect, Willpower } from './components';
import { BACKGROUND_WIDTH } from './constants';


export const InvestigatorBoardSkills = () => {

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