import { Modal, View, Text, Pressable } from "react-native";
import { Icon } from "react-native-elements";
import CloseIcon from "../../../assets/icon-close.svg";
import ArrowDownIcon from "../../../assets/icon-arrow-down.svg";
import ArrowUpIcon from "../../../assets/icon-arrow-up.svg";
import styles from "./SettingsModal.styles";
import Divider from "../divider/Divider";
import colours from "../../constants/colours";
import { useState } from "react";
import TimerDurations from "../shared/TimerDurations";
import { saveSettings } from "../../bootutils/bootutils";

const modeDisplayNames = {
  active: "pomodoro",
  shortBreak: "short break",
  longBreak: "long break",
};

const fontNames = ["kumbh sans", "roboto slab", "space mono"];

const colourAndStyles = [
  { colour: "coral", style: styles.coralSelectionButton },
  { colour: "aqua", style: styles.aquaSelectionButton },
  { colour: "lilac", style: styles.lilacSelectionButton },
];

const MINUTES_MAX = 25;
const MINUTES_MIN = 1;

const getFontStyle = (fontName: string) => {
  if (fontName == "kumbh sans") {
    return styles.kumbhSansBold
  }

  if (fontName == "roboto slab") {
    return styles.robotoSlabRegular
  }

  return styles.spaceMonoBold
}

interface SettingsModalProps {
  showSettingsModal: boolean;
  setShowSettingsModal: React.Dispatch<React.SetStateAction<boolean>>;
  colourSelection: string;
  setColourSelection: React.Dispatch<React.SetStateAction<string>>;
  fontSelection: string;
  setFontSelection: React.Dispatch<React.SetStateAction<string>>;
  initialTimerDurations: TimerDurations;
  setInitialTimerDurations: React.Dispatch<
    React.SetStateAction<TimerDurations>
  >;
}

export default function SettingsModal({
  showSettingsModal,
  setShowSettingsModal,
  colourSelection,
  setColourSelection,
  fontSelection,
  setFontSelection,
  initialTimerDurations,
  setInitialTimerDurations,
}: SettingsModalProps) {
  const [tentativeDurations, setTentativeDurations] = useState(
    initialTimerDurations
  );
  const [tentativeColourSelection, setTentativeColourSelection] =
    useState(colourSelection);
  const [tentativeFontSelection, setTentativeFontSelection] =
    useState(fontSelection);

  const incrementDuration = (modeVariableName: string) => {
    setTentativeDurations((oldDurations) => {
      return {
        ...oldDurations,
        [modeVariableName]: Math.min(
          MINUTES_MAX,
          oldDurations[modeVariableName as keyof typeof modeDisplayNames] + 1
        ),
      };
    });
  };

  const decrementDuration = (modeVariableName: string) => {
    setTentativeDurations((oldDurations) => {
      return {
        ...oldDurations,
        [modeVariableName]: Math.max(
          MINUTES_MIN,
          oldDurations[modeVariableName as keyof typeof modeDisplayNames] - 1
        ),
      };
    });
  };

  const applySettingsAndClose = () => {
    setColourSelection(tentativeColourSelection);
    setFontSelection(tentativeFontSelection);
    setInitialTimerDurations(tentativeDurations);
    saveSettings({
      colourSelection: tentativeColourSelection,
      fontSelection: tentativeFontSelection,
      timerDurations: tentativeDurations,
    });
    setShowSettingsModal(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showSettingsModal}
      style={styles.modal}
    >
      <View style={styles.modalContent}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeaderContainer}>
            <Text style={styles.settingsTitleText}>Settings</Text>
            <Pressable
              style={styles.closeIconButton}
              onPress={() => setShowSettingsModal(false)}
            >
              <CloseIcon />
            </Pressable>
          </View>
          <View style={styles.modalContentContainer}>
            <View style={styles.settingSectionContainer}>
              <Text style={styles.optionsSectionTitle}>TIME (MINUTES)</Text>
              <View style={styles.timeInputsContainer}>
                {Object.keys(modeDisplayNames).map((modeVariableName) => (
                  <View
                    key={modeVariableName}
                    style={styles.modeAndIncrementContainer}
                  >
                    <Text style={styles.modeText}>
                      {
                        modeDisplayNames[
                          modeVariableName as keyof typeof modeDisplayNames
                        ]
                      }
                    </Text>
                    <View style={styles.timeAdjustmentContainer}>
                      <Pressable
                        style={styles.incrementButtonContainer}
                        onPress={() => decrementDuration(modeVariableName)}
                      >
                        <ArrowDownIcon />
                      </Pressable>
                      <Text style={styles.minutesText}>
                        {
                          tentativeDurations[
                            modeVariableName as keyof typeof tentativeDurations
                          ]
                        }
                      </Text>
                      <Pressable
                        style={styles.incrementButtonContainer}
                        onPress={() => incrementDuration(modeVariableName)}
                      >
                        <ArrowUpIcon />
                      </Pressable>
                    </View>
                  </View>
                ))}
              </View>
            </View>
            <Divider />
            <View style={styles.settingSectionContainer}>
              <Text style={styles.optionsSectionTitle}>FONT</Text>
              <View style={styles.styleButtonsContainer}>
                {fontNames.map((fontName) => (
                  <Pressable
                    key={fontName}
                    style={[
                      styles.styleSelectionButton,
                      tentativeFontSelection === fontName
                        ? styles.activeFontButton
                        : styles.inactiveFontButton,
                    ]}
                    onPress={() => setTentativeFontSelection(fontName)}
                  >
                    <Text
                      style={[
                        tentativeFontSelection === fontName
                          ? styles.activeFontSelection
                          : styles.inactiveFontSelection,
                        getFontStyle(fontName)
                      ]}
                    >
                      Aa
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
            <Divider />
            <View style={styles.settingSectionContainer}>
              <Text style={styles.optionsSectionTitle}>COLOR</Text>
              <View style={styles.styleButtonsContainer}>
                {colourAndStyles.map(({ colour, style }) => (
                  <Pressable
                    key={colour}
                    style={[styles.styleSelectionButton, style]}
                    onPress={() => setTentativeColourSelection(colour)}
                  >
                    <Icon
                      name="check"
                      type="entypo"
                      color={
                        tentativeColourSelection === colour
                          ? colours.indigoBlack
                          : "transparent"
                      }
                      size={20}
                    />
                  </Pressable>
                ))}
              </View>
            </View>
            <Pressable
              style={styles.applyButton}
              onPress={applySettingsAndClose}
            >
              <Text style={styles.applyButtonText}>Apply</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
