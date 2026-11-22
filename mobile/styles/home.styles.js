import { StyleSheet } from "react-native";

const colors = {
  primaryColor: "#FFB6C1",
  cardColor: "#F0F0F0",
  mutedColor: "#6B7280",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  body: {
    flex: 1,
    paddingHorizontal: 15,
    gap: 10,
  },

  noData: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  primaryBtn: {
    backgroundColor: colors.primaryColor,
    padding: 8,
    marginTop: 15,
    borderRadius: 5,
  },

  primaryBtnTxt: {
    fontWeight: "bold",
    color: "white",
  },

  aquariumName: {
    fontSize: 20,
    fontWeight: "bold",
  },

  card: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",

    padding: 15,

    backgroundColor: colors.cardColor,
    borderRadius: 15,
  },

  timeMeasured: {
    color: colors.mutedColor,
  },

  tempTxt: {
    fontSize: 40,
  },
});

export default styles;
