import { StoreDisplay } from "@shared/ui";
import { selectModaShown } from "../../lib";
import type { ModalProps } from "../Modal";
import * as C from "./CustomModal.components";

export type CustomModalProps = ModalProps & {
	id: string;
};

export const CustomModal = ({ id, ...props }: CustomModalProps) => {
	return (
		<StoreDisplay selector={selectModaShown(id)}>
			<C.Modal {...props} />
		</StoreDisplay>
	);
};
