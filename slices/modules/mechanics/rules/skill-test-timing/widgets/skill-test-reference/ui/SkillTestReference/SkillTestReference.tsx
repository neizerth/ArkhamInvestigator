import {
	selectSkillTestReferenceTitle,
	selectSkillTestSteps,
} from "@modules/mechanics/rules/skill-test-timing/shared/lib";
import type { SkillTestStep } from "@modules/mechanics/rules/skill-test-timing/shared/model";
import { useAppSelector } from "@shared/lib";
import { Delay } from "@shared/ui";
import { useCallback } from "react";
import type { ListRenderItemInfo, ViewProps } from "react-native";
import * as C from "./SkillTestReference.components";

export type SkillTestReferenceProps = ViewProps;

export const SkillTestReference = (props: SkillTestReferenceProps) => {
	const title = useAppSelector(selectSkillTestReferenceTitle);
	const steps = useAppSelector(selectSkillTestSteps);

	if (!title) {
		return null;
	}

	const renderItem = useCallback(
		({ item }: ListRenderItemInfo<SkillTestStep>) => {
			return <C.Step key={item.id} step={item} />;
		},
		[],
	);

	return (
		<C.Container {...props}>
			<C.Content>
				<C.Title>
					<C.TitleContent>{title}</C.TitleContent>
				</C.Title>
				<Delay>
					<C.Body>
						<C.Steps data={steps} renderItem={renderItem} />
					</C.Body>
				</Delay>
			</C.Content>
		</C.Container>
	);
};
