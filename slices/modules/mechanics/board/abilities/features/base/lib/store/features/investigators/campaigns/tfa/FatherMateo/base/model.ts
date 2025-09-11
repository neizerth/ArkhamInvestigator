import type { PropsWithBoardId } from "@modules/board/base/shared/model";
import type { ConfirmModalAction } from "@modules/core/modal/shared/actions/confirm/model";
import type { ModalActionProcessedPayload } from "@modules/core/modal/shared/base/lib";
import type { PayloadAction } from "@reduxjs/toolkit";

type ModalAction = ConfirmModalAction<PropsWithBoardId>;
type Payload = ModalActionProcessedPayload<ModalAction>;

export type FatherMateoModalAciton = PayloadAction<Payload>;
