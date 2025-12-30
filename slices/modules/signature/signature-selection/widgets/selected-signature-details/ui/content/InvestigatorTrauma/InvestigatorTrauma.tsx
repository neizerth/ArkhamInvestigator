import { selectCurrentSignatureGroup } from "@modules/signature/signature-selection/shared/lib";
import { useAppSelector } from "@shared/lib";
import type { InvestigatorSignatureGroup } from "arkham-investigator-data";
import { useTranslation } from "react-i18next";
import type { ViewProps } from "react-native";
import * as C from "./InvestigatorTrauma.components";
import { useInvestigatorTrauma } from "./useInvestigatorTrauma";

export type InvestigatorTraumaProps = ViewProps;

export const InvestigatorTrauma = (props: InvestigatorTraumaProps) => {
	const { t } = useTranslation();
	const group = useAppSelector(
		selectCurrentSignatureGroup,
	) as InvestigatorSignatureGroup;

	const code = group.id;
	const physical = useInvestigatorTrauma({
		code,
		prop: "physicalTrauma",
	});

	const mental = useInvestigatorTrauma({
		code,
		prop: "mentalTrauma",
	});

	return (
		<C.Container {...props}>
			<C.Title>{t`Trauma`}</C.Title>
			<C.Controls>
				<C.Control
					onIncrement={physical.increment}
					onDecrement={physical.decrement}
					min={0}
					max={20}
					value={physical.value}
				>
					<C.Health value={physical.value} />
				</C.Control>
				<C.Control
					onIncrement={mental.increment}
					onDecrement={mental.decrement}
					min={0}
					max={20}
					value={mental.value}
				>
					<C.Sanity value={mental.value} />
				</C.Control>
			</C.Controls>
		</C.Container>
	);
};
