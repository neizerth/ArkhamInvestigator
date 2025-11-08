import {
	selectSkillTestReferenceTitle,
	selectSkillTestSteps,
} from "@modules/mechanics/rules/skill-test-timing/shared/lib";
import { useAppSelector } from "@shared/lib";
import { Delay } from "@shared/ui";
import type { ViewProps } from "react-native";
import * as C from "./SkillTestReference.components";

export type SkillTestReferenceProps = ViewProps;

export const SkillTestReference = (props: SkillTestReferenceProps) => {
	const title = useAppSelector(selectSkillTestReferenceTitle);
	const steps = useAppSelector(selectSkillTestSteps);

	if (!title) {
		return null;
	}

	return (
		<C.Container {...props}>
			<C.Content>
				<C.Title>
					<C.TitleContent>{title}</C.TitleContent>
				</C.Title>
				<Delay>
					<C.Body>{""}</C.Body>
				</Delay>
			</C.Content>
		</C.Container>
	);
};
