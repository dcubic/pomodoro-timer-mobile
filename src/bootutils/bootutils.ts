import * as Font from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const loadFonts = () =>
  Font.loadAsync({
    "KumbhSans-Bold": require("../../assets/fonts/KumbhSans-Bold.ttf"),
    "RobotoSlab-Bold": require("../../assets/fonts/RobotoSlab-Bold.ttf"),
    "RobotoSlab-Regular": require("../../assets/fonts/RobotoSlab-Regular.ttf"),
    "SpaceMono-Bold": require("../../assets/fonts/SpaceMono-Bold.ttf"),
    "SpaceMono-Regular": require("../../assets/fonts/SpaceMono-Regular.ttf"),
  });

export const loadSettings = async () => {
  try {
    const savedSettings = await AsyncStorage.getItem("userSettings");
    return savedSettings
      ? (JSON.parse(savedSettings) as BootSettings)
      : defaultBootSettings;
  } catch (error) {
    return defaultBootSettings;
  }
};

export interface BootSettings {
  colourSelection: string;
  fontSelection: string;
  timerDurations: {
    active: number;
    shortBreak: number;
    longBreak: number;
  };
}

export const defaultBootSettings: BootSettings = {
  colourSelection: "colour",
  fontSelection: "coral",
  timerDurations: {
    active: 25,
    shortBreak: 5,
    longBreak: 15,
  },
};
