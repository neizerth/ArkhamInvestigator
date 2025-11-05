import type { ChaosBagToken } from "@modules/chaos-bag/base/shared/model";
import type { PressCallback } from "@modules/core/touch/shared/model";
import type { TouchableOpacityProps } from "@modules/core/touch/shared/ui";
import * as C from "./ChaosTokenMenu.components";

export type ChaosTokenMenuProps = TouchableOpacityProps & {
	token: ChaosBagToken;
	onClose?: PressCallback;
	onReveal?: PressCallback;
	onResolve?: PressCallback;
	onRemove?: PressCallback;
	removable?: boolean;
};

export const ChaosTokenMenu = ({
	token,
	onClose,
	onReveal,
	onResolve,
	onRemove,
	removable = false,
	...props
}: ChaosTokenMenuProps) => {
	const { sealed } = token;
	return (
		<C.Container {...props} onPress={onClose}>
			<C.Reveal icon="undo" onPress={onReveal} />
			<C.Close icon="close" onPress={onClose} />
			{removable && <C.Remove icon="trash" onPress={onRemove} />}
			{/* {sealed && <C.Resolve icon="resolve" onPress={onResolve} />} */}
		</C.Container>
	);
};
