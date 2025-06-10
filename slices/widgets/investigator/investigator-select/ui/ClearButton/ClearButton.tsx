import type { TouchableOpacityProps } from "@modules/core/haptic/shared/ui";
import { clearSelectedInvestigators, useAppDispatch } from "@shared/lib";
import { useCallback } from "react";
import * as C from "./ClearButton.components";

export type ClearButtonProps = TouchableOpacityProps;

export const ClearButton = (props: ClearButtonProps) => {
	const dispatch = useAppDispatch();
	const clear = useCallback(() => {
		dispatch(clearSelectedInvestigators());
	}, [dispatch]);
	return (
		<C.Container {...props} onPress={clear}>
			<C.Icon icon="dismiss" />
		</C.Container>
	);
};
