import { goToPage, selectCurrentBoard, useAppDispatch, useAppSelector, usePageLoader } from "@shared/lib";
import { Button } from "../Button";
import * as C from "./HomePage.components";
import { useCallback, useEffect, useRef } from "react";
import { startNewGame } from "@pages/home/lib";
import { useAppTranslation } from "@features/i18n";
import { Href } from "expo-router";

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const { t } = useAppTranslation();

  const board = useAppSelector(selectCurrentBoard);

  const goTo = useCallback((href: Href) => () => {
    dispatch(goToPage(href))
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
      <C.SettingsButton onPress={goTo('/settings')}>
        <C.SettingsIcon/>
      </C.SettingsButton>
      <C.AboutButton onPress={goTo('/about')}>
        <C.AboutIcon/>
      </C.AboutButton>

      <Button onPress={onStart}>
        {t`New Game`}
      </Button>
      {board && (
        <C.ResumeButton onPress={onResume}>
          {t`Continue`}
        </C.ResumeButton>
      )}
      <C.Disclaimer>
        <C.DisclaimerText>
          Arkham Horror: The Card Game™ and all related content © Fantasy Flight Games (FFG). 
          This app is not produced, endorsed by or affiliated with FFG.
        </C.DisclaimerText>
      </C.Disclaimer>
    </C.Container>
  );
}