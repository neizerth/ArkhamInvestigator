import { useAppDispatch } from "@shared/lib";
import type { Defined } from "@shared/model";
import { useCallback } from "react";
import type { TextInputProps } from "react-native";
import { setModalTextValue } from "../../../base/lib";
import type { BaseModalAction } from "../../../base/model";
import type { FactionModalProps } from "../../../base/ui";
import type { PromptModalData } from "../../model";
import * as C from "./Prompt.components";

type TextChangeHandler = Defined<TextInputProps["onChange"]>;

export type PromptProps<
	A extends BaseModalAction,
	D extends PromptModalData<A>,
> = FactionModalProps<A, D>;

export function Prompt<A extends BaseModalAction, D extends PromptModalData<A>>(
	props: PromptProps<A, D>,
) {
	const dispatch = useAppDispatch();
	const { defaultValue, text } = props.data;

	const onChange: TextChangeHandler = useCallback(
		(event) => {
			const { text } = event.nativeEvent;
			dispatch(setModalTextValue(text));
		},
		[dispatch],
	);

	return (
		<C.Container {...props}>
			{text && <C.Text value={text} />}
			<C.Input defaultValue={defaultValue} onChange={onChange} autoFocus />
		</C.Container>
	);
}
