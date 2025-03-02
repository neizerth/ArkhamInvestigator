import { InvestigatorSkillType } from '@shared/model';
import * as C from './Skill.components';
import { ViewProps } from 'react-native';
import { useAppSelector } from '@shared/lib';
import { selectBoard } from '@pages/board/lib';
import { useContext } from 'react';
import { SkillsContext } from '@pages/board/config';
import { getSkillStyle } from './getSkillStyle';

export type SkillProps = ViewProps & {
  skill: InvestigatorSkillType
}

export const Skill = ({
  skill,
  ...props
}: SkillProps) => {
  const size = useContext(SkillsContext);
  const { value } = useAppSelector(selectBoard);
  const style = getSkillStyle(size);
  const skillValue = value[skill];

  return (
    <C.Container {...props}>
      <C.ValueContainer style={style.valueContainer}>
        <C.Value 
          value={skillValue}
          style={style.value}
        />
      </C.ValueContainer>
    </C.Container>
  );
}