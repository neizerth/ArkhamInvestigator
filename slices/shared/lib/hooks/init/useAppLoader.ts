import { useEffect } from "react";

import * as SplashScreen from 'expo-splash-screen';
import * as ScreenOrientation from 'expo-screen-orientation'
import { Platform } from "react-native";
import { useFonts } from "expo-font";
import fonts from "../../../fonts";

export const useAppLoader = () => {
  const response = useFonts(fonts.common);
  const [loaded] = response;

  useEffect(() => {
    if (Platform.OS !== "web") {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
    }
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
    
  }, [loaded]);

  return response;
}