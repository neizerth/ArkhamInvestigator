import { getSkillsSize, useFactionImage } from '@pages/board/lib';
import * as C from './InvestigatorSkills.components';
import { images } from './images';
import type { ViewProps } from 'react-native';
import type { PropsWithLayout } from '@pages/board/model';
import { useContext } from 'react';
import { LayoutContext } from '@pages/board/config';

export type InvestigatorSkillsProps = ViewProps

export const InvestigatorSkills = ({
  ...props
}: InvestigatorSkillsProps) => {
  const { layout } = useContext(LayoutContext);
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