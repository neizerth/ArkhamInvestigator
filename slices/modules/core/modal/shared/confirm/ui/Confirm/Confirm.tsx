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
	const { text } = props.data;

	return (
		<C.Container {...props}>
			<C.Text value={text} />
		</C.Container>
	);
}
