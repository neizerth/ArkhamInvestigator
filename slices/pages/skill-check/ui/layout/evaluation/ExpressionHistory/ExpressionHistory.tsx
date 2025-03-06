import { ViewProps } from 'react-native';
import * as C from './ExpressionHistory.components';

export type ExpressionHistoryProps = ViewProps;

export const ExpressionHistory = ({
  ...props
}: ExpressionHistoryProps) => {
  return (
    <C.Container {...props}>

    </C.Container>
  );
}