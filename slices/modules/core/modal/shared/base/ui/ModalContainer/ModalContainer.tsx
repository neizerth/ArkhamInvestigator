import { StoreDisplay } from "@shared/ui";
import type { ViewProps } from "react-native";
import { selectModaShown } from "../../lib";
import * as C from "./ModalContainer.components";

export type ModalContainerProps = ViewProps & {
	id: string;
};

export const ModalContainer = ({ id, ...props }: ModalContainerProps) => {
	return (
		<StoreDisplay selector={selectModaShown(id)}>
			<C.Modal {...props} />
		</StoreDisplay>
	);
};
