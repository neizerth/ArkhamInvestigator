import { chaosBagPrefix } from "@modules/chaos-bag/base/shared/config";
import { createAction } from "@reduxjs/toolkit";

export const clearChaosBag = createAction(`${chaosBagPrefix}/clear`);
