import { selectInvestigatorBoards } from "../board";
import { propEq } from "ramda";
import type { AppSelector } from "@shared/lib/store";
import type { InvestigatorBoard } from "@shared/model";

export const selectBoardById = (id: number): AppSelector<InvestigatorBoard | undefined> => 
  state => {
    const boards = selectInvestigatorBoards(state);

    return boards.find(propEq(id, 'id'));
  }