import { Icon, type DefinedIconProps } from "@shared/ui/game"
import type { FC } from "react";

export const withIcon = (icon: string) => {

  const Component: FC<DefinedIconProps> = (props) => {
    return (
      <Icon
        {...props}
        icon={icon}
      />
    )
  }

  const displayName = Component.displayName || Component.name;
  Component.displayName = `WithIcon(${displayName})`
  
  return Component as FC<DefinedIconProps>;
}