import { modulesReducer } from "@modules/reducer";
import * as reducer from "./features/reducer";

export default {
	...reducer,
	...modulesReducer,
};
