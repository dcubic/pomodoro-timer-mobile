import { Modal, View, Text, Pressable } from "react-native";
import { Icon } from 'react-native-elements';
import CloseIcon from "../../../assets/icon-close.svg";
import ArrowDownIcon from "../../../assets/icon-arrow-down.svg";
import ArrowUpIcon from "../../../assets/icon-arrow-up.svg";
import styles from "./SettingsModal.styles";
import Divider from "../divider/Divider";
import colours from "../../constants/colours"

const modeAndMinutes = [
  { mode: "pomodoro", minutes: 25 },
  { mode: "short break", minutes: 5 },
  { mode: "long break", minutes: 15 },
];

export default function SettingsModal() {
  return (
    <Modal transparent={false} visible={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalHeaderContainer}>
          <Text style={styles.settingsTitleText}>Settings</Text>
          <CloseIcon></CloseIcon>
        </View>
        <View style={styles.modalContentContainer}>
          <View style={styles.settingSectionContainer}>
            <Text style={styles.optionsSectionTitle}>TIME (MINUTES)</Text>
            <View style={styles.timeInputsContainer}>
              {modeAndMinutes.map((modeAndMinute) => (
                <View
                  key={modeAndMinute.mode}
                  style={styles.modeAndIncrementContainer}
                >
                  <Text style={styles.modeText}>{modeAndMinute.mode}</Text>
                  <View style={styles.timeAdjustmentContainer}>
                    <Pressable style={styles.incrementButtonContainer}>
                      <ArrowDownIcon />
                    </Pressable>
                    <Text style={styles.minutesText}>
                      {modeAndMinute.minutes}
                    </Text>
                    <Pressable style={styles.incrementButtonContainer}>
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
              <Pressable style={styles.styleSelectionButton}>
                <Text>Aa</Text>
              </Pressable>
              <Pressable style={styles.styleSelectionButton}>
                <Text>Aa</Text>
              </Pressable>
              <Pressable style={styles.styleSelectionButton}>
                <Text>Aa</Text>
              </Pressable>
            </View>
          </View>
          <Divider />
          <View style={styles.settingSectionContainer}>
            <Text style={styles.optionsSectionTitle}>COLOR</Text>
            <View style={styles.styleButtonsContainer}>
              <Pressable style={[styles.styleSelectionButton, styles.coralSelectionButton]}>
                <Icon name="check" type="entypo" color={colours.indigoBlack} size={20} />
              </Pressable>
              <Pressable style={[styles.styleSelectionButton, styles.aquaSelectionButton]}></Pressable>
              <Pressable style={[styles.styleSelectionButton, styles.lilacSelectionButton]}></Pressable>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
