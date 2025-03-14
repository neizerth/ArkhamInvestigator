import { useAppSelector } from '@shared/lib';
import * as C from './InvestigatorText.components';
import type { InvestigatorTextProps } from './InvestigatorText.types';
import { getInvestigatorTextStyle } from './InvestigatorText.styles';
import { selectLanguage, useAppTranslation } from '@features/i18n';
import { mergeDeepRight } from 'ramda';
import type { ComponentStyleMap } from '@widgets/game-text';

// export { Text as InvestigatorText } from './InvestigatorText.components';

export const InvestigatorText = (props: InvestigatorTextProps) => {
  const { translate } = useAppTranslation();
  const [text, language] = translate(props.value);

  const { unit = 0 } = props;

  const styleSheet = getInvestigatorTextStyle({
    language,
    unit
  });

  const componentStyles = mergeDeepRight(
    props.componentStyles || {},
    styleSheet.componentStyles
  ) as ComponentStyleMap;

  return (
    <C.Text
      {...props}
      value={text}
      componentStyles={componentStyles}
      style={[
        props.style,
        styleSheet.style
      ]}
    />
  )
}