import { selectInvestigatorBoards } from "../board";
import { propEq } from "ramda";
import { AppSelector } from "@shared/lib/store";
import { InvestigatorBoard } from "@shared/model";

export const selectBoardById = (id: number): AppSelector<InvestigatorBoard | undefined> => 
  state => {
    const boards = selectInvestigatorBoards(state);

    return boards.find(propEq(id, 'id'));
  }