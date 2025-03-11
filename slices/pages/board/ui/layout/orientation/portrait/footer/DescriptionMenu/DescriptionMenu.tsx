import { IconProps, Row } from '@shared/ui';
import * as C from './DescriptionMenu.components';
import type { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';
import { useCallback, useContext } from 'react';
import { PortraitLayoutContext } from '@pages/board/config';
import { navigateTo, selectCurrentBoard, setCurrentInvestigatorDetails, setShowDescription, useAppDispatch, useAppSelector } from '@shared/lib';

export type DescriptionMenuProps = ViewProps

export const DescriptionMenu = (props: DescriptionMenuProps) => {
  const dispatch = useAppDispatch();
  const board = useAppSelector(selectCurrentBoard);

  const { details } = board;

  const hide = useCallback(() => {
    dispatch(setShowDescription(false))
  }, [dispatch]);

  const changeInvestigator = useCallback(() => {
    const openDetailsModal = details.media?.variants || details.media?.skins;

    if (openDetailsModal) {
      dispatch(navigateTo('/investigator-details'))
      dispatch(setCurrentInvestigatorDetails(details));
    }

    dispatch(setShowDescription(false))
  }, [dispatch, details]);

  return (
    <C.Container {...props}>
      <C.Button icon='typejournal'/>
      <C.Button icon='change-investigator' onPress={changeInvestigator}/>
      <C.Hide onPress={hide}/>
    </C.Container>
  );
}