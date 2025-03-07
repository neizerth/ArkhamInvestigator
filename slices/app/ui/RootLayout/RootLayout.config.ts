import { color } from "@shared/config";
import { Stack } from "expo-router"
import { FC } from "react"

 type StackProps = typeof Stack extends FC<infer Props> ? Props: never;
 
 export const screenOptions: StackProps['screenOptions'] = { 
  headerShown: false,
  contentStyle: {
    backgroundColor: 'transparent'
  }
}