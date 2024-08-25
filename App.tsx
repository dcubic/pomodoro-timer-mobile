import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { useState } from "react";
import SettingsModal from "./src/components/settingsmodal/SettingsModal";
import TimerDashboard from "./src/components/timerdashboard/TimerDashboard";
import colours from "./src/constants/colours";

const BOOT_TIMER_DURATIONS = {
  active: 1,
  shortBreak: 1,
  longBreak: 1,
};

export default function App() {
  const [colourSelection, setColourSelection] = useState("coral");
  const [fontSelection, setFontSelection] = useState("kumbh sans");
  const [initialTimerDurations, setInitialTimerDurations] =
    useState(BOOT_TIMER_DURATIONS);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  return (
    <View style={styles.background}>
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
