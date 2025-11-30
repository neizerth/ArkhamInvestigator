import type { ReferenceSectionStepProps } from "@modules/mechanics/rules/base/shared/ui";
import type { SkillTestStep } from "@modules/mechanics/rules/skill-test-timing/shared/model";
import { Fragment } from "react";
import { stepComponents } from "../../config/components";
import * as C from "./SkillTestReferenceStep.components";

export type SkillTestReferenceStepProps = Omit<
	ReferenceSectionStepProps,
	"title" | "index" | "color"
> & {
	step: SkillTestStep;
};

export const SkillTestReferenceStep = ({
	step,
	...props
}: SkillTestReferenceStepProps) => {
	const Config = stepComponents[step.index] ?? {};
	const { AfterTitle = Fragment, Description = Fragment } = Config;
	return (
		<C.Container {...props} {...step} afterText={<AfterTitle />}>
			{step.type === "step" && (
				<C.Content>
					<C.StepText value={step.text} />
					{Description && <Description />}
				</C.Content>
			)}
		</C.Container>
	);
};
