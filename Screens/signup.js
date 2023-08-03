import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  Alert,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { FIREBASE_DB } from "../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [ role, setRole ] = useState("")
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [phoneNumberError, setPhoneNumberError] = useState("");



  const handleSignup = async () => {
    setLoading(true);
    try {
      // Validate Role
      if (role !== "Lecturer" && role !== "Student") {
        throw new Error("Role must be either 'Lecturer' or 'Student'");
      }
  
      // Validate Phone Number
      if (!/^\d{10}$/.test(phoneNumber)) {
        throw new Error("Phone number must be exactly 10 digits");
      }
  
      const response = await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );
      const userRef = collection(FIREBASE_DB, "users");
      const newUser = {
        email: email,
        username: username,
        role: role,
        phoneNumber: phoneNumber,
        password: password,
      };
  
      await addDoc(userRef, newUser);
  
      console.log(response);
      // Successful registration, show "Check your email" alert
      Alert.alert(
        "Click okay to be redirected to login",
        "You have successfully registered",
        [
          {
            text: "Okay",
            onPress: () => navigation.navigate("login"), // Navigate to the login page
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      // Error handling...
      alert("Sign up failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/bgimg.png")}
        style={styles.bgimg}
      ></ImageBackground>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={"gray"}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
       <TextInput
        style={styles.input}
        placeholder="Lecturer or Student"
        placeholderTextColor={"gray"}
        value={role}
        onChangeText={(text) => setRole(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor={"gray"}
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        placeholderTextColor={"gray"}
        keyboardType="phone-pad" // Set the keyboard type to numeric for phone numbers
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={"gray"}
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
    
      {loading ? (
        <ActivityIndicator size="small" color="#2877EE" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      )}
      <View style={styles.field1}>
        <Text style={styles.text}>Already Have an Account?</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('login')}
          style={styles.button1}
        >
          <Text style={styles.buttonText1}> Log In</Text>
        </TouchableOpacity>
      </View>
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
    color: "black",
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
  button1: {
    padding: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  bgimg: {
    flex: 1,
    justifyContent: "center",
    width: 450,
    height: 1500,
    resizeMode: "cover",
    position: "absolute",
    left: 0,
  },
  field1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  text: {
    fontSize: 15,
    color: 'gray',
    fontWeight: 'bold',
  },
  buttonText1: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#2877EE',
  },
});

export default Signup;