import { useAppDispatch } from "@shared/lib";
import type { Defined } from "@shared/model";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
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
	const { t } = useTranslation();
	const { data } = props;
	const defaultValue = data.defaultValue && t(data.defaultValue);
	const placeholder = data.placeholder && t(data.placeholder);

	const text = data.text && t(data.text);

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
			<C.Input
				placeholder={placeholder}
				defaultValue={defaultValue}
				onChange={onChange}
				autoFocus
			/>
		</C.Container>
	);
}
