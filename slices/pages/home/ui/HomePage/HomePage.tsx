import { goToPage, useAppDispatch } from "@shared/lib";
import { PrimaryButton } from "../../../../shared/ui/control/PrimaryButton";
import { NewGameButton } from "../NewGameButton";
import * as C from "./HomePage.components";
import { useCallback } from "react";

export const HomePage = () => {
  const dispatch = useAppDispatch();

  const goToSettings = useCallback(() => {
    dispatch(goToPage('/settings'))
  }, [dispatch]);

  return (
    <C.Container>
      <C.SettingsButton onPress={goToSettings}>
        <C.SettingsIcon/>
      </C.SettingsButton>
      <NewGameButton/>
    </C.Container>
  );
}