import { selectBoardById, useAppSelector } from "@shared/lib";
import type { ViewProps } from "react-native";
import * as C from "./OverviewInvestigator.components";

export type OverviewInvestigatorProps = ViewProps & {
	boardId: number;
	separator?: boolean;
	selected?: boolean;
	onSelect?: () => void;
};

export const OverviewInvestigator = ({
	boardId,
	separator = false,
	selected = false,
	onSelect,
	...props
}: OverviewInvestigatorProps) => {
	const board = useAppSelector(selectBoardById(boardId));

	if (!board) {
		return;
	}

	const { investigator, value } = board;

	return (
		<C.Container {...props}>
			{separator && <C.Separator />}
			<C.Content>
				<C.Primary>
					<C.Name>{investigator.name}</C.Name>
					<C.Skills {...value} />
					<C.Stats>
						<C.Health value={value.health} />
						<C.Sanity value={value.sanity} />
						<C.Clues value={value.clues} />
						<C.Resources value={value.resources} />
						<C.Actions value={value.actions} />
					</C.Stats>
				</C.Primary>
				<C.Secondary>
					<C.Image
						size={110}
						faction={investigator.faction_code}
						code={investigator.code}
						onPress={onSelect}
						selected={selected}
					/>
				</C.Secondary>
			</C.Content>
		</C.Container>
	);
};
