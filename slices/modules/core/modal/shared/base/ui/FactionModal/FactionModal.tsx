import { useI18NText } from "@modules/core/i18n/shared/lib";
import type {
	BaseModalAction,
	BaseModalData,
} from "@modules/core/modal/shared/base/model";
import { useAppDispatch } from "@shared/lib";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import { closeModal } from "../../lib";
import * as C from "./FactionModal.components";
import { useFactionModalActions } from "./useFactionModalActions";

export type FactionModalProps<
	A extends BaseModalAction,
	D extends BaseModalData<A>,
> = ViewProps & {
	data: D;
	resizeable?: boolean;
	onClose?: () => void;
};

export function FactionModal<
	A extends BaseModalAction,
	D extends BaseModalData<A>,
>({ data, children, onClose, resizeable, ...props }: FactionModalProps<A, D>) {
	const dispatch = useAppDispatch();
	const translate = useI18NText();

	const close = useCallback(() => {
		onClose?.();
		dispatch(
			closeModal({
				source: "ui",
			}),
		);
	}, [onClose, dispatch]);
	const { faction = "neutral", actions } = data;

	const title = translate(data.title);
	const subtitle = data.subtitle && translate(data.subtitle);

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
					resizeable={resizeable}
				>
					{children}
				</C.Card>
			</C.Content>
		</C.Container>
	);
}
