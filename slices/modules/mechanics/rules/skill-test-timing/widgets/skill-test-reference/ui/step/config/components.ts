import type { FC } from "react";
import { Step1 } from "../ui/step1";
import { Step2 } from "../ui/step2";
import { Step3 } from "../ui/step3";
import { Step4 } from "../ui/step4/Step4";
import { Step5AfterTitle } from "../ui/step5";
import { Step5Description } from "../ui/step5/Step5Description";
import { Step6AfterTitle, Step6Description } from "../ui/step6";

type Config = {
	AfterTitle?: FC;
	Description?: FC;
};

export const stepComponents: Record<number, Config> = {
	0: {
		AfterTitle: Step1,
	},
	2: {
		AfterTitle: Step2,
	},
	4: {
		Description: Step3,
	},
	5: {
		Description: Step4,
	},
	6: {
		AfterTitle: Step5AfterTitle,
		Description: Step5Description,
	},
	7: {
		AfterTitle: Step6AfterTitle,
		Description: Step6Description,
	},
};
