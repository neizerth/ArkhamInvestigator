import { IInvestigator } from '@/types/api';
import S from './InvestigatorBoard.module.scss';
import { Block } from '@/components';
import { InvestigatorBoardImage as InvestigatorImage } from '../InvestigatorBoardImage/InvestigatorBoardImage';
import { InvestigatorBoardHeader as Header } from '../header/InvestigatorBoardHeader/InvestigatorBoardHeader';
import { InvestigatorDescription as Description } from '../InvestigatorDescription/InvestigatorDescription';
import classNames from 'classnames';
import { useState } from 'react';
import { InvestigatorBoardFooter as Footer } from '../InvestigatorBoardFooter/InvestigatorBoardFooter';
import { InvestigatorBoardSidebar as Sidebar } from '../InvestigatorBoardSidebar/InvestigatorBoardSidebar';
import { InvestigatorBoardMenu as Menu } from '../InvestigatorBoardMenu/InvestigatorBoardMenu';

export type InvestigatorBoardProps = {
  investigator: IInvestigator
}

export const InvestigatorBoard = ({
  investigator
}: InvestigatorBoardProps) => {

  const [showDescription, setShowDescription] = useState(false);
  const toggleDescription = () => setShowDescription(!showDescription);
  return (
    <Block className={S.container}>
      <Block className={S.header}>
        <Header 
          investigator={investigator}
        />
      </Block>
      <Block className={S.image}>
        <InvestigatorImage 
          investigator={investigator}
        />
      </Block>
      <Block className={S.menu}>
        <Menu/>
      </Block>
      <Block className={S.sidebar}>
        <Sidebar/>
      </Block>
      <Block className={S.footer}>
        <Footer/>
      </Block>
      <Block 
        className={classNames(
          S.description,
          showDescription && S.description_active
        )}
        onClick={toggleDescription}
      >
        <Description
          investigator={investigator}
        />
      </Block>
    </Block>
  );
}