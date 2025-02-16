import { RootLayout } from "@app/ui"
import { Stack } from "expo-router"

export const NewGameLayout = () => {
  return (
    <RootLayout>
      <Stack.Screen
        name="details"
        options={{
          presentation: 'modal'
        }}
      />
    </RootLayout>
  )
} 