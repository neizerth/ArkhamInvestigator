export type HapticFeedbackType =
	| "selection"
	| "impactLight"
	| "impactMedium"
	| "impactHeavy"
	| "rigid"
	| "soft"
	| "notificationSuccess"
	| "notificationWarning"
	| "notificationError"
	| "clockTick"
	| "contextClick"
	| "keyboardPress"
	| "keyboardRelease"
	| "keyboardTap"
	| "longPress"
	| "textHandleMove"
	| "virtualKey"
	| "virtualKeyRelease"
	| "effectClick"
	| "effectDoubleClick"
	| "effectHeavyClick"
	| "effectTick";

export type VibrationPattern = number | number[];

export type HapticPatternType = HapticFeedbackType | VibrationPattern;

export type HapticMode = 'default' | 'system' | false 