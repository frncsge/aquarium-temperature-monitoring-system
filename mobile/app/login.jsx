import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { TextInput, Pressable, View, Text, Image } from "react-native";
import styles from "../styles/login.styles.js";
import happyFish from "../assets/IMG_1654.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { signIn } = useAuth();
  const API_URL = process.env.EXPO_PUBLIC_API_URL;

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Image source={happyFish} style={styles.formLogo}></Image>
        <View>
          <Text style={styles.formText}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="email@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
          />
        </View>
        <View>
          <Text style={styles.formText}>Password</Text>
          <TextInput style={styles.input} secureTextEntry value={password} />
        </View>
        <Pressable style={styles.loginBtn}>
          <Text style={styles.loginBtnText}>Login</Text>
        </Pressable>
        <Text style={styles.footerText}>© 2026 Fishball</Text>
      </View>
    </View>
  );
};

export default Login;
