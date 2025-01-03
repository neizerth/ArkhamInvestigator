import { BlockProps } from '@/components/ui/common/Block/Block';
import { Container, CheckPopupActivation, Value } from './components';
import { SkillValuePicker } from '../SkillValuePicker/SkillValuePicker';
import { useState } from 'react';
import { BACKGROUND_WIDTH } from '../InvestigatorBoardSkills/constants';

export type InvestigatorSkillProps = BlockProps & {
  value: number;
  containerWidth: number;
}

export const InvestigatorSkill = ({
  value,
  containerWidth,
  ...props
}: InvestigatorSkillProps) => {
  const [currentvalue, setValue] = useState(value);
  const itemHeight = containerWidth * 44 / BACKGROUND_WIDTH;

  return (
    <Container 
      {...props}
    >
      <Value>
        <SkillValuePicker
          value={currentvalue}
          onChange={setValue}
          itemHeight={itemHeight}
        />
      </Value>
      <CheckPopupActivation/>
    </Container>
  );
}