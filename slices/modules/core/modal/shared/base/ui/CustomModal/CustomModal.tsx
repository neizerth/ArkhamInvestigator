import { StoreDisplay } from "@shared/ui";
import { selectModalShown } from "../../lib";
import type { ModalProps } from "../Modal";
import * as C from "./CustomModal.components";

export type CustomModalProps = ModalProps & {
	id: string;
};

export const CustomModal = ({ id, ...props }: CustomModalProps) => {
	return (
		<StoreDisplay selector={selectModalShown(id)}>
			<C.Modal {...props} />
		</StoreDisplay>
	);
};
