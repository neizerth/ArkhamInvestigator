import { useAppDispatch, useAppSelector } from '@shared/lib';
import * as C from './LanguagePicker.components';
import { changeLanguage, CHINESE_LANGUAGES, selectAvailableLanguages, selectLanguage } from '@features/i18n';
import { useCallback, useState } from 'react';
import type { PickerChangeEvent, PickerItemInfo } from '@widgets/picker';
import { languageMapping } from './languageMapping';
import { Flag } from '@shared/ui';

export type LanguagePickerProps = {

}

export const LanguagePicker = ({}: LanguagePickerProps) => {
  const dispatch = useAppDispatch();
  const languages = useAppSelector(selectAvailableLanguages);
  const language = useAppSelector(selectLanguage);

  const renderItem = useCallback(({ item }: PickerItemInfo) => {
    const language = languages[item];
    
    return (
      <Flag language={language}/>
    )
  }, [languages])

  const onChange = useCallback(({ value = 0 }: PickerChangeEvent) => {
    const language = languages[value];
    dispatch(changeLanguage(language));
  }, [dispatch, languages]);

  const index = languages.indexOf(language) || 0;
  const nextIndex = (index + 1) % languages.length;
  const prevIndex = index === 0 ? languages.length - 1 : index - 1;

  const nextLanguage = languages[nextIndex];
  const prevLanguage = languages[prevIndex];

  const next = useCallback(() => {
    dispatch(changeLanguage(nextLanguage))
  }, [dispatch, nextLanguage]);

  const prev = useCallback(() => {
    dispatch(changeLanguage(prevLanguage))
  }, [dispatch, prevLanguage]);

  const data = [...languages.keys()]

  return (
    <C.Container>
      <C.Control onPress={prev}>
        <C.ArrowTop/>
      </C.Control>
      <C.Picker
        renderItem={renderItem}
        data={data}
        value={index}
        onValueChanged={onChange}
      />
       <C.Control onPress={next}>
        <C.ArrowBottom/>
      </C.Control>
    </C.Container>
  );
}