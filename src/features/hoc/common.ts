import { FC } from "react";

export const getDisplayName = <T>(Component: FC<T>) => Component.displayName || Component.name || 'Component'