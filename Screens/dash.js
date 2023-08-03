import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { sampleData } from "../Screens/sampleData";

const Dash = () => {
  const navigation = useNavigation();
  const [selectedItem, setSelectedItem] = useState(null);

  const handleCardPress = (item) => {
    setSelectedItem(item);
  };

  const handleBackToDashboard = () => {
    setSelectedItem(null); // Reset selectedItem state to null to go back to dashboard view
  };

  const handleBookSlot = () => {
    Alert.alert(
      "Book Slot",
      "Would you like to book a slot?",
      [
        {
          text: "No",
          onPress: () => {
            console.log("User chose not to book a slot");
            setSelectedItem(null); // Reset the selectedItem state to null
          },
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            // Reduce the number of slots by 1
            if (selectedItem.slots > 0) {
              const updatedSelectedItem = { ...selectedItem, slots: selectedItem.slots - 1 };
              setSelectedItem(updatedSelectedItem);
              navigation.navigate('booking', { organization: updatedSelectedItem });
            } else {
              // Show an alert if there are no slots available
              Alert.alert("No Slots Available", "There are no slots available for booking.");
            }
          },
        },
      ],
      { cancelable: true }
    );
  };
  
  

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleCardPress(item)}>
      <Image source={{ uri: item.uri }} style={styles.image} />
      <Text style={styles.name}>{item.title}</Text>
      <Text style={styles.location}>Description: {item.description}</Text>
      <Text style={styles.slots}>Slots: {item.slots}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.iconsContainer}>
        <TouchableOpacity>
          <View style={styles.iconContainer}>
            <Ionicons name="menu-outline" size={24} color="black" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("account")}>
          <View style={styles.iconContainer}>
            <AntDesign name="user" size={24} color="black" />
          </View>
        </TouchableOpacity>
      </View>

      {selectedItem ? (
        <View style={styles.selectedCard}>
          <Image source={{ uri: selectedItem.uri }} style={styles.image} />
          <Text style={styles.name}>{selectedItem.title}</Text>
          <Text style={styles.location}>Description: {selectedItem.description}</Text>
          <Text style={styles.slots}>Slots: {selectedItem.slots}</Text>
          <TouchableOpacity style={styles.bookSlotButton} onPress={handleBookSlot}>
            <Text style={styles.bookSlotButtonText}>Book Slot</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bookSlotButton} onPress={handleBackToDashboard}>
            <Text style={styles.bookSlotButtonText}>Back to dashboard</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={sampleData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 10,
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  iconContainer: {
    backgroundColor: "#e0e0e0",
    borderRadius: 20,
    padding: 10,
  },
  listContainer: {
    paddingBottom: 20,
    marginTop: 10,
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  location: {
    fontSize: 16,
    marginBottom: 3,
  },
  slots: {
    fontSize: 16,
    color: "gray",
  },
  image: {
    width: 315,
    height: 100,
    borderRadius: 8,
    marginBottom: 10, 
  },
  selectedCard: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    alignItems: "center",
  },
  bookSlotButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  bookSlotButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Dash;
