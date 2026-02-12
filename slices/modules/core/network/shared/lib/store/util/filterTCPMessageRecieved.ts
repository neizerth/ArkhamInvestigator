import { omit } from "ramda";
import { tcpActionReceived } from "../actions";
import { isTCPIncomeAction } from "./isTCPIncomeAction";

export const filterTCPMessageRecieved =
	(messageId: string) => (action: unknown) => {
		if (!tcpActionReceived.match(action)) {
			return false;
		}
		if (!isTCPIncomeAction(action)) {
			return false;
		}
		const isValid = action.payload.messageId === messageId;
		if (!isValid) {
			console.log(
				"INVALID action",
				{
					payload: action.payload,
					meta: omit(["socket"], action.meta),
				},
				messageId,
			);
			return false;
		}
		return isValid;
	};
