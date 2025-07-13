import type { ViewProps } from "react-native";

import { CustomModalId } from "@modules/core/modal/entities/base/config";
import { ChaosTokenRevealModalProvider as ContextProvider } from "../ChaosTokenRevealModalProvider";
import * as C from "./ChaosTokenRevealModal.components";

export type ChaosTokenRevealModalProps = ViewProps;

export const ChaosTokenRevealModal = (props: ChaosTokenRevealModalProps) => {
	return (
		<C.Container
			{...props}
			type="transparent"
			id={CustomModalId.chaosTokenReveal}
		>
			<ContextProvider>
				<C.Content>
					<C.TopView />

					<C.LeftView />
					<C.RightView />

					<C.CenterView />

					<C.BottomView />

					<C.OneMoreLoader />
				</C.Content>
			</ContextProvider>
		</C.Container>
	);
};
