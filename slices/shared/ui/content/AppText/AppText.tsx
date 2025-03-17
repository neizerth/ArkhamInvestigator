import { Text, TextProps } from "react-native";

export type AppTextProps = Omit<TextProps, 'allowFontScaling'>

export const AppText = (props: AppTextProps) => {
  return (
    <Text
      {...props}
      allowFontScaling={false}
    />
  );
}