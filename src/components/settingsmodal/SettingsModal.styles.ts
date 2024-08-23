import { StyleSheet } from "react-native";

export default StyleSheet.create({
  modalContainer: {
    flexDirection: "column",
  },
  modalHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#E3E1E1",
  },
  settingsTitleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#161932",
  }, // Need to ensure close button style is correct // probably also needs a larger container
  modalContentContainer: {
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    paddingHorizontal: 24
  },
  settingSectionContainer: {
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    paddingVertical: 24
  },
  optionsSection: {
    paddingVertical: 24,
  },
  optionsSectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 4.23,
    color: "#161932",
    paddingBottom: 14,
    includeFontPadding: false
  },
  timeInputsContainer: {
    width: "100%",
    gap: 8
  },
  modeAndIncrementContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  modeText: {
    includeFontPadding: false,
    fontSize: 14,
    color: "#1E213F",
    opacity: 0.4
  },
  timeAdjustmentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#EFF1FA",
    width: 140,
    height: 40,
    borderRadius: 10
  },
  incrementButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  minutesText: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E213F",
    includeFontPadding: false
  },
  styleButtonsContainer: {
    flexDirection: "row",
    gap: 16
  },
  styleSelectionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EFF1FA",
    justifyContent: "center",
    alignItems: "center"
  }
});
