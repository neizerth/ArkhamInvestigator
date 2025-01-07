import classNames from 'classnames';
import S from './Popup.module.scss';
import { useAppSelector } from '@/hooks/useAppSelector';
import { closePopup, selectPopupId } from '@/store/features/popup/popup';
import { type MouseEventHandler, type PropsWithChildren, useRef } from 'react';
import { Block } from '@/components';
import { useAppDispatch } from '@/hooks/useAppDispatch';

export type PopupProps = PropsWithChildren & {
  id: string
}

export const Popup = ({
  id,
  children
}: PopupProps) => {
  const dispatch = useAppDispatch();
  const currentPopupId = useAppSelector(selectPopupId);
  const show = currentPopupId === id;

  const close = () => dispatch(closePopup());

  const onClick: MouseEventHandler = ({ target, currentTarget }) => {
    if (currentTarget !== target) {
      return;
    }
    close();
  }

  return (
    <Block
      className={classNames(
        S.container,
        show && S.show
      )}
      onClick={onClick}
    >
      {children}
    </Block>
  );
}