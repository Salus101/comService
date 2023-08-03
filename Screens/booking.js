import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from '@expo/vector-icons';
import { FIREBASE_AUTH } from "../firebaseConfig";

const Booking = ({ route }) => {
  const { organization } = route.params;
  const navigation = useNavigation();

  const handleCancelBooking = () => {
    Alert.alert(
      "Cancel Booking",
      "Would you like to cancel booking?",
      [
        {
          text: "No",
          onPress: () => {
            console.log("User chose not to cancel booking");
            // Do nothing if the user clicks "No" on the alert
          },
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            // If the user clicks "Yes," navigate back to the dashboard
            navigation.navigate("dash");
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("account")}
        style={styles.iconContainer}
      >
       <Feather name="log-out" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.bookingDetailsContainer}>
        <Text style={styles.title}>Booking Details</Text>
        <Text style={styles.text}>Organization: {organization.title}</Text>
        <Text style={styles.text}>Description: {organization.description}</Text>
        <Text style={styles.text}>Slots: {organization.slots}</Text>
        <Text style={styles.text}>Booking confirmed for 1 slot!</Text>

        <TouchableOpacity style={styles.cancelButton} onPress={handleCancelBooking}>
          <Text style={styles.cancelButtonText}>Cancel Booking</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center", // Center the contents horizontally
    justifyContent: "center", // Center the contents vertically
  },
  iconContainer: {
    position: "absolute",
    top: 40,
    right: 30,
    backgroundColor: "#e0e0e0",
    borderRadius: 20,
    padding: 10,
  },
  bookingDetailsContainer: {
    alignItems: "center", // Center the contents horizontally
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  cancelButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  cancelButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Booking;
