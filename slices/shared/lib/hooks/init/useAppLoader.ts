import { useEffect } from "react";
import fonts from "@shared/fonts"

import * as SplashScreen from 'expo-splash-screen';
import * as ScreenOrientation from 'expo-screen-orientation'
import { Platform } from "react-native";
import { useFonts } from "expo-font";

export const useAppLoader = () => {
  const response = useFonts(fonts);

  useEffect(() => {
    if (Platform.OS !== "web") {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
    }
  }, []);

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return response;
}