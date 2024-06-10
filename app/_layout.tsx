import { Stack } from "expo-router";
import { NativeBaseProvider } from "native-base";

export default function RootLayout() {
  return (
    <NativeBaseProvider>
      <Stack>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="task" />
        <Stack.Screen name="viewtask" />
        <Stack.Screen name="addtask" />
        <Stack.Screen name="edittask" />
      </Stack>
    </NativeBaseProvider>
  );
}
