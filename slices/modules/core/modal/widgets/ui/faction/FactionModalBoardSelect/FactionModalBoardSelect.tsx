import { useAppTranslation } from "@modules/core/i18n/shared/lib";
import type { InvestigatorDetailItem } from "@shared/model";
import { useCallback } from "react";
import type { ViewProps } from "react-native";
import * as C from "./FactionModalBoardSelect.components";

export type FactionModalBoardSelectProps = ViewProps & {
	onChange: (id: number) => void;
	data: InvestigatorDetailItem[];
	disabled?: string[];
	selectedIndex: number | null;
};

export const FactionModalBoardSelect = ({
	onChange: onChangeProp,
	data,
	selectedIndex,
	...props
}: FactionModalBoardSelectProps) => {
	const { t } = useAppTranslation();

	const selectedId = selectedIndex !== null ? data[selectedIndex].id : null;

	const onChange = useCallback(
		(item: InvestigatorDetailItem | null, index?: number) => {
			if (!item || index === undefined) {
				return;
			}

			onChangeProp(index);
		},
		[onChangeProp],
	);

	return (
		<C.Container
			{...props}
			title={t`Investigators`}
			data={data}
			size={75}
			selectedId={selectedId}
			onChange={onChange}
			defaultLabel={t`Not selected`}
		/>
	);
};
