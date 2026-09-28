import type { AppTheme } from "@shared/model";

declare module "styled-components" {
	export interface DefaultTheme extends AppTheme {}
}

declare module "styled-components/native" {
	export interface DefaultTheme extends AppTheme {}
}
