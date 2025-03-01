import { type WithBackgroundComponentProps, withImageBackground } from '@shared/lib/hoc';

const source = require('./images/action.png');

export type ActionProps = WithBackgroundComponentProps

export const Action = withImageBackground({ source });