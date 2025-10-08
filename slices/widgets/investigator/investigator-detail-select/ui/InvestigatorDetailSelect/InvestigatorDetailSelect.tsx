import { formatGameText, useAppDispatch, useAppSelector } from "@shared/lib";
import {
	selectCurrentSignatureGroup,
	selectCurrentSignatureId,
	selectCurrentSkinId,
	selectReplaceInvestigator,
	setCurrentSignatureId,
	setCurrentSkinId,
} from "@shared/lib/store";
import type { InvestigatorDetailItem } from "@shared/model";
import { Delay } from "@shared/ui";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { InvestigatorSelectSectionMemo as DataSection } from "../../../investigator-select-section";
import { CARD_SIZE } from "../../config";
import {
	cancelSelection,
	getSignatures,
	getSkins,
	setSelection,
} from "../../lib";
// import { DataSectionMemo as DataSection } from "../data";
import { InvestigatorDescription } from "../investigator";
import * as C from "./InvestigatorDetailSelect.components";

type DetailItem = InvestigatorDetailItem | null;
export const InvestigatorDetailSelect = () => {
	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	const group = useAppSelector(selectCurrentSignatureGroup);
	const skinId = useAppSelector(selectCurrentSkinId);
	const currentSignatureId = useAppSelector(selectCurrentSignatureId);
	const replaceInvestigator = useAppSelector(selectReplaceInvestigator);

	const onChangeSkin = useCallback(
		(item: DetailItem) => {
			const value = skinId === item?.value ? null : item?.value || null;
			dispatch(setCurrentSkinId(value));
		},
		[dispatch, skinId],
	);

	const onChangeSignature = useCallback(
		(item: DetailItem) => {
			dispatch(setCurrentSignatureId(item?.value || null));
		},
		[dispatch],
	);

	const select = useCallback(() => {
		dispatch(setSelection());
	}, [dispatch]);

	const cancel = useCallback(() => {
		dispatch(cancelSelection());
	}, [dispatch]);

	if (!group) {
		return null;
	}

	const skins = getSkins(group);
	const signatures = getSignatures(group);
	const signatureId = currentSignatureId || signatures[0].id;

	const { name, subname, faction_code } = group;

	const formattedName = formatGameText(name);
	const formattedSubname = formatGameText(subname);

	const okText = replaceInvestigator ? t`Continue` : t`Okay`;

	return (
		<C.Container>
			<C.Outside onPress={cancel} />
			<C.Content>
				<C.Outside onPress={cancel} />
				<C.Card
					faction={faction_code}
					title={formattedName}
					subtitle={formattedSubname}
					onClose={cancel}
					actions={[
						{
							id: "dismiss",
							title: t`Cancel`,
							icon: "dismiss",
							onPress: cancel,
						},
						{
							id: "ok",
							icon: "check",
							primary: true,
							title: okText,
							onPress: select,
						},
					]}
				>
					<Delay delayMs={0} fallback={<C.Loader />}>
						<C.Sections>
							<InvestigatorDescription />
							{signatures.length > 1 && (
								<DataSection
									title={t`Versions`}
									data={signatures}
									selectedId={signatureId}
									onChange={onChangeSignature}
									size={CARD_SIZE}
								/>
							)}
							{skins.length > 1 && (
								<DataSection
									title={t`Skins`}
									data={skins}
									onChange={onChangeSkin}
									selectedId={skinId}
									showIcon={false}
									size={CARD_SIZE}
									showNone
								/>
							)}
						</C.Sections>
					</Delay>
				</C.Card>
			</C.Content>
		</C.Container>
	);
};
