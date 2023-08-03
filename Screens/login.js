import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
} from "react-native";

import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from "@react-navigation/native";
import { FIREBASE_DB } from "../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { FIREBASE_AUTH } from "../firebaseConfig";

const colors = {
  primary: '#fff',
  secondary: '#adadad',
  tertiary: '#057afd',
  alternative: '#666',
  fb: '#39559f',
  disabled: 'rgba(5, 122, 253, 0.5)',
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async () => {
    setLoading(true); // Set loading to true before the login process starts
    try {
      const response = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
      // Check the user role and redirect accordingly
      if (response && response.user) {
        const userRef = collection(FIREBASE_DB, "users");
        const querySnapshot = await getDocs(
          query(userRef, where("email", "==", response.user.email))
        );
        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          if (userData.role === "Lecturer") {
            navigation.navigate("admin");
          } else if (userData.role === "Student") {
            navigation.navigate("dash");
          } else {
            console.log("Unknown user role:", userData.role);
            alert("Login failed: Unknown user role");
          }
        } else {
          console.log("User data not found:", response.user.email);
          alert("Login failed: User data not found");
        }
      } else {
        console.log("User not found:", response);
        alert("Login failed: User not found");
      }
    } catch (error) {
      console.error("Login failed: ", error);
      alert("Login failed: " + error.message);
    } finally {
      setLoading(false); // Set loading back to false after the login process is complete
    }
  };
  

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/bgimg.png")}
        style={styles.bgimg}
      ></ImageBackground>
      
      {loading ? (
        // Render the activity indicator while loading is true
        <ActivityIndicator size="large" color="#2877EE" />
      ) : (
        // Render the login form when loading is false
        <>
          <Text style={styles.title}>Log In</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="gray"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="gray"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
          <View style={styles.field1}>
            <Text style={styles.text}>You don't have an account?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('signup')}
              style={styles.button1}
            >
              <Text style={styles.buttonText1}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  
  input: {
    width: "100%",
    height: 40,
    color: "black",
    borderColor: "#2877EE",
    borderWidth: 2,
    borderRadius: 7,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "#2877EE",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  bgimg: {
    flex: 1,
    justifyContent: 'center',
    width: 450, // Specify the desired width in pixels
    height: 1500,
    resizeMode: 'cover',
    position: 'absolute',
    left: 0,
  },
  button1: {
    padding: 15,
  },
  field1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 15,
    color: 'gray',
    fontWeight: 'bold',
  },
  buttonText1: {
    fontWeight: 'bold',
    color: colors.tertiary,
    fontSize: 15,
  },
});

export default Login;
