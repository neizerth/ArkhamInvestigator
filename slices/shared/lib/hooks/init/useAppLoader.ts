import fonts from "@app/fonts";
import { useFonts } from "expo-font";
import { useEffect } from "react";

import * as SplashScreen from 'expo-splash-screen';

export const useAppLoader = () => {
  const response = useFonts(fonts);
  const [loaded] = response;

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  return response;
}