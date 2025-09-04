import { useAppSelector } from "@shared/lib";
import type { ViewProps } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";

import { selectModifyChaosTokens } from "@modules/chaos-bag/base/shared/lib";
import type { RevealedChaosBagToken } from "@modules/chaos-bag/reveal/base/shared/model";
import * as C from "./CenterPanel.components";
import { useGestures } from "./useGestures";

export type CenterPanelProps = ViewProps & {
	token: RevealedChaosBagToken;
};

export const CenterPanel = ({ style, token, ...props }: CenterPanelProps) => {
	const { type } = token;

	const showTokenValue = useAppSelector(selectModifyChaosTokens);

	const gesture = useGestures(token);

	return (
		<GestureDetector gesture={gesture}>
			<C.Container style={style}>
				<C.CurrentToken {...token} {...props} />
				{showTokenValue && (
					<C.ControlContainer>
						<C.Control type={type} />
					</C.ControlContainer>
				)}

				<C.Expression />
			</C.Container>
		</GestureDetector>
	);
};
