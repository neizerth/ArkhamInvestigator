import type { BoardId } from "@modules/board/base/shared/model";
import type { AppSelector } from "@shared/model";

export type AbilityCheckerCallback = (boardId: BoardId) => AppSelector<boolean>;

export type AbilityChecker = Record<string, AbilityCheckerCallback>;
