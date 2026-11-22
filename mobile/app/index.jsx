import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import happyFish from "../assets/IMG_1654.jpg";
import sadFish from "../assets/IMG_1655.jpg";

const colors = {
  primaryColor: "#FFB6C1",
  borderColor: "#F0F0F0",
};

const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>Fishball App</Text>
        <Image source={happyFish} style={{ width: 40, height: 40 }}></Image>
      </View>

      <View style={styles.body}>
        <View style={styles.noData}>
          <Image source={sadFish} style={{ width: 80, height: 80 }}></Image>
          <Text>No Aquariums added yet :(</Text>
          <Pressable style={styles.primaryBtn}>
            <Text style={styles.primaryBtnTxt}>+ Add</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 3,

    paddingHorizontal: 15,
    paddingVertical: 25,

    borderBottomWidth: 1,
    borderColor: colors.borderColor,
  },

  logo: {
    fontSize: 25,
    color: colors.primaryColor,
    fontWeight: "bold",
  },

  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  noData: {
    display: "flex",
    alignItems: "center",
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
});
