import type { ImageProps } from 'react-native';
import * as C from './InvestigatorTitle.components';
import { getTitleSize, useFactionImage } from '@pages/board/lib';
import { images } from './images';
import type { HeaderLayout } from '@pages/board/model';
import { useContext } from 'react';
import { LayoutContext } from '@pages/board/config';

export type InvestigatorTitleProps = Omit<ImageProps, 'source'>

export const InvestigatorTitle = ({
  ...props
}: InvestigatorTitleProps) => {
  const { layout } = useContext(LayoutContext);
  const source = useFactionImage(images)
  const box = getTitleSize(layout);

  return (
    <C.Container
      {...props}
      {...box}
      source={source}
    />
  );
}