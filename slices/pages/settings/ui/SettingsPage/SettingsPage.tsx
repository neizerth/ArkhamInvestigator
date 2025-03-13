import { TopBar } from '@widgets/top-bar';
import * as C from './SettingsPage.components'
import { View } from "react-native";
import { goBack, useAppDispatch } from '@shared/lib';
import { useAppTranslation } from '@features/i18n';

export const SettingsPage = () => {
  const dispatch = useAppDispatch();
  const { t } = useAppTranslation();

  const back = () => {
    dispatch(goBack());
  }

  return (
    <C.Container>
      <TopBar
        onBack={back}
        title={t`Settings`}
      /> 
      <C.Content>
        <C.Row>
          <C.Label>{t`Language`}</C.Label>
          <C.LanguageSelect/>
        </C.Row>
      </C.Content>
    </C.Container>
  );
}