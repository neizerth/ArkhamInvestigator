import { CHINESE_LANGUAGES } from '@features/i18n';
import * as C from './Flag.components';
import { languageMapping } from './languageMapping';

export type FlagProps = {
  language: string
}

export const Flag = ({
  language
}: FlagProps) => {
  const code = languageMapping[language] || language;

  const uri = `https://flagcdn.com/w160/${code}.png`
  const source = { uri };

  const isChina = CHINESE_LANGUAGES.includes(language);
  return (
    <C.Container>
      <C.Image
        source={source}
      />
      {isChina && (
        <C.Overlay>
          <C.Title>{language}</C.Title>
        </C.Overlay>
      )}
    </C.Container>
  );
}