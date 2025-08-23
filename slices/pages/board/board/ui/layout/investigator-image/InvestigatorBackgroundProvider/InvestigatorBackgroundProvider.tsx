import {
	selectBoardIds,
	selectCurrentInvestigatorIndex,
} from "@modules/board/base/shared/lib";
import { useAppSelector } from "@shared/lib";
import type { ViewProps } from "react-native";
import * as C from "./InvestigatorBackgroundProvider.components";

export type InvestigatorBackgroundProviderProps = ViewProps;
export const InvestigatorBackgroundProvider = (
	props: InvestigatorBackgroundProviderProps,
) => {
	const ids = useAppSelector(selectBoardIds);
	const index = useAppSelector(selectCurrentInvestigatorIndex);

	return (
		<C.Container {...props}>
			{ids.map((boardId, i) => (
				<C.Background key={boardId} boardId={boardId} selected={i === index} />
			))}
		</C.Container>
	);
};
