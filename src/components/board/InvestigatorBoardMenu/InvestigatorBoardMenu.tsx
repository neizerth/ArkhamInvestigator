import { Block } from '@/components/ui/common/Block/Block';
import S from './InvestigatorBoardMenu.module.scss';
import { Icon } from '@/components/ui/icons/Icon/Icon';
import classNames from 'classnames';

export type InvestigatorBoardMenuProps = {

}

export const InvestigatorBoardMenu = ({
  
}: InvestigatorBoardMenuProps) => {
  return (
    <Block className={S.container}>
      <Block 
        className={classNames(
          S.icon,
          S.undo
        )}
      >
        <Icon icon="undo"/>
      </Block>
      <Block 
        className={classNames(
          S.icon,
          S.redo
        )}
      >
        <Icon icon="undo"/>
      </Block>

      <Block 
        className={classNames(
          S.icon,
          S.log
        )}
      >
        <Icon icon="log"/>
      </Block>
    </Block>
  );
}