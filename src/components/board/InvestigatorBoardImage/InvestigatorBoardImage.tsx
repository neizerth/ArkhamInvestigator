import { IInvestigator } from '@/types/api';
import S from './InvestigatorBoardImage.module.scss';
import { PropsWithClassName } from '@/types/ui';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Image } from '@/components';

export type InvestigatorBoardImageProps = PropsWithClassName & {
  investigator: IInvestigator
}

export const InvestigatorBoardImage = ({
  investigator,
  className
}: InvestigatorBoardImageProps) => {
  const { t } = useTranslation();
  const name = t(investigator.name);
  const { code } = investigator;
  const src = `/images/investigators/${code}.jpg`;
  return (
    <Image 
      src={src}
      alt={name}
      className={classNames(
        S.container, 
        className
      )}
    />
  );
}