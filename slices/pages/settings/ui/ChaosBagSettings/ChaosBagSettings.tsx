import * as chaosBag from "@modules/chaos-bag/base/shared/lib";
import * as chaosOdds from "@modules/chaos-bag/odds/shared/lib";
import { ArtworksFragment } from "@modules/core/theme/shared/ui";
import { useAppSelector } from "@shared/lib";
import { useTranslation } from "react-i18next";
import type { ViewProps } from "react-native";
import * as C from "./ChaosBagSettings.components";

export type ChaosBagSettingsProps = ViewProps;

export const ChaosBagSettings = (props: ChaosBagSettingsProps) => {
	const { t } = useTranslation();
	const chaosBagEnabled = useAppSelector(
		chaosBag.selectChaosBagEnabledInternal,
	);

	return (
		<ArtworksFragment>
			<C.Section {...props} title={t`Chaos bag`}>
				<C.Row>
					<C.Checkbox
						label="chaosBag.enabled"
						selector={chaosBag.selectChaosBagEnabledInternal}
						actionCreator={chaosBag.setChaosBagEnabled}
					/>
				</C.Row>
				{chaosBagEnabled && (
					<>
						<C.Row>
							<C.Checkbox
								label="Chaos bag loading animation"
								selector={chaosBag.selectChaosBagLoadingAnimation}
								actionCreator={chaosBag.setChaosBagLoadingAnimation}
							/>
						</C.Row>
						<C.Row>
							<C.Checkbox
								label="Unlimited chaos tokens"
								selector={chaosBag.selectUnlimitedChaosTokens}
								actionCreator={chaosBag.setUnlimitedChaosTokens}
							/>
						</C.Row>
						<C.Row>
							<C.Checkbox
								label="Modify tokens"
								selector={chaosBag.selectModifyChaosTokens}
								actionCreator={chaosBag.setModifyChaosTokens}
							/>
						</C.Row>
						<C.Row>
							<C.Checkbox
								label="Difficulty picker"
								selector={chaosBag.selectShowDifficulty}
								actionCreator={chaosBag.setShowDifficulty}
							/>
						</C.Row>
					</>
				)}
			</C.Section>
			{chaosBagEnabled && (
				<C.Section {...props} title={t`Chaos Odds`}>
					<C.Row>
						<C.Checkbox
							label="chaosOdds.enabled"
							selector={chaosOdds.selectShowChaosBagOdds}
							actionCreator={chaosOdds.setShowChaosBagOdds}
						/>
					</C.Row>
					<C.Row>
						<C.Checkbox
							label="chaosOdds.skillOdds"
							selector={chaosOdds.selectShowSkillOdds}
							actionCreator={chaosOdds.setShowSkillOdds}
						/>
					</C.Row>
					<C.Row>
						<C.Checkbox
							label="chaosOdds.pinnedCalculationOdds"
							selector={chaosOdds.selectShowPinnedCalculationOdds}
							actionCreator={chaosOdds.setShowPinnedCalculationOdds}
						/>
					</C.Row>
				</C.Section>
			)}
		</ArtworksFragment>
	);
};
