import { useAppDispatch, useAppSelector } from '@shared/lib';
import * as C from './LanguagePicker.components';
import { changeLanguage, CHINESE_LANGUAGES, selectAvailableLanguages, selectLanguage } from '@features/i18n';
import { useCallback, useEffect, useState } from 'react';
import type { PickerChangeEvent, PickerItemInfo } from '@widgets/picker';

import { languageLabels } from './labels';
import { styles } from './LanguagePicker.style';

import { Dropdown } from 'react-native-element-dropdown';
import { propEq } from 'ramda';
import { color } from '@shared/config';
import { selectFeedback } from '@features/haptic';

export type LanguagePickerProps = {

}

type PickerItem = {
  label: string;
  value: string;
}


export const LanguagePicker = ({}: LanguagePickerProps) => {
  const dispatch = useAppDispatch();
  const languages = useAppSelector(selectAvailableLanguages);
  const language = useAppSelector(selectLanguage);

  const onChange = useCallback(({ value }: PickerItem) => {
    selectFeedback();
    dispatch(changeLanguage(value));
  }, [dispatch]);

  const items = languages.map((language) => ({
    label: languageLabels[language],
    value: language
  }));

  const value = items.find(propEq(language, 'value'));
  
  return (
    <C.Container>
      <Dropdown
        style={styles.dropdown}
        containerStyle={styles.container}
        selectedTextStyle={styles.selectedTextStyle}
        itemTextStyle={styles.itemTextStyle}
        activeColor={color.dark15}
        data={items}
        maxHeight={300}
        labelField="label"
        valueField="value"
        value={value}
        onChange={onChange}
        onFocus={selectFeedback}
      />
    </C.Container>
  );
}
