import {
  Text,
  View,
  Image,
  Pressable,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useState, useEffect } from "react";
import styles from "../styles/home.styles.js";
import happyFish from "../assets/IMG_1654.jpg";
import sadFish from "../assets/IMG_1655.jpg";
import AppHeader from "../components/AppHeader.jsx";

const Home = () => {
  const API_URL = process.env.EXPO_PUBLIC_API_URL;

  const [aquariums, setAquariums] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [reload, setReload] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;

    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const loadAquariums = async () => {
      try {
        const response = await fetch(`${API_URL}/api/aquariums`, {
          signal: controller.signal,
        });

        if (!response.ok) throw new Error(`Request failed: ${response.status}`);

        const data = await response.json();
        if (!cancelled) setAquariums(data);
      } catch (error) {
        if (!cancelled) {
          setError(
            controller.signal.aborted
              ? "The server took long to respond."
              : error.message,
          );
        }
      } finally {
        clearTimeout(timeoutId);
        if (!cancelled) {
          setInitialLoading(false);
          setLoading(false);
        }
      }
    };

    loadAquariums();

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [reload]);

  return (
    <View style={styles.container}>
      <AppHeader image={happyFish} />

      {initialLoading ? (
        <View style={styles.noData}>
          <ActivityIndicator
            size={"large"}
            color={"#FFB6C1"}
          ></ActivityIndicator>
        </View>
      ) : (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{ flexGrow: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => {
                setLoading(true);
                setReload((prev) => prev + 1);
              }}
              tintColor={"#FFB6C1"}
            />
          }
        >
          {error ? (
            <View style={styles.noData}>
              <Image source={sadFish} style={{ width: 80, height: 80 }}></Image>
              <Text>{error}</Text>
              <Pressable
                style={styles.primaryBtn}
                onPress={() => {
                  setLoading(true);
                  setReload((prev) => prev + 1);
                }}
              >
                <Text style={styles.primaryBtnTxt}>Retry</Text>
              </Pressable>
            </View>
          ) : aquariums.length === 0 && !initialLoading && !loading ? (
            <View style={styles.noData}>
              <Image source={sadFish} style={{ width: 80, height: 80 }}></Image>
              <Text>No Aquariums added yet :(</Text>
              <Pressable style={styles.primaryBtn}>
                <Text style={styles.primaryBtnTxt}>+ Add</Text>
              </Pressable>
            </View>
          ) : (
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
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default Home;
