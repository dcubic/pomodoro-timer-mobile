import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View } from "react-native";
import SettingsIcon from "./assets/icon-settings.svg";

export default function App() {
  return (
    <View style={styles.background}>
      <View style={styles.appContainer}>
        <Text style={styles.title}>pomodoro</Text>
        <View style={styles.outerStatusContainer}>
          <View style={styles.nestedStatusContainer}>
            <View style={[styles.statusCapsule, styles.activeStatus]}>
              <Text style={styles.activeStatusText}>pomodoro</Text>
            </View>
            <View style={styles.statusCapsule}>
              <Text style={styles.inactiveStatusText}>short break</Text>
            </View>
            <View style={styles.statusCapsule}>
              <Text style={styles.inactiveStatusText}>long break</Text>
            </View>
          </View>
        </View>
        <View style={styles.timerPlaceholder}>
          <Text>TIMER PLACEHOLDER</Text>
        </View>
        <Pressable>
          <SettingsIcon fill="black" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#1E213F",
    flex: 1,
  },
  appContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "space-between",
    flexDirection: 'column',
    paddingTop: 80,
    paddingBottom: 48,
    paddingHorizontal: 24
  },
  title: {
    fontSize: 24,
    color: '#D7E0FF',
    fontWeight: "bold",
  },
  outerStatusContainer: {
    width: '100%',
    height: 63,
    backgroundColor: "#161932",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 33
  },
  nestedStatusContainer: {
    flexDirection: "row",
    height: "100%",
    width: "100%",
    padding: 6,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center"
  },
  statusCapsule: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    height: "100%"
  },
  activeStatus: {
    backgroundColor: "#F87070",
    borderRadius: 100
  },
  activeStatusText: {
    color: "#1E213F",
    fontSize: 12,
    fontWeight: "bold",
    includeFontPadding: false,
    textAlignVertical: "center",
  },
  inactiveStatusText: {
    color: "#D7E0FF",
    opacity: 0.4,
    fontSize: 12,
    fontWeight: "bold",
    includeFontPadding: false,
    textAlignVertical: "center",
  },
  timerPlaceholder: {
    width: 300,
    height: 300,
    backgroundColor: "red",
    borderRadius: 150
  }
});
