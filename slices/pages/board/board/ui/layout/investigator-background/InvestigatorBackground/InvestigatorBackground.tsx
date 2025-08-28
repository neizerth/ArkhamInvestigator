import {
	selectBoardProp,
	selectShowDamageAndHorrorEffects,
} from "@modules/board/base/shared/lib";
import { useAppSelector } from "@shared/lib";
import type { ViewProps } from "react-native";
import * as C from "./InvestigatorBackground.components";

export type InvestigatorBackgroundProps = ViewProps;

export const InvestigatorBackground = ({
	...props
}: InvestigatorBackgroundProps) => {
	const showEffects = useAppSelector(selectShowDamageAndHorrorEffects);
	const uri = useAppSelector(
		selectBoardProp({
			boardId: "current",
			prop: "cachedImage",
		}),
	);

	// const source = useMemo(() => {
	// 	return {
	// 		uri,
	// 	};
	// }, [uri]);

	return (
		<C.Container {...props}>
			<C.Content>
				<C.FactionBackground />
				{uri && <C.Background src={uri} />}
				{showEffects && (
					<>
						<C.Damage />
						<C.Horror />
					</>
				)}
			</C.Content>
		</C.Container>
	);
};
