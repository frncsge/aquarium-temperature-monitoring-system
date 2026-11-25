import { StyleSheet } from "react-native";
import colors from "./colors.js";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.secondaryColor,
  },
  form: {
    padding: 20,
    width: "90%",
    maxWidth: 300,
    gap: 15,
  },
  formLogo: {
    marginHorizontal: "auto",
    width: 80,
    height: 80,
  },
  input: {
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 5,
    borderColor: colors.primaryColor,
  },
  formText: {
    fontWeight: "bold",
    color: colors.primaryColor,
  },
  loginBtn: {
    backgroundColor: colors.primaryColor,
    padding: 13,
    borderRadius: 5,
    marginTop: 10,
  },
  loginBtnText: {
    color: colors.secondaryColor,
    fontWeight: "bold",
    textAlign: "center",
  },
  footerText: {
    color: colors.mutedColor,
    textAlign: "center",
    marginTop: 20,
  },
});

export default styles;
