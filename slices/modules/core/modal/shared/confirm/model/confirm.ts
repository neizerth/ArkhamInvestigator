import type { I18NText } from "@modules/core/i18n/shared/model";
import type { BaseModalData } from "../../base/model";

export type ConfirmModalData<Action> = BaseModalData<Action> & {
	text: I18NText;
};
