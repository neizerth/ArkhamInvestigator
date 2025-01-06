import { Block, TextWithIcons } from '@/components';
import S from './InvestigatorDescription.module.scss';
import classNames from 'classnames';
import { IInvestigator } from '@/types/api';
import { useTranslation } from 'react-i18next';
import { Fragment } from 'react';

export type InvestigatorDescriptionProps = {
  investigator: IInvestigator
}

export const InvestigatorDescription = ({
  investigator
}: InvestigatorDescriptionProps) => {
  const { t } = useTranslation();
  const { faction_code, text } = investigator;
  return (
    <Block className={classNames(
      S.container,
      S[faction_code]
    )}>
      <TextWithIcons value={t(text)}/>
    </Block>
  );
}
