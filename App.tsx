import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View } from "react-native";
import SettingsIcon from "./assets/icon-settings.svg";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { LinearGradient } from "expo-linear-gradient";
import { Shadow } from "react-native-shadow-2";

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
        <View>
          <Shadow
            distance={100}
            offset={[-50, -50]}
            startColor={"rgba(39, 44, 90, 0.2)"}
            endColor={"rgba(39, 44, 90, 0)"}
            style={styles.borderShadow}
          >
            <Shadow
              distance={100}
              offset={[50, 50]}
              startColor={"rgba(18, 21, 48, 0.3)"}
              endColor={"rgba(18, 21, 48, 0)"}
              style={styles.borderShadow}
            >
              <LinearGradient
                colors={["#0E112A", "#2E325A"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.timerContainer}
              >
                <View style={styles.timerInnerCircle}>
                  <CountdownCircleTimer
                    isPlaying
                    duration={120}
                    colors={"#F87070"}
                    size={248}
                    trailColor="rgba(0, 0, 0, 0)"
                  >
                    {({ remainingTime }) => (
                      <View style={styles.displayContainer}>
                        <Text style={[styles.timeRemainingText]}>
                          {String(Math.floor(remainingTime / 60)).padStart(
                            2,
                            "0"
                          ) +
                            ":" +
                            String(remainingTime % 60).padStart(2, "0")}
                        </Text>
                        <Text style={styles.timerStatusToggleText}>PAUSE</Text>
                      </View>
                    )}
                  </CountdownCircleTimer>
                </View>
              </LinearGradient>
            </Shadow>
          </Shadow>
        </View>
        <Pressable style={styles.optionsButton}>
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
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "column",
    paddingTop: 80,
    paddingBottom: 48,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    color: "#D7E0FF",
    fontWeight: "bold",
    zIndex: 2,
  },
  outerStatusContainer: {
    width: "100%",
    height: 63,
    backgroundColor: "#161932",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 33,
    zIndex: 2,
  },
  nestedStatusContainer: {
    flexDirection: "row",
    height: "100%",
    width: "100%",
    padding: 6,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  statusCapsule: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    height: "100%",
  },
  activeStatus: {
    backgroundColor: "#F87070",
    borderRadius: 100,
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
  timerContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    justifyContent: "center",
    alignItems: "center",
    // zIndex: 2,
  },
  timerInnerCircle: {
    width: 268,
    height: 268,
    borderRadius: 134,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#161932",
  },
  displayContainer: {
    height: "100%",
    width: "100%",
    borderRadius: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  timeRemainingText: {
    color: "#D7E0FF",
    fontSize: 80,
    fontWeight: "bold",
  },
  timerStatusToggleText: {
    color: "#D7E0FF",
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 13,
  },
  borderShadow: {
    zIndex: 1
  },
  optionsButton: {
    zIndex: 2,
  },
});
