import { StyleSheet } from "react-native";
import colours from "../../constants/colours";

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
    borderBottomColor: colours.dividerGray,
  },
  settingsTitleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: colours.indigoBlack,
  }, // Need to ensure close button style is correct // probably also needs a larger container
  modalContentContainer: {
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    paddingHorizontal: 24,
  },
  settingSectionContainer: {
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    paddingVertical: 24,
  },
  optionsSection: {
    paddingVertical: 24,
  },
  optionsSectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 4.23,
    color: colours.indigoBlack,
    paddingBottom: 14,
    includeFontPadding: false,
  },
  timeInputsContainer: {
    width: "100%",
    gap: 8,
  },
  modeAndIncrementContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modeText: {
    includeFontPadding: false,
    fontSize: 14,
    color: colours.navyBlue,
    opacity: 0.4,
  },
  timeAdjustmentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colours.ghostWhite,
    width: 140,
    height: 40,
    borderRadius: 10,
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
    color: colours.navyBlue,
    includeFontPadding: false,
  },
  styleButtonsContainer: {
    flexDirection: "row",
    gap: 16,
  },
  styleSelectionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  coralSelectionButton: {
    backgroundColor: colours.coral
  },
  aquaSelectionButton: {
    backgroundColor: colours.aqua
  },
  lilacSelectionButton: {
    backgroundColor: colours.lilac
  }
});
