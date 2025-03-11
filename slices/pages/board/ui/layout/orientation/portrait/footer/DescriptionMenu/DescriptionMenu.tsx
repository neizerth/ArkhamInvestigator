import { IconProps, Row } from '@shared/ui';
import * as C from './DescriptionMenu.components';
import type { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';
import { useCallback, useContext } from 'react';
import { PortraitLayoutContext } from '@pages/board/config';
import { goToPage, selectCurrentBoard, setCurrentInvestigatorDetails, setReplaceInvestigator, setShowDescription, useAppDispatch, useAppSelector } from '@shared/lib';

export type DescriptionMenuProps = ViewProps

export const DescriptionMenu = (props: DescriptionMenuProps) => {
  const dispatch = useAppDispatch();
  const board = useAppSelector(selectCurrentBoard);

  const { details } = board;
  const haveDetails = details.media?.variants || details.media?.skins;

  const hide = useCallback(() => {
    dispatch(setShowDescription(false))
  }, [dispatch]);

  const changeInvestigatorDetails = useCallback(() => {

    dispatch(goToPage('/investigator-details'))
    dispatch(setCurrentInvestigatorDetails(details));

    dispatch(setShowDescription(false))
  }, [dispatch, details]);

  const changeInvestigator = useCallback(() => {
    dispatch(setShowDescription(false));
    dispatch(setReplaceInvestigator(true));
    dispatch(goToPage('/select-investigators'));
  }, [dispatch]);

  return (
    <C.Container {...props}>
      <C.Button icon='investigator' onPress={changeInvestigator}/>
      {haveDetails && (
        <C.Button 
          icon='change-investigator' 
          onPress={changeInvestigatorDetails}
        />
      )}
      <C.Hide onPress={hide}/>
    </C.Container>
  );
}