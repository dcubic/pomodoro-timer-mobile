import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View } from "react-native";
import SettingsIcon from "./assets/icon-settings.svg";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { LinearGradient } from "expo-linear-gradient";
import { Shadow } from "react-native-shadow-2";
import { useCallback, useEffect, useState } from "react";
import { Vibration } from "react-native";
import SettingsModal from "./src/components/settingsmodal/SettingsModal";

const BOOT_TIMER_DURATIONS = {
  active: 1,
  shortBreak: 1,
  longBreak: 1,
};

enum TimerState {
  Active = "pomodoro",
  ShortBreak = "short break",
  LongBreak = "long break",
}

const BOOT_ACTIVE_STATE_COUNT = 4;
const LONG_PRESS_DURATION = 1000;
const VIBRATION_DURATION = 30;

export default function App() {
  const [colourSelection, setColourSelection] = useState("coral");
  const [fontSelection, setFontSelection] = useState("kumbh sans");
  const [initialTimerDurations, setInitialTimerDurations] =
    useState(BOOT_TIMER_DURATIONS);
  console.log(colourSelection);
  console.log(fontSelection);
  console.log(initialTimerDurations);
  
  const [timerDuration, setTimerDuration] = useState(
    BOOT_TIMER_DURATIONS.active
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  const [countBeforeLongBreak, setCountBeforeLongBreak] = useState(
    BOOT_ACTIVE_STATE_COUNT
  );
  const [stateCounter, setStateCounter] = useState(0);
  const [isLongPressing, setIsLongPressing] = useState(false);
  const [longPressTimer, setLongPressTimer] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);
  const [beforePressPlayingState, setBeforePressPlayingState] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const getActiveTimerState = () => {
    if (stateCounter % 2 === 0) {
      return TimerState.Active;
    } else if (
      stateCounter % (2 * countBeforeLongBreak) ===
      2 * countBeforeLongBreak - 1
    ) {
      return TimerState.LongBreak;
    } else {
      return TimerState.ShortBreak;
    }
  };

  const getStatusStyle = (timerState: TimerState) => {
    if (timerState === getActiveTimerState()) {
      return [styles.statusCapsule, styles.activeStatus];
    }

    return styles.statusCapsule;
  };

  const setTimerState = (timerState: TimerState, shouldPlay: boolean) => {
    if (timerState === TimerState.Active) {
      setTimerDuration(initialTimerDurations.active);
    } else if (timerState === TimerState.ShortBreak) {
      setTimerDuration(initialTimerDurations.shortBreak);
    } else {
      setTimerDuration(initialTimerDurations.longBreak);
    }

    setIsPlaying(shouldPlay);
    resetCircleTimer();
  };

  useEffect(() => {
    setTimerState(getActiveTimerState(), stateCounter !== 0);
  }, [stateCounter]);

  const handleTimerCompletion = () => {
    setStateCounter((counterCurrent) => counterCurrent + 1);
  };

  const resetCircleTimer = () => {
    setTimerKey((oldTimerKey) => oldTimerKey + 1);
  };

  const resetPomodoroTimer = () => {
    resetCircleTimer();
    setStateCounter(0);
    setIsPlaying(false);
  };

  const handlePressIn = () => {
    Vibration.vibrate(VIBRATION_DURATION);
    setBeforePressPlayingState(isPlaying);
    const timer = setTimeout(() => {
      resetPomodoroTimer();
      setIsLongPressing(false);
      Vibration.vibrate(VIBRATION_DURATION);
    }, LONG_PRESS_DURATION);
    setLongPressTimer(timer);
    setIsLongPressing(true);
    setIsPlaying(false);
  };

  const handlePressOut = useCallback(() => {
    if (longPressTimer !== null) {
      clearTimeout(longPressTimer);
    }
    setIsLongPressing(false);
    setIsPlaying(!beforePressPlayingState);
  }, [longPressTimer]);

  const getTimerButtonText = () => {
    if (isPlaying) return "PAUSE";
    if (isLongPressing) return "RESTART";
    return "PLAY";
  };

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
      <View style={styles.appContainer}>
        <Text style={styles.title}>pomodoro</Text>
        <View style={styles.outerStatusContainer}>
          <View style={styles.nestedStatusContainer}>
            {Object.values(TimerState).map((timerState) => {
              return (
                <Pressable
                  key={timerState}
                  style={() => getStatusStyle(timerState)}
                >
                  <Text style={styles.activeStatusText}>{timerState}</Text>
                </Pressable>
              );
            })}
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
                    key={timerKey}
                    isPlaying={isPlaying}
                    duration={timerDuration}
                    colors={"#F87070"}
                    size={248}
                    trailColor="rgba(0, 0, 0, 0)"
                    onComplete={handleTimerCompletion}
                  >
                    {({ remainingTime }) => (
                      <Pressable
                        onPressIn={handlePressIn}
                        onPressOut={handlePressOut}
                        style={styles.displayContainer}
                      >
                        <Text style={[styles.timeRemainingText]}>
                          {String(Math.floor(remainingTime / 60)).padStart(
                            2,
                            "0"
                          ) +
                            ":" +
                            String(remainingTime % 60).padStart(2, "0")}
                        </Text>
                        <Text style={styles.timerStatusToggleText}>
                          {getTimerButtonText()}
                        </Text>
                      </Pressable>
                    )}
                  </CountdownCircleTimer>
                </View>
              </LinearGradient>
            </Shadow>
          </Shadow>
        </View>
        <Pressable
          style={styles.optionsButton}
          onPress={() => setShowSettingsModal(true)}
        >
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
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 500,
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
    zIndex: 1,
  },
  optionsButton: {
    justifyContent: "center",
    alignItems: "center",
    aspectRatio: 1,
    minWidth: 32,
    minHeight: 48,
    maxHeight: 48,
    zIndex: 2,
  },
});
