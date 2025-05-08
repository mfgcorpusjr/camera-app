import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerTintColor: "black" }}>
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen name="camera" options={{ headerShown: false }} />
        <Stack.Screen name="[name]" options={{ title: "Media" }} />
      </Stack>
    </SafeAreaProvider>
  );
}
