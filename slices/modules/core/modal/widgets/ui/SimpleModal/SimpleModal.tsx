import { useAppSelector, useBackButton } from "@shared/lib";
import { Outside, StoreDisplay, type StoreDisplayProps } from "@shared/ui";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import * as C from "./SimpleModal.components";

export type SimpleModalProps = StoreDisplayProps &
	ViewProps & {
		onClose?: () => void;
	};
export const SimpleModal = ({
	selector,
	children,
	onClose,
	...props
}: SimpleModalProps) => {
	const show = useAppSelector(selector);

	const onBack = useCallback(() => {
		if (show) {
			onClose?.();
			return true;
		}
		return false;
	}, [show, onClose]);
	useBackButton(onBack);

	return (
		<StoreDisplay selector={selector}>
			<C.Container {...props}>
				<Outside onPress={onClose} />
				<C.Content>{children}</C.Content>
			</C.Container>
		</StoreDisplay>
	);
};
