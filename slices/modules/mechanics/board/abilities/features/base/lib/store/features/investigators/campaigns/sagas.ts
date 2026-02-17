import { fork } from "redux-saga/effects";
import { CoreGameAbilitySaga } from "./core/sagas";
import { Core2026AbilitySaga as Core2026Saga } from "./core2026/sagas";
import { TheDunwichLegacyInvestigatorAbilitySaga as TheDunwichLegacySaga } from "./dwl/sagas";
import { EdgeOfTheEarthInvestigatorAbilitySaga as EdgeOfTheEarthSaga } from "./eoe/sagas";
import { TheFeastOfHemlockValeInvestigatorAbilitySaga as TheFeastOfHemlockValeSaga } from "./fhv/sagas";
import { ThePathToCarcosaInvestigatorAbilitySaga as ThePathToCarcosaSaga } from "./ptc/sagas";
import { TheCircleUndoneInvestigatorAbilitySaga as TheCircleUndoneSaga } from "./tcu/sagas";
import { TheDrownedCityInvestigatorAbilitySaga as TheDrownedCitySaga } from "./tdc/sagas";
import { TheDreamEatersInvestigatorAbilitySaga as TheDreamEatersSaga } from "./tde/sagas";
import { TheForgottenAgeInvestigatorAbilitySaga as TheForgottenAgeSaga } from "./tfa/sagas";
import { TheInnsmouthConspiracyInvestigatorAbilitySaga as TheInnsmouthConspiracySaga } from "./tic/sagas";
import { TheScarletKeysInvestigatorAbilitySaga as TheScarletKeysSaga } from "./tsk/sagas";

export function* campaignsInvestigatorAbilitySaga() {
	yield fork(CoreGameAbilitySaga);
	yield fork(TheDunwichLegacySaga);
	yield fork(ThePathToCarcosaSaga);
	yield fork(TheForgottenAgeSaga);
	yield fork(TheCircleUndoneSaga);

	yield fork(TheDreamEatersSaga);
	yield fork(TheInnsmouthConspiracySaga);

	yield fork(EdgeOfTheEarthSaga);
	yield fork(TheScarletKeysSaga);
	yield fork(TheFeastOfHemlockValeSaga);
	yield fork(TheDrownedCitySaga);
	yield fork(Core2026Saga);
}
