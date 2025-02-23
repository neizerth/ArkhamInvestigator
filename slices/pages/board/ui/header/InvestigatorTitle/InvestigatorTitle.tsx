import type { ImageProps } from 'react-native';
import * as C from './InvestigatorTitle.components';
import { getTitleSize, useFactionImage } from '@pages/board/lib';
import { images } from './images';
import type { HeaderLayout } from '@pages/board/model';

export type InvestigatorTitleProps = Omit<ImageProps, 'source'> & {
  layout: HeaderLayout
}

export const InvestigatorTitle = ({
  layout,
  ...props
}: InvestigatorTitleProps) => {
  const source = useFactionImage(images)
  const box = getTitleSize(layout);

  console.log({
    layoutHeight: layout.height,
    scale: layout.scale,
    height: box.height
    // layout,
    // box
  })
  
  return (
    <C.Container
      {...props}
      {...box}
      source={source}
    />
  );
}