/** Matches the failure-reason branch of the TCP send-failed action payload (no entities import). */
export type TcpSendActionFailureReason =
	| { type: "error"; error: Error }
	| { type: "socket-destroyed" }
	| { type: "unknown"; error: unknown };

export function getSendTCPActionFailedDetail(
	payload: TcpSendActionFailureReason,
): string {
	if (payload.type === "error") {
		return payload.error.message;
	}
	if (payload.type === "unknown") {
		return String(payload.error);
	}
	return "socket-destroyed";
}
