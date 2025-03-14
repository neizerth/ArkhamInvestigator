import 'react-native-get-random-values';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useAppLoader } from '@shared/lib/hooks';
import { AppProvider } from '@app/providers/AppProvider';
import type { PropsWithChildren } from 'react';
import { screenOptions } from './RootLayout.config';
import * as SystemUI from 'expo-system-ui';
import { color } from '@shared/config';
import { Loader } from '@shared/ui';
import * as C from './RootLayout.components' 

export const RootLayout = ({
  children
}: PropsWithChildren) => {
  const [loaded] = useAppLoader();
  SystemUI.setBackgroundColorAsync(color.dark30);

  if (!loaded) {
    return (
      <C.LoadingPage>
        <Loader/>
      </C.LoadingPage>
    );
  }

  return (
    <AppProvider>
      <Stack screenOptions={screenOptions}>
        <Stack.Screen
          name="investigator-details"
          options={{
            presentation: 'transparentModal'
          }}
        />
        <Stack.Screen
          name="skill-check"
          options={{
            presentation: 'modal'
          }}
        />
      </Stack>
      <StatusBar/>
      {children}
    </AppProvider>
  );
}
