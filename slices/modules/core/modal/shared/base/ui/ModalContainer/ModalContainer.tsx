import { StoreDisplay } from "@shared/ui";
import { selectModaShown } from "../../lib";
import type { ModalProps } from "../Modal";
import * as C from "./ModalContainer.components";

export type ModalContainerProps = ModalProps & {
	id: string;
};

export const ModalContainer = ({ id, ...props }: ModalContainerProps) => {
	return (
		<StoreDisplay selector={selectModaShown(id)}>
			<C.Modal {...props} />
		</StoreDisplay>
	);
};
