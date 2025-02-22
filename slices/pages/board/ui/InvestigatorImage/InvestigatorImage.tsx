import type { LayoutChangeEvent, ViewProps } from 'react-native';
import * as C from './InvestigatorImage.components';
import { useAppSelector } from '@shared/lib';
import { selectBoard } from '@pages/board/lib';
import { getInvestigatorImageUrl } from '@shared/api';
import { useState } from 'react';
import type { Box } from '@shared/model/ui';

export type InvestigatorImageProps = ViewProps

export const InvestigatorImage = (props: InvestigatorImageProps) => {
  const board = useAppSelector(selectBoard);
  const [box, setBox] = useState<Box>();

  const uri = getInvestigatorImageUrl(board.investigator.code, 'full');
  const source = { uri };

  console.log(uri, box);

  const onLayout = (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;

    setBox({
      width,
      height
    })
  }
  

  return (
    <C.Container 
      {...props}
      onLayout={onLayout}
    >
      {box && (
        <C.Background 
          source={source}
          box={box}
        />
      )}
    </C.Container>
  );
}