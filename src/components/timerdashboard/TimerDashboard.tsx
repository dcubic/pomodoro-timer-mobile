import { View, Text, Pressable, Vibration } from "react-native";
import styles from "./TimerDashboard.styles";
import { Shadow } from "react-native-shadow-2";
import { LinearGradient } from "expo-linear-gradient";
import {
  ColorFormat,
  CountdownCircleTimer,
} from "react-native-countdown-circle-timer";
import { useCallback, useEffect, useState } from "react";
import TimerDurations from "../shared/TimerDurations";
import SettingsIcon from "../../../assets/icon-settings.svg";
import colours from "../../constants/colours";

enum TimerState {
  Active = "pomodoro",
  ShortBreak = "short break",
  LongBreak = "long break",
}

const BOOT_ACTIVE_STATE_COUNT = 4;
const LONG_PRESS_DURATION = 1000;
const VIBRATION_DURATION = 30;
const SECONDS_PER_MINUTE = 1;
const DROP_SHADOW_OFFSET_MAGNITUDE = 50;
const DROP_SHADOW_RADIUS = 100;
const TIMER_DIAMETER = 248;
const DISPLAY_DIGIT_COUNT = 2;

interface TimerDashboardProps {
  colourSelection: string;
  fontSelection: string;
  initialTimerDurations: TimerDurations;
  setShowSettingsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TimerDashboard({
  colourSelection,
  fontSelection,
  initialTimerDurations,
  setShowSettingsModal,
}: TimerDashboardProps) {
  const [timerDuration, setTimerDuration] = useState(
    initialTimerDurations.active * SECONDS_PER_MINUTE
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
      return [styles.statusCapsule, { backgroundColor: getRequiredColour() }];
    }

    return styles.statusCapsule;
  };

  const setTimerState = (timerState: TimerState, shouldPlay: boolean) => {
    if (timerState === TimerState.Active) {
      setTimerDuration(initialTimerDurations.active * SECONDS_PER_MINUTE);
    } else if (timerState === TimerState.ShortBreak) {
      setTimerDuration(initialTimerDurations.shortBreak * SECONDS_PER_MINUTE);
    } else {
      setTimerDuration(initialTimerDurations.longBreak * SECONDS_PER_MINUTE);
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
    setTimerDuration(initialTimerDurations.active * SECONDS_PER_MINUTE);
    setIsPlaying(false);
  };

  useEffect(() => {
    resetPomodoroTimer();
  }, [initialTimerDurations]);

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

  const getRequiredColour = () => {
    if (colourSelection === "lilac") {
      return colours.lilac;
    }
    if (colourSelection === "aqua") {
      return colours.aqua;
    }

    return colours.coral;
  };

  const getRemainingTimeText = (remainingTime: number) => {
    return (
      String(Math.floor(remainingTime / SECONDS_PER_MINUTE)).padStart(
        DISPLAY_DIGIT_COUNT,
        "0"
      ) +
      ":" +
      String(remainingTime % SECONDS_PER_MINUTE).padStart(
        DISPLAY_DIGIT_COUNT,
        "0"
      )
    );
  };

  const getActiveStatusTextFont = () => {
    if (fontSelection === 'kumbh sans') {
      return styles.kumbhSansBold
    }

    if (fontSelection === 'roboto slab') {
      return styles.robotoSlabBold
    }

    return styles.spaceMonoBold
  }

  const getTimeRemainingFontStyle = () => {
    if (fontSelection === 'kumbh sans') {
      return styles.kumbhSansBold
    }

    if (fontSelection === 'roboto slab') {
      return styles.robotoSlabBold
    }

    return styles.spaceMonoTimeRemaining
  }

  return (
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
                <Text style={[styles.activeStatusText, getActiveStatusTextFont()]}>{timerState}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>
      <View>
        <Shadow
          distance={DROP_SHADOW_RADIUS}
          offset={[
            -DROP_SHADOW_OFFSET_MAGNITUDE,
            -DROP_SHADOW_OFFSET_MAGNITUDE,
          ]}
          startColor={colours.lightTransparentNavy}
          endColor={colours.fullyTransparentNavy}
          style={styles.borderShadow}
        >
          <Shadow
            distance={DROP_SHADOW_RADIUS}
            offset={[
              DROP_SHADOW_OFFSET_MAGNITUDE,
              DROP_SHADOW_OFFSET_MAGNITUDE,
            ]}
            startColor={colours.semiTransparentDarkNavy}
            endColor={colours.fullyTransparentDarkNavy}
            style={styles.borderShadow}
          >
            <LinearGradient
              colors={[colours.midnightBlue, colours.slateGray]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.timerContainer}
            >
              <View style={styles.timerInnerCircle}>
                <CountdownCircleTimer
                  key={timerKey}
                  isPlaying={isPlaying}
                  duration={timerDuration}
                  colors={getRequiredColour() as ColorFormat}
                  size={TIMER_DIAMETER}
                  trailColor={colours.transparent as ColorFormat}
                  onComplete={handleTimerCompletion}
                >
                  {({ remainingTime }) => (
                    <Pressable
                      onPressIn={handlePressIn}
                      onPressOut={handlePressOut}
                      style={styles.displayContainer}
                    >
                      <Text style={[styles.timeRemainingText, getTimeRemainingFontStyle()]}>
                        {getRemainingTimeText(remainingTime)}
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
        <SettingsIcon />
      </Pressable>
    </View>
  );
}
