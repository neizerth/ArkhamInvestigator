import { goToPage, useAppDispatch } from '@shared/lib';
import * as C from './HomeMenu.components';
import type { Href } from 'expo-router';
import { useCallback } from 'react';
import type { ViewProps } from 'react-native';

export type HomeMenuProps = ViewProps;

export const HomeMenu = (props: HomeMenuProps) => {
  const dispatch = useAppDispatch();

  const goTo = useCallback((href: Href) => () => {
    dispatch(goToPage(href))
  }, [dispatch]);

  return (
    <C.Container {...props}>
      <C.Left>
        {/* <C.Button onPress={goTo('/news')}>
          <C.Icon icon="typejournal"/>
        </C.Button> */}
        <C.Button onPress={goTo('/about')}>
          <C.InfoIcon/>
        </C.Button>

        <C.Button onPress={goTo('/support')}>
          <C.SupportIcon/>
        </C.Button>
      </C.Left>
      <C.Right>
        <C.Button onPress={goTo('/settings')}>
          <C.Icon icon="wrench"/>
        </C.Button>
      </C.Right>
    </C.Container>
  );
}