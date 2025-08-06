import { fork } from "redux-saga/effects";
import { TheDunwichLegacyInvestigatorAbilitySaga as TheDunwichLegacySaga } from "./dwl";
import { EdgeOfTheEarthInvestigatorAbilitySaga as EdgeOfTheEarthSaga } from "./eoe";
import { TheFeastOfHemlockValeInvestigatorAbilitySaga as TheFeastOfHemlockValeSaga } from "./fhv";
import { ThePathToCarcosaInvestigatorAbilitySaga as ThePathToCarcosaSaga } from "./ptc";
import { TheCircleUndoneInvestigatorAbilitySaga as TheCircleUndoneSaga } from "./tcu";
import { TheDrownedCityInvestigatorAbilitySaga as TheDrownedCitySaga } from "./tdc";
import { TheForgottenAgeInvestigatorAbilitySaga as TheForgottenAgeSaga } from "./tfa";
import { TheInnsmouthConspiracyInvestigatorAbilitySaga as TheInnsmouthConspiracySaga } from "./tic";
import { TheScarletKeysInvestigatorAbilitySaga as TheScarletKeysSaga } from "./tsk";

export function* campaignsInvestigatorAbilitySaga() {
	yield fork(TheDunwichLegacySaga);
	yield fork(ThePathToCarcosaSaga);
	yield fork(TheForgottenAgeSaga);
	yield fork(TheCircleUndoneSaga);

	yield fork(TheInnsmouthConspiracySaga);

	yield fork(EdgeOfTheEarthSaga);
	yield fork(TheScarletKeysSaga);
	yield fork(TheFeastOfHemlockValeSaga);
	yield fork(TheDrownedCitySaga);
}
