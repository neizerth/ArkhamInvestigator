import {
	SignatureDetailSelect,
	type SignatureDetailSelectProps,
} from "@modules/signature/base/features/base/ui";
import { useAppSelector } from "@shared/lib";
import { useMemo } from "react";
import { selectDetailItems, selectDisabledItems } from "./lib";

export type BoardDetailSelectProps = Omit<
	SignatureDetailSelectProps<number>,
	"data" | "disabled"
> & {
	data: number[];
	disabled?: number[];
	value?: number;
};

export function BoardDetailSelect({
	data,
	disabled = [],
	value,
	...props
}: BoardDetailSelectProps) {
	const boardsData = useAppSelector((state) => selectDetailItems(state, data));
	const disabledData = useAppSelector((state) =>
		selectDisabledItems(state, disabled),
	);

	const selectedId = useMemo(() => {
		const item = boardsData.find(({ data }) => data === value) ?? boardsData[0];
		return item?.id;
	}, [value, boardsData]);

	return (
		<SignatureDetailSelect
			{...props}
			data={boardsData}
			selectedId={selectedId}
			disabled={disabledData}
		/>
	);
}
