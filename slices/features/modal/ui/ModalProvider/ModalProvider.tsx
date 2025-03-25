import { PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../../../shared/lib/hooks/store/useAppSelector';
import { selectModalData, selectModalId } from '../../lib/store/features/modal/modal';
import { closeModal } from '../../lib/store/features/modal/actions/closeModal';
import * as C from './ModalProvider.components';
import { type ModalContextType, type ModalEventHandler } from '@features/modal/lib';
import { ModalContext, ModalEventHandlerType } from '../../lib/context'
import { useAppDispatch } from '../../../../shared/lib/hooks/store/useAppDispatch';
import { BackHandler } from 'react-native';

export const ModalProvider = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch();
  const modalId = useAppSelector(selectModalId);
  const modalData = useAppSelector(selectModalData);

  const close = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch])

  const onOk = useRef<ModalEventHandlerType>(null);
  const onCancel = useRef<ModalEventHandlerType>(null);
  const onClose = useRef<ModalEventHandlerType>(close);

  const contextValue: ModalContextType = {
    onOk,
    onCancel,
    onClose
  }

  useEffect(() => {
    const onBack = () => {
      if (modalId) {
        close()
        onClose.current?.()
        return true;
      }
      return false;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      onBack,
    );
    return () => backHandler.remove();
  }, [modalId, close]);

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      {modalId && modalData && <C.Modal data={modalData}/>}
    </ModalContext.Provider>
  );
}