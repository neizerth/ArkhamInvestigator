import { getSkillsSize, useFactionImage } from '@pages/board/lib';
import * as C from './InvestigatorSkills.components';
import { images } from './images';
import type { ViewProps } from 'react-native';
import type { HeaderLayout } from '@pages/board/model';

export type InvestigatorSkillsProps = ViewProps & {
  layout: HeaderLayout
}

export const InvestigatorSkills = ({
  layout,
  ...props
}: InvestigatorSkillsProps) => {
  const source = useFactionImage(images)

  const size = getSkillsSize(layout);

  return (
    <C.Container {...props}>
      <C.Background
        source={source}
        width={size.width}
        height={size.height}
      />
    </C.Container>
  );
}