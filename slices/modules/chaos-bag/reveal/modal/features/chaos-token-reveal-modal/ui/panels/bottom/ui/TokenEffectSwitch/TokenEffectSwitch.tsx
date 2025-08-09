import { updateRevealedToken } from "@modules/chaos-bag/reveal/base/shared/lib";
import type {
	RevealedChaosBagToken,
	RevealedChaosBagTokenCancelType,
} from "@modules/chaos-bag/reveal/base/shared/model";
import { getLoopNext, useAppDispatch } from "@shared/lib";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import * as C from "./TokenEffectSwitch.components";

export type TokenEffectSwitchProps = ViewProps & {
	token: RevealedChaosBagToken;
};

const switchValues: RevealedChaosBagTokenCancelType[] = [false, true, "effect"];

export const TokenEffectSwitch = ({
	token,
	...props
}: TokenEffectSwitchProps) => {
	const dispatch = useAppDispatch();

	const { id } = token;
	const cancelType = token.canceled || false;
	const index = switchValues.indexOf(cancelType);
	const nextType = getLoopNext(switchValues, index);

	const switchCancelType = useCallback(() => {
		dispatch(
			updateRevealedToken({
				id: id,
				data: {
					canceled: nextType,
				},
			}),
		);
	}, [dispatch, id, nextType]);

	const active = Boolean(cancelType);

	return (
		<C.Container {...props} onPress={switchCancelType}>
			<C.SwitchIcon
				icon="blocked-medium"
				active={active}
				byEffect={token.canceled === "effect"}
			/>
			{token.canceled === "effect" && <C.EffectIcon icon="effect" />}
		</C.Container>
	);
};
