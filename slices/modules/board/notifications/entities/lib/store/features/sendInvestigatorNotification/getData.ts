import { selectDeclensedSignatureName } from "@modules/board/base/entities/base/lib";
import { selectBoardById } from "@modules/board/base/shared/lib";
import { select } from "redux-saga/effects";
import type { sendInvestigatorNotification } from "./sendInvestigatorNotification";

type NameType = string | undefined;

type DeclenseCases = "prepositional" | "dative";

type NameProps =
	| `${DeclenseCases}Name`
	| `from${Capitalize<DeclenseCases>}Name`
	| "name"
	| "fromName";

export type NameData = Record<NameProps, NameType>;

export function* getData({
	payload,
}: ReturnType<typeof sendInvestigatorNotification>) {
	const { boardId, sourceBoardId } = payload;

	const dativeSelector = selectDeclensedSignatureName({
		boardId,
		resultCase: "dative",
	});

	const prepositionalSelector = selectDeclensedSignatureName({
		boardId,
		resultCase: "prepositional",
	});

	const selectBoard = selectBoardById(boardId);

	const board: ReturnType<typeof selectBoard> = yield select(selectBoard);

	const { name } = board.investigator;

	const dativeName: ReturnType<typeof dativeSelector> =
		yield select(dativeSelector);

	const prepositionalName: ReturnType<typeof dativeSelector> = yield select(
		prepositionalSelector,
	);

	let fromDativeName: NameType;
	let fromPrepositionalName: NameType;
	let fromName: NameType;

	if (sourceBoardId) {
		const fromDativeSelector = selectDeclensedSignatureName({
			boardId: sourceBoardId,
			resultCase: "dative",
		});

		const fromprepositionalSelector = selectDeclensedSignatureName({
			boardId: sourceBoardId,
			resultCase: "prepositional",
		});

		const fromNameSelector = selectBoardById(sourceBoardId);
		const fromBoard: ReturnType<typeof fromNameSelector> =
			yield select(fromNameSelector);

		fromName = fromBoard.investigator.name;
		fromDativeName = yield select(fromDativeSelector);
		fromPrepositionalName = yield select(fromprepositionalSelector);
	}

	const data: NameData = {
		name,
		dativeName,
		prepositionalName,

		fromName,
		fromDativeName,
		fromPrepositionalName,
	};

	return data;
}
