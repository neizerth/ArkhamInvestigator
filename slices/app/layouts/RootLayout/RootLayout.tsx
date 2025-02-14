import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useAppLoader } from '@shared/lib/hooks';
import { AppProvider } from '@app/providers/AppProvider';

export const RootLayout = () => {
  const [loaded] = useAppLoader();

  if (!loaded) {
    return null;
  }

  return (
    <AppProvider>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar/>
    </AppProvider>
  );
}
