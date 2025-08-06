import { useI18NText } from "@modules/core/i18n/shared/lib";
import type { BaseModalAction } from "../../../base/model";
import type { FactionModalProps } from "../../../base/ui";
import type { ConfirmModalData } from "../../model";
import * as C from "./Confirm.components";

export type ConfirmProps<
	A extends BaseModalAction,
	D extends ConfirmModalData<A>,
> = FactionModalProps<A, D>;

export function Confirm<
	A extends BaseModalAction,
	D extends ConfirmModalData<A>,
>(props: ConfirmProps<A, D>) {
	const translate = useI18NText();
	const { data } = props;
	const text = translate(data.text);

	return (
		<C.Container {...props}>
			<C.Text value={text} />
		</C.Container>
	);
}
