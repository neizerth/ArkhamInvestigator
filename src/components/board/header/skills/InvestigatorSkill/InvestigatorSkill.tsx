import type { BlockProps } from '@/components/ui/common/Block/Block';
import { Container, CheckPopupActivation, Value } from './components';
import { SkillValuePicker } from '../SkillValuePicker/SkillValuePicker';
import { BACKGROUND_WIDTH } from '../InvestigatorBoardSkills/constants';
import type { IBoard } from '@/types/board';
import { useBoardValue } from '@/hooks/useBoardValue';
import { range } from 'ramda';

export type InvestigatorSkillProps = BlockProps & {
  type: keyof IBoard
  containerWidth: number;
}

export const InvestigatorSkill = ({
  type,
  containerWidth,
  ...props
}: InvestigatorSkillProps) => {
  
  const [value, setValue] = useBoardValue(type);
  const itemHeight = containerWidth * 44 / BACKGROUND_WIDTH;
  const values = range(-30, 31);

  return (
    <Container 
      {...props}
    >
      <Value>
        <SkillValuePicker
          value={value}
          values={values}
          onChange={setValue}
          itemHeight={itemHeight}
        />
      </Value>
      <CheckPopupActivation/>
    </Container>
  );
}