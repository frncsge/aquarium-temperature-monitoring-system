import { Text, View, Image, Pressable, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import styles from "../styles/home.styles.js";
import happyFish from "../assets/IMG_1654.jpg";
import sadFish from "../assets/IMG_1655.jpg";

const Home = () => {
  const [aquariums, setAquariums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadAquariums = async () => {
      try {
        const response = await fetch(`http://192.168.1.6:3000/api/aquariums`);
        if (!response.ok) throw new Error(`Request failed: ${response.status}`);

        const data = await response.json();
        setAquariums(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadAquariums();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>Fishball App</Text>
        <Image source={happyFish} style={{ width: 40, height: 40 }}></Image>
      </View>

      {loading ? (
        <View style={styles.noData}>
          <ActivityIndicator
            size={"large"}
            color={"#FFB6C1"}
          ></ActivityIndicator>
        </View>
      ) : aquariums.length > 0 ? (
        <View style={styles.body}>
          {aquariums.map((aquarium) => {
            return (
              <View style={styles.card} key={aquarium.id}>
                <View>
                  <Text style={styles.aquariumName}>{aquarium.name}</Text>
                  <Text style={styles.timeMeasured}>9:22PM</Text>
                </View>
                <Text style={styles.tempTxt}>29°</Text>
              </View>
            );
          })}
        </View>
      ) : (
        <View style={styles.noData}>
          <Image source={sadFish} style={{ width: 80, height: 80 }}></Image>
          <Text>No Aquariums added yet :(</Text>
          <Pressable style={styles.primaryBtn}>
            <Text style={styles.primaryBtnTxt}>+ Add</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default Home;
