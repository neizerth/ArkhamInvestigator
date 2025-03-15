import { goToPage, useAppDispatch } from '@shared/lib';
import * as C from './HomeMenu.components';
import type { Href } from 'expo-router';
import { useCallback } from 'react';
import { Linking, type ViewProps } from 'react-native';
import { DONATE_LINK } from '@shared/config';

export type HomeMenuProps = ViewProps;

export const HomeMenu = (props: HomeMenuProps) => {
  const dispatch = useAppDispatch();

  const goTo = useCallback((href: Href) => () => {
    dispatch(goToPage(href))
  }, [dispatch]);

  const donate = useCallback(() => {
    Linking.openURL(DONATE_LINK);
  }, []);

  return (
    <C.Container {...props}>
      <C.Left>
        {/* <C.Button onPress={goTo('/news')}>
          <C.Icon icon="typejournal"/>
        </C.Button> */}
        <C.Button onPress={goTo('/about')}>
          <C.Icon icon="info"/>
        </C.Button>

        <C.Button onPress={donate}>
          <C.Icon icon="kofi"/>
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