import type { ViewProps } from "react-native";

import { useAppSelector } from "@shared/lib";
import { selectCurrentRevealedToken } from "../../lib";
import { ChaosTokenRevealModalProvider as ContextProvider } from "../ChaosTokenRevealModalProvider";
import * as C from "./ChaosTokenRevealModal.components";

export type ChaosTokenRevealModalProps = ViewProps;

export const ChaosTokenRevealModal = (props: ChaosTokenRevealModalProps) => {
	const token = useAppSelector(selectCurrentRevealedToken);

	return (
		<C.Container {...props}>
			<ContextProvider>
				<C.Close />
				<C.Content>
					<C.TopView />

					<C.LeftView />
					<C.RightView />

					{token && <C.CenterView token={token} />}

					<C.BottomView />

					<C.OneMoreLoader />
				</C.Content>
			</ContextProvider>
		</C.Container>
	);
};
