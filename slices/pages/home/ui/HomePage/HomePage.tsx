import { goToPage, useAppDispatch, usePageLoader } from "@shared/lib";
import { NewGameButton } from "../NewGameButton";
import * as C from "./HomePage.components";
import { useCallback, useEffect, useRef } from "react";
import { startNewGame } from "@pages/home/lib";
import { Loader } from "@shared/ui";
import { useFocusEffect, usePathname } from "expo-router";

export const HomePage = () => {
  const dispatch = useAppDispatch();

  const goToSettings = useCallback(() => {
    dispatch(goToPage('/settings'))
  }, [dispatch]);

  const start = useCallback(() => {
    dispatch(startNewGame());
  }, [dispatch]);

  const onStart = usePageLoader(start);

  return (
    <C.Container>
      <C.SettingsButton onPress={goToSettings}>
        <C.SettingsIcon/>
      </C.SettingsButton>
      <NewGameButton onPress={onStart}/>
    </C.Container>
  );
}