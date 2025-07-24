import { chaosToken } from "@modules/chaos-bag/base/shared/config";
import type { BaseModalAction } from "@modules/core/modal/shared/base/model";

export const ActionId = {
	removeTokens: "kohaku_remove-tokens",
	addBless: "kohaku_add-bless",
	addCurse: "kohaku_remove-bless",
};

const removeTokens: BaseModalAction = {
	id: ActionId.removeTokens,
	title: "-2 [bless] and -2 [curse]",
	close: true,
	style: {
		flexGrow: 3,
		justifyContent: "center",
	},
};

const addBless: BaseModalAction = {
	id: ActionId.addBless,
	title: "+1 [bless]",
	close: true,
	style: {
		backgroundColor: chaosToken.color.types.bless,
		justifyContent: "center",
	},
};

const addCurse: BaseModalAction = {
	id: ActionId.addCurse,
	title: "+1 [curse]",
	close: true,
	style: {
		backgroundColor: chaosToken.color.types.curse,
		justifyContent: "center",
	},
};

export const ModalAction = {
	removeTokens,
	addBless,
	addCurse,
};
