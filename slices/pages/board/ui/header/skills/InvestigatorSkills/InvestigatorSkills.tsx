import { getSkillsLayout, getSkillsSize, selectBoard, useFactionImage } from '@pages/board/lib';
import * as C from './InvestigatorSkills.components';
import { images } from './images';
import type { ViewProps, ViewStyle } from 'react-native';
import { useContext } from 'react';
import { LayoutContext, SkillsContext } from '@pages/board/config';
import { getSkillsStyle } from './getSkillsStyle';
import { useAppSelector } from '@shared/lib';

export type InvestigatorSkillsProps = ViewProps

export const InvestigatorSkills = ({
  ...props
}: InvestigatorSkillsProps) => {
  const { layout } = useContext(LayoutContext);
  const source = useFactionImage(images)

  const size = getSkillsSize(layout);
  const skillsStyle = getSkillsStyle(size);

  return (
    <SkillsContext.Provider value={size}>
      <C.Container {...props}>
        <C.Background
          source={source}
          width={size.width}
          height={size.height}
        />
        <C.Content style={skillsStyle}>
          <C.Willpower/>
          <C.Intellect/>
          <C.Willpower/>
          <C.Willpower/>
        </C.Content>
      </C.Container>
    </SkillsContext.Provider>
  );
}