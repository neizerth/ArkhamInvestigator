import type { Defined, Faction } from "@shared/model";
import { useCallback, useContext, useRef, useState } from "react";
import type { TextInputProps, ViewProps } from "react-native";
import { ModalContext } from "../../../lib";
import type { ModalData } from "../../../model";
import * as C from "./FactionModal.components";

type TextChangeHandler = Defined<TextInputProps["onChange"]>;
export type FactionModalProps = ViewProps & {
	data: ModalData;
};

export const FactionModal = ({ data, ...props }: FactionModalProps) => {
	const context = useContext(ModalContext);

	const ok = context.onOk?.current;
	const [boardIndex, setBoardIndex] = useState<number | null>(null);

	const okHandler = useCallback(() => {
		return ok?.({
			textValue: textValue.current,
			boardIndex: boardIndex,
		});
	}, [ok, boardIndex]);

	const onBoardSelect = useCallback((index: number) => {
		setBoardIndex(index);
	}, []);

	const onTextValueChange = useCallback<TextChangeHandler>((event) => {
		textValue.current = event.nativeEvent.text;
	}, []);
	const onOk = ok && okHandler;
	const onCancel = context.onCancel?.current;
	const onClose = context.onClose?.current;
	const {
		title,
		subtitle,
		text,
		okText,
		cancelText,
		contentType,
		okIcon,
		cancelIcon,
	} = data;
	const cardFaction: Faction = data.faction || "neutral";

	const defaultTextValue =
		(data.contentType === "input" && data.defaultValue) || "";

	const textValue = useRef(defaultTextValue);

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
					okIcon={okIcon}
					cancelIcon={cancelIcon}
				>
					<C.CardContent>
						{text && <C.Text value={text} />}
						{contentType === "input" && (
							<C.Input
								autoFocus
								defaultValue={defaultTextValue}
								onChange={onTextValueChange}
							/>
						)}
						{data.contentType === "board" && (
							<C.BoardSelect
								onChange={onBoardSelect}
								data={data.value}
								disabled={data.disabled}
								selectedIndex={boardIndex}
							/>
						)}
					</C.CardContent>
				</C.Card>
			</C.Content>
		</C.Container>
	);
};
