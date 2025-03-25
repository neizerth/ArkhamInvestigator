import type { Nullable } from "@shared/model";
import { identity } from "ramda";
import { createContext, MutableRefObject } from "react";

export type ModalEventHandlerType = Nullable<() => void>;

export type ModalEventHandler = MutableRefObject<ModalEventHandlerType> | null

export type ModalContextType = {
  onOk: ModalEventHandler
  onCancel: ModalEventHandler
  onClose: ModalEventHandler
}

export const ModalContext = createContext<ModalContextType>({
  onCancel: null,
  onOk: null,
  onClose: null,
})