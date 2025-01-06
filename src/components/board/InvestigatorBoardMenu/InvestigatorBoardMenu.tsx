import { Block } from '@/components/ui/common/Block/Block';
import S from './InvestigatorBoardMenu.module.scss';
import { Icon } from '@/components/ui/icons/Icon/Icon';
import classNames from 'classnames';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { redo, undo } from '@/store/features/boardHistory/actionCreators';

export const InvestigatorBoardMenu = () => {
  const dispatch = useAppDispatch();
  const onUndo = () => dispatch(undo());
  const onRedo = () => dispatch(redo());
  return (
    <Block className={S.container}>
      <Block 
        className={classNames(
          S.icon,
          S.undo
        )}
        onClick={onUndo}
      >
        <Icon icon="undo"/>
      </Block>
      <Block 
        className={classNames(
          S.icon,
          S.redo
        )}
        onClick={onRedo}
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