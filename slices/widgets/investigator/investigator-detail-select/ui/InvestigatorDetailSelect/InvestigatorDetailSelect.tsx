import { useAppTranslation } from "@features/i18n";
import {
	formatGameText,
	selectCurrentInvestigatorDetails,
	useAppDispatch,
	useAppSelector,
} from "@shared/lib";
import {
	goBack,
	removeInvestigatorSelection,
	setCurrentInvestigatorDetails,
} from "@shared/lib/store";
import type { Faction } from "@shared/model";
import type { InvestigatorDetailItem } from "@shared/model";
import { useCallback } from "react";
import { selectCurrentDetails } from "../../lib";
import {
	changeSkin,
	changeVariant,
	updateBoardDetails,
} from "../../lib/actions";
import { DataSectionMemo as DataSection } from "../data";
import { InvestigatorDescription } from "../investigator/InvestigatorDescription";
import * as C from "./InvestigatorDetailSelect.components";

type DetailItem = InvestigatorDetailItem | null;
export const InvestigatorDetailSelect = () => {
	const dispatch = useAppDispatch();
	const { t } = useAppTranslation();
	const details = useAppSelector(selectCurrentInvestigatorDetails);
	const { skin, skins, variant, variants, investigator } =
		useAppSelector(selectCurrentDetails);

	const onChangeSkin = useCallback(
		(item: DetailItem) => {
			dispatch(changeSkin(item));
		},
		[dispatch],
	);

	const onChangeVariant = useCallback(
		(item: DetailItem) => {
			dispatch(changeVariant(item));
		},
		[dispatch],
	);

	const back = useCallback(() => {
		dispatch(updateBoardDetails());
		dispatch(setCurrentInvestigatorDetails(null));
		dispatch(goBack());
	}, [dispatch]);

	const cancel = useCallback(() => {
		dispatch(removeInvestigatorSelection());
		dispatch(setCurrentInvestigatorDetails(null));
		dispatch(goBack());
	}, [dispatch]);

	if (!investigator || !details) {
		return null;
	}

	const faction = investigator.faction_code as Faction;
	const { name, subname = "" } = investigator;

	const formattedName = formatGameText(name);
	const formattedSubname = formatGameText(subname);

	return (
		<C.Container>
			<C.Outside onPress={cancel} />
			<C.Content>
				<C.Outside onPress={cancel} />
				<C.Card
					faction={faction}
					title={formattedName}
					subtitle={formattedSubname}
					onClose={cancel}
					onOk={back}
					onCancel={cancel}
					okText={t`Okay`}
					cancelText={t`Cancel`}
				>
					<C.Sections>
						<InvestigatorDescription
							data={details}
							variant={variant}
							skin={skin}
						/>
						<DataSection
							title={t`Versions`}
							data={variants}
							selected={variant}
							onChange={onChangeVariant}
						/>
						<DataSection
							title={t`Skins`}
							data={skins}
							onChange={onChangeSkin}
							selected={skin}
							showIcon={false}
							showNone
						/>
					</C.Sections>
				</C.Card>
			</C.Content>
		</C.Container>
	);
};
