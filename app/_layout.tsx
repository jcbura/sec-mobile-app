import Header from "@/components/Header";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    Teko: require("../assets/fonts/Teko-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        animation: "none",
        gestureEnabled: false,
        header: () => <Header />,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="[param]" />
    </Stack>
  );
}
