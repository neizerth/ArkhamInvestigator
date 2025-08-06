import { closeModal } from "@modules/core/modal/shared/base/lib";
import { useAppDispatch } from "@shared/lib";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import * as C from "./ChaosTokenRevealModalClose.components";

export type ChaosTokenRevealModalCloseProps = ViewProps;

export const ChaosTokenRevealModalClose = (
	props: ChaosTokenRevealModalCloseProps,
) => {
	const dispatch = useAppDispatch();

	const close = useCallback(() => {
		dispatch(
			closeModal({
				source: "ui",
			}),
		);
	}, [dispatch]);

	return (
		<C.Container {...props} onPress={close}>
			<C.CloseIcon icon="dismiss" />
		</C.Container>
	);
};
