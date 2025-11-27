import { selectChaosBagEnabled } from "@modules/chaos-bag/base/entities/lib";
import * as chaosBag from "@modules/chaos-bag/base/shared/lib";
import { ArtworksFragment } from "@modules/core/theme/shared/ui";
import { useAppSelector } from "@shared/lib";
import { useTranslation } from "react-i18next";
import type { ViewProps } from "react-native";
import * as C from "./ChaosBagSettings.components";

export type ChaosBagSettingsProps = ViewProps;

export const ChaosBagSettings = (props: ChaosBagSettingsProps) => {
	const { t } = useTranslation();
	const chaosBagEnabled = useAppSelector(selectChaosBagEnabled);

	return (
		<ArtworksFragment>
			{chaosBagEnabled && (
				<C.Container {...props} title={t`Chaos bag`}>
					<C.Row>
						<C.Checkbox
							label="Chaos bag"
							selector={chaosBag.selectChaosBagEnabledInternal}
							actionCreator={chaosBag.setChaosBagEnabled}
						/>
					</C.Row>
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
					<C.Row>
						<C.Checkbox
							label="Odds"
							selector={chaosBag.selectShowChaosBagOdds}
							actionCreator={chaosBag.setShowChaosBagOdds}
						/>
					</C.Row>
				</C.Container>
			)}
		</ArtworksFragment>
	);
};
