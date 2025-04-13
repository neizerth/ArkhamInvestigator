import type { Faction } from "@shared/model";
import { useContext } from "react";
import type { ViewProps } from "react-native";
import { ModalContext } from "../../lib";
import type { ModalData } from "../../model";
import * as C from "./FactionModal.components";

export type FactionModalProps = ViewProps & {
	data: ModalData;
};

export const FactionModal = ({ data, ...props }: FactionModalProps) => {
	const context = useContext(ModalContext);
	const onOk = context.onOk?.current;
	const onCancel = context.onCancel?.current;
	const onClose = context.onClose?.current;
	const { title, subtitle, text, okText, cancelText } = data;
	const cardFaction: Faction = data.faction || "neutral";

	return (
		<C.Container {...props}>
			<C.Outside onPress={onClose} />
			<C.Content>
				<C.Outside onPress={onClose} />
				<C.Card
					faction={cardFaction}
					title={title}
					subtitle={subtitle}
					onOk={onOk}
					onCancel={onCancel}
					onClose={onClose}
					okText={okText}
					cancelText={cancelText}
				>
					<C.CardContent>
						<C.Text>{text}</C.Text>
					</C.CardContent>
				</C.Card>
			</C.Content>
		</C.Container>
	);
};
