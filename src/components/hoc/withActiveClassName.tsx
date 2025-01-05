import { getDisplayName } from "@/features/hoc/common"
import { PickBoolean } from "@/types/common"
import { PropsWithClassName } from "@/types/ui"
import classNames from "classnames"
import { FC } from "react"

export type WithActiveClassNameOptions<Props extends PropsWithClassName> = {
  Component: FC<Props>
  activeClassName?: string,
  inactiveClassName?: string
  prop: keyof PickBoolean<Props>
}

export const withActiveClassName = <Props extends PropsWithClassName>({
  Component,
  activeClassName,
  inactiveClassName,
  prop
}: WithActiveClassNameOptions<Props>) => {
  const ExtendedComponent = (props: Props) => {
    const isActive = props[prop];

    return (
      <Component
        {...props}
        className={classNames(
          props.className,
          isActive ? activeClassName : inactiveClassName
        )}
      />
    )
  }

  ExtendedComponent.displayName = `WithActiveClassName(${getDisplayName(Component)})`;

  return ExtendedComponent;
}