import { Image, StyleSheet, Text, View } from "react-native";

export default function AppHeader({ image }) {
  return (
    <View style={styles.header}>
      <Text style={styles.logo}>Fishball</Text>
      <Image source={image} style={{ width: 40, height: 40 }}></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    padding: 15,
  },

  logo: {
    fontSize: 25,
    color: "#FFB6C1",
    fontWeight: "bold",
  },
});
