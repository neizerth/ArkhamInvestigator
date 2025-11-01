import { assetsDownloaderReducer } from "./assets/asset-downloader/shared/lib";
import { assetsReducer } from "./assets/base/shared/lib";
import { downloadQueueReducer } from "./assets/download-queue/shared/lib";
import { controlReducer } from "./control/reducer";
import { deviceReducer } from "./device/shared/lib";
import { hapticReducer } from "./haptic/shared/lib";
import { i18nReducer } from "./i18n/shared/lib";
import { modalReducer } from "./modal/shared/base/lib";
import { routerReducer } from "./router/shared/lib";
import { soundReducer } from "./sound/shared/lib";
import { themeReducer } from "./theme/shared/lib";

export const coreModulesReducer = {
	...deviceReducer,
	...assetsReducer,
	...assetsDownloaderReducer,
	...i18nReducer,
	...hapticReducer,
	...modalReducer,
	...soundReducer,
	...downloadQueueReducer,
	...routerReducer,
	...controlReducer,
	...themeReducer,
};
