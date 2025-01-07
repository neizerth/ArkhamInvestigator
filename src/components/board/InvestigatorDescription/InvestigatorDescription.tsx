import { Block, TextWithIcons } from '@/components';
// import S from './InvestigatorDescription.module.scss';
import type { IInvestigator } from '@/types/api';
import { useTranslation } from 'react-i18next';
import { InvestigatorContent } from '../../containers/InvestigatorContent/InvestigatorContent';

export type InvestigatorDescriptionProps = {
  investigator: IInvestigator
}

export const InvestigatorDescription = ({
  investigator
}: InvestigatorDescriptionProps) => {
  const { t } = useTranslation();
  const { faction_code, text } = investigator;
  return (
    <InvestigatorContent
      faction={faction_code}
    >
      <TextWithIcons value={t(text)}/>
    </InvestigatorContent>
  );
}
