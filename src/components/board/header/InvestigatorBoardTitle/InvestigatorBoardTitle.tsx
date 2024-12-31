import { IInvestigator } from '@/types/api';
import S from './InvestigatorBoardTitle.module.scss';
import { Block } from '@/components/ui/Block/Block';
import { useTranslation } from 'react-i18next';
import { getBackground } from './images';
import classNames from 'classnames';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectLanguage } from '@/store/features/language/language';
import { Icon } from '@/components/ui/Icon/Icon';

export type InvestigatorBoardTitleProps = {
  investigator: IInvestigator
}

export const InvestigatorBoardTitle = ({
  investigator
}: InvestigatorBoardTitleProps) => {
  const { t } = useTranslation();
  const language = useAppSelector(selectLanguage);
  const background = getBackground();

  return (
    <Block 
      className={classNames(
        S.container,
        S[language]
      )}
    >
      <img
        className={S.background}
        src={background}
      />
      <Block className={S.nameWrapper}>
        <Block className={S.name}>
          <Block className={S.unique}>
            <Icon icon='unique'/>
          </Block>
          {t(investigator.name)}
        </Block>
      </Block>
      {investigator.subname && (
        <Block className={S.subname}>
          {t(investigator.subname)}
        </Block>
      )}
    </Block>
  );
}