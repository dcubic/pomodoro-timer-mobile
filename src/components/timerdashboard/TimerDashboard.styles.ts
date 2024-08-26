import { StyleSheet } from "react-native";
import colours from "../../constants/colours";
import { fonts } from "../../constants/fonts";

export default StyleSheet.create({
  background: {
    backgroundColor: colours.navyBlue,
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
    color: colours.periwinkle,
    fontFamily: fonts.kumbhSansBold,
    zIndex: 2,
  },
  outerStatusContainer: {
    width: "100%",
    height: 63,
    backgroundColor: colours.indigoBlack,
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
    borderRadius: 100,
  },
  activeStatusText: {
    color: colours.navyBlue,
    fontSize: 12,
    includeFontPadding: false,
    textAlignVertical: "center",
  },
  inactiveStatusText: {
    color: colours.periwinkle,
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
    backgroundColor: colours.indigoBlack,
  },
  displayContainer: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 500,
  },
  timeRemainingText: {
    color: colours.periwinkle,
    fontSize: 80,
  },
  timerStatusToggleText: {
    color: colours.periwinkle,
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
  kumbhSansBold: {
    fontFamily: fonts.kumbhSansBold
  },
  robotoSlabBold: {
    fontFamily: fonts.robotoSlabBold
  },
  spaceMonoRegular: {
    fontFamily: fonts.spaceMonoRegular
  },
  spaceMonoBold: {
    fontFamily: fonts.spaceMonoBold
  },
  spaceMonoTimeRemaining: {
    fontFamily: fonts.spaceMonoRegular,
    letterSpacing: -6
  }
});
