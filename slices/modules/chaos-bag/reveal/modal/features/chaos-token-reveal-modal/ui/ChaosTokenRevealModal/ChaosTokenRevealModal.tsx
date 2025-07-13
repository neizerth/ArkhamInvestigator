import type { ViewProps } from "react-native";

import { ChaosTokenRevealModalProvider as ContextProvider } from "../ChaosTokenRevealModalProvider";
import * as C from "./ChaosTokenRevealModal.components";

export type ChaosTokenRevealModalProps = ViewProps;

export const ChaosTokenRevealModal = (props: ChaosTokenRevealModalProps) => {
	return (
		<C.Container {...props}>
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
