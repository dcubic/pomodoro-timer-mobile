import { StyleSheet, Dimensions } from "react-native";
import colours from "../../constants/colours";
import { fonts } from "../../constants/fonts";

const windowWidth = Dimensions.get("window").width;

export default StyleSheet.create({
  modal: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "blue",
  },
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flexDirection: "column",
    borderRadius: 15,
    justifyContent: "center",
    backgroundColor: colours.white,
    width: windowWidth - 48,
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
    color: colours.indigoBlack,
    fontFamily: fonts.kumbhSansBold,
  },
  closeIconButton: {
    aspectRatio: 1,
    minHeight: 24,
    maxHeight: 32,
    minWidth: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContentContainer: {
    flexDirection: "column",
    alignItems: "center",
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
    fontFamily: fonts.kumbhSansBold,
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
    fontFamily: fonts.kumbhSansBold,
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
    height: "100%"
  },
  minutesText: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    fontFamily: fonts.kumbhSansBold,
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
    backgroundColor: colours.coral,
  },
  aquaSelectionButton: {
    backgroundColor: colours.aqua,
  },
  lilacSelectionButton: {
    backgroundColor: colours.lilac,
  },
  activeFontButton: {
    backgroundColor: colours.indigoBlack,
    fontSize: 15,
  },
  inactiveFontButton: {
    backgroundColor: colours.ghostWhite,
    fontSize: 15,
  },
  activeFontSelection: {
    color: colours.white,
  },
  inactiveFontSelection: {
    color: colours.navyBlue,
  },
  applyButton: {
    width: 140,
    height: 53,
    backgroundColor: colours.coral,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    transform: [{ translateY: 26.5 }],
  },
  applyButtonText: {
    fontSize: 16,
    color: colours.white,
    fontFamily: fonts.kumbhSansBold,
  },
  kumbhSansBold: {
    fontFamily: fonts.kumbhSansBold
  },
  robotoSlabRegular: {
    fontFamily: fonts.robotoSlabRegular
  },
  spaceMonoBold: {
    fontFamily: fonts.spaceMonoBold
  }
});
