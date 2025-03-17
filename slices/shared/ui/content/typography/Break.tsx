import { AppText, AppTextProps } from '../AppText';
export type BreakProps = AppTextProps

export const Break = (props: BreakProps) => {
  return (
    <AppText {...props}>{'\n'}</AppText>
  );
}