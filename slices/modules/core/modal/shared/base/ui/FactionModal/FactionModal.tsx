import type {
	BaseModalAction,
	BaseModalData,
} from "@modules/core/modal/shared/base/model";
import { useAppDispatch } from "@shared/lib";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import type { ViewProps } from "react-native";
import * as C from "./FactionModal.components";
import { useFactionModalActions } from "./useFactionModalActions";

export type FactionModalProps<
	A extends BaseModalAction,
	D extends BaseModalData<A>,
> = ViewProps & {
	data: D;
	onClose?: () => void;
};

export function FactionModal<
	A extends BaseModalAction,
	D extends BaseModalData<A>,
>({ data, children, onClose, ...props }: FactionModalProps<A, D>) {
	const dispatch = useAppDispatch();
	const { t } = useTranslation();

	const close = useCallback(() => {
		onClose?.();
		dispatch;
	}, [onClose, dispatch]);
	const { faction = "neutral", actions } = data;

	const title = t(data.title);
	const subtitle = data.subtitle && t(data.subtitle);

	const cardActions = useFactionModalActions(actions);

	return (
		<C.Container {...props}>
			<C.Outside onPress={onClose} />
			<C.Content>
				<C.Outside onPress={onClose} />
				<C.Card
					faction={faction}
					title={title}
					subtitle={subtitle}
					onClose={close}
					actions={cardActions}
				>
					{children}
				</C.Card>
			</C.Content>
		</C.Container>
	);
}
