import { useAppDispatch, useAppSelector } from '@shared/lib';
import * as C from './LanguagePicker.components';
import { changeLanguage, selectAvailableLanguages, selectLanguage } from '@features/i18n';
import { useCallback } from 'react';

import { languageLabels } from './labels';
import { styles } from './LanguagePicker.style';

import { Dropdown } from 'react-native-element-dropdown';
import { propEq } from 'ramda';
import { color } from '@shared/config';
import { selectFeedback } from '@features/haptic';
import type { ViewProps } from 'react-native';

export type LanguagePickerProps = ViewProps

type PickerItem = {
  label: string;
  value: string;
}


export const LanguagePicker = (props: LanguagePickerProps) => {
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

  const renderItem = useCallback((item: PickerItem) => {
    return (
      <C.Item style={[styles.item]}>
        <C.ItemText
          style={[
            styles.itemTextStyle
          ]}
        >
          {item.label}
        </C.ItemText>
      </C.Item>
    )
  }, []);
  
  return (
    <C.Container {...props}>
      <Dropdown
        style={styles.dropdown}
        containerStyle={styles.container}
        selectedTextStyle={styles.selectedTextStyle}
        itemTextStyle={styles.itemTextStyle}
        activeColor={color.dark15}
        selectedTextProps={{
          allowFontScaling: false
        }}
        renderItem={renderItem}
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
