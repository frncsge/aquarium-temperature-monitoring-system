import { AuthProvider, useAuth } from "../context/AuthContext.jsx";
import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { Stack, useRouter, useSegments } from "expo-router";

const RootNavigator = () => {
  const { token, authLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (authLoading) return;

    const onLoginScreen = segments[0] === "login";

    if (!token && !onLoginScreen) {
      router.replace("/login");
    }

    if (token && onLoginScreen) {
      router.replace("/");
    }
  }, [token, authLoading, segments]);

  if (authLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} color={"#FFB6C1"} />
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
};

const RootLayout = () => {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
};

export default RootLayout;
