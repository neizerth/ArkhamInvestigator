import { selectChaosBagSkillCheckType } from "@modules/chaos-bag/reveal/base/shared/lib";
import { iconMapping } from "@shared/config";
import { useAppSelector } from "@shared/lib";
import type { ViewProps } from "react-native";
import * as C from "./ChaosBagButtonLastRevealIcon.components";

export type ChaosBagButtonLastRevealIconProps = ViewProps;

export const ChaosBagButtonLastRevealIcon = (
	props: ChaosBagButtonLastRevealIconProps,
) => {
	const type = useAppSelector(selectChaosBagSkillCheckType);
	const icon = type && iconMapping.stat.simple[type];
	return (
		<C.Container {...props}>
			{icon ? <C.SkillType icon={icon} /> : <C.NoType />}
		</C.Container>
	);
};
