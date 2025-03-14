import { goToPage, selectCurrentBoard, useAppDispatch, useAppSelector, usePageLoader } from "@shared/lib";
import { Button } from "../Button";
import * as C from "./HomePage.components";
import { useCallback, useEffect, useRef } from "react";
import { startNewGame } from "@pages/home/lib";
import { useAppTranslation } from "@features/i18n";

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const { t } = useAppTranslation();

  const board = useAppSelector(selectCurrentBoard);

  const goToSettings = useCallback(() => {
    dispatch(goToPage('/settings'))
  }, [dispatch]);

  const start = useCallback(() => {
    dispatch(startNewGame());
  }, [dispatch]);

  const resume = useCallback(() => {
    dispatch(goToPage('/board'))
  }, [dispatch]);

  const onStart = usePageLoader(start);
  const onResume = usePageLoader(resume);

  return (
    <C.Container>
      <C.SettingsButton onPress={goToSettings}>
        <C.SettingsIcon/>
      </C.SettingsButton>
      <Button onPress={onStart}>
        {t`New Game`}
      </Button>
      {board && (
        <C.ResumeButton onPress={onResume}>
          {t`Restore game`}
        </C.ResumeButton>
      )}
    </C.Container>
  );
}