import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";

import SettingsModal from "./src/components/settingsmodal/SettingsModal";
import TimerDashboard from "./src/components/timerdashboard/TimerDashboard";
import colours from "./src/constants/colours";
import {
  loadFonts,
  loadSettings,
  defaultBootSettings,
} from "./src/utils/bootutils";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [colourSelection, setColourSelection] = useState(
    defaultBootSettings.colourSelection
  );
  const [fontSelection, setFontSelection] = useState(
    defaultBootSettings.fontSelection
  );
  const [initialTimerDurations, setInitialTimerDurations] = useState(
    defaultBootSettings.timerDurations
  );

  useEffect(() => {
    const loadFontsAndSettings = async () => {
      try {
        const [_, loadedSettings] = await Promise.all([
          loadFonts(),
          loadSettings(),
        ]);
        setColourSelection(loadedSettings.colourSelection);
        setFontSelection(loadedSettings.fontSelection);
        setInitialTimerDurations(loadedSettings.timerDurations);
      } catch (error) {
        console.warn(error);
      } finally {
        setIsAppReady(true);
      }
    };

    loadFontsAndSettings();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isAppReady) {
      await SplashScreen.hideAsync();
    }
  }, [isAppReady]);

  if (!isAppReady) {
    return null;
  }

  return (
    <View style={styles.background} onLayout={onLayoutRootView}>
      <StatusBar style="light" />
      <SettingsModal
        showSettingsModal={showSettingsModal}
        setShowSettingsModal={setShowSettingsModal}
        colourSelection={colourSelection}
        setColourSelection={setColourSelection}
        fontSelection={fontSelection}
        setFontSelection={setFontSelection}
        initialTimerDurations={initialTimerDurations}
        setInitialTimerDurations={setInitialTimerDurations}
      ></SettingsModal>
      <TimerDashboard
        colourSelection={colourSelection}
        fontSelection={fontSelection}
        initialTimerDurations={initialTimerDurations}
        setShowSettingsModal={setShowSettingsModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: colours.navyBlue,
    flex: 1,
  },
});
