import { InvestigatorSkillType } from '@shared/model';
import * as C from './Skill.components';
import { ViewProps } from 'react-native';
import { useAppSelector } from '@shared/lib';
import { selectBoard } from '@pages/board/lib';
import { useContext } from 'react';
import { SkillsContext } from '@pages/board/config';
import { getSkillStyle } from './Skill.styles';

export type SkillProps = ViewProps & {
  type: InvestigatorSkillType
}

export const Skill = ({
  type,
  ...props
}: SkillProps) => {
  const box = useContext(SkillsContext);
  const { value, isParallel } = useAppSelector(selectBoard);
  const style = getSkillStyle({
    box,
    isParallel
  });
  const skillValue = value[type];

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