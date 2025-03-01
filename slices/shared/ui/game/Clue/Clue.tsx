import { type WithBackgroundComponentProps, withImageBackground } from '@shared/lib/hoc';

const source = require('./images/clue.png');

export type ClueProps = WithBackgroundComponentProps;
export const Clue = withImageBackground({ source });