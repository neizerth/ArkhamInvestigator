import type { InvestigatorBoardModification } from "../../../../shared/model";
import { CoreBoardModification } from "./core";
import { TheDunwichLegacyBoardModification } from "./dwl";
import { EdgeOfTheEarthBoardModification } from "./eoe";
import { TheFeastOfHemlockValeBoardModification } from "./fhv";
import { TheDrownedCityBoardModification } from "./tdc";
import { TheDreamEatersBoardModification } from "./tde";
import { TheForgottenAgeBoardModificaiton } from "./tfa";

export const CampaignBoardModification: InvestigatorBoardModification = {
	...CoreBoardModification,
	...TheDunwichLegacyBoardModification,
	...TheForgottenAgeBoardModificaiton,
	...EdgeOfTheEarthBoardModification,
	...TheDrownedCityBoardModification,
	...TheDreamEatersBoardModification,
	...TheFeastOfHemlockValeBoardModification,
};
