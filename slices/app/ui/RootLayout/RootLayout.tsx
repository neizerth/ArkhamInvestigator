import 'react-native-get-random-values';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useAppLoader } from '@shared/lib/hooks';
import { AppProvider } from '@app/providers/AppProvider';
import type { PropsWithChildren } from 'react';

export const RootLayout = ({
  children
}: PropsWithChildren) => {
  const [loaded] = useAppLoader();

  if (!loaded) {
    return null;
  }

  return (
    <AppProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="investigator-details"
          options={{
            presentation: 'transparentModal'
          }}
        />
      </Stack>
      <StatusBar/>
      {children}
    </AppProvider>
  );
}
