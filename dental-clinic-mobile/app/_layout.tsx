import { useEffect } from "react";
import { useFonts } from "expo-font";
import { StatusBar, View } from "react-native";
import Toast from "react-native-toast-message";
import { Slot, SplashScreen } from "expo-router";

import "./global.css";

const _layout = () => {
  const [fontsLoaded] = useFonts({
    Poppins: require("../assets/fonts/Poppins/Poppins-Regular.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View>
      <StatusBar hidden />
      <Toast />
      <Slot />
    </View>
  );
};

export default _layout;
