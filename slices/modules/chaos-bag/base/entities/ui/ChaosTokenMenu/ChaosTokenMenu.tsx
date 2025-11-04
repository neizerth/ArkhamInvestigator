import type { ChaosBagToken } from "@modules/chaos-bag/base/shared/model";
import type { PressCallback } from "@modules/core/touch/shared/model";
import type { TouchableOpacityProps } from "@modules/core/touch/shared/ui";
import * as C from "./ChaosTokenMenu.components";

export type ChaosTokenMenuProps = TouchableOpacityProps & {
	token: ChaosBagToken;
	onClose?: PressCallback;
	onResolve?: PressCallback;
	onRemove?: PressCallback;
	removable?: boolean;
};

export const ChaosTokenMenu = ({
	token,
	onClose,
	onResolve,
	onRemove,
	removable = false,
	...props
}: ChaosTokenMenuProps) => {
	return (
		<C.Container {...props} onPress={onClose}>
			<C.Resolve icon="undo" onPress={onResolve} />
			<C.Close icon="close" onPress={onClose} />
			{removable && <C.Remove icon="trash" onPress={onRemove} />}
		</C.Container>
	);
};
