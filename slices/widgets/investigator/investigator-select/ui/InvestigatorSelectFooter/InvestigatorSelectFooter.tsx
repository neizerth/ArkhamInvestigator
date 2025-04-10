import {
	selectCurrentInvestigatorDetails,
	selectSelectedInvestigators,
	useAppSelector,
} from "@shared/lib";
import type { ViewProps } from "react-native";
import { ClearButton } from "../ClearButton";
import { StartButton } from "../StartButton";
import { Container } from "./InvestigatorSelectFooter.components";

export type InvestigatorSelectFooterProps = ViewProps;

export const InvestigatorSelectFooter = (
	props: InvestigatorSelectFooterProps,
) => {
	const investigators = useAppSelector(selectSelectedInvestigators);
	const details = useAppSelector(selectCurrentInvestigatorDetails);

	if (investigators.length === 0 || details) {
		return null;
	}
	return (
		<Container {...props}>
			<ClearButton />
			<StartButton />
		</Container>
	);
};
