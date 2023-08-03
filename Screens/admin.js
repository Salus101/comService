import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  FlatList,
} from "react-native";
import { addDoc, collection, deleteDoc, getDocs, updateDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../firebaseConfig";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const AdminDashboard = () => {
  const [siteName, setSiteName] = useState("");
  const [sitePicture, setSitePicture] = useState("");
  const [siteLocation, setSiteLocation] = useState("");
  const [siteSlots, setSiteSlots] = useState("");
  const [loading, setLoading] = useState(false);
  const [sites, setSites] = useState([]);
  const navigation = useNavigation();

  // Function to fetch the list of community service sites from Firestore
  const fetchSites = async () => {
    setLoading(true);
    try {
      const siteRef = collection(FIREBASE_DB, "communityServiceSites");
      const querySnapshot = await getDocs(siteRef);
      const siteList = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        siteList.push({
          id: doc.id,
          name: data.name,
          picture: data.picture,
          location: data.location,
          slots: data.slots,
        });
      });
      setSites(siteList);
    } catch (error) {
      console.error("Error fetching community service sites: ", error);
    } finally {
      setLoading(false);
    }
  };

  // Call fetchSites function when the component mounts
  useEffect(() => {
    fetchSites();
  }, []);

  // Function to handle site creation
  const handleCreateSite = async () => {
    setLoading(true);
    try {
      const siteRef = collection(FIREBASE_DB, "communityServiceSites");
      const newSite = {
        name: siteName,
        picture: sitePicture,
        location: siteLocation,
        slots: parseInt(siteSlots), // Convert slots to a number (assuming it's a number)
      };
      await addDoc(siteRef, newSite);
      Alert.alert("Site created successfully!");
      // After site creation, fetch the updated site list again
      fetchSites();
      // Clear the input fields
      setSiteName("");
      setSitePicture("");
      setSiteLocation("");
      setSiteSlots("");
    } catch (error) {
      console.error("Error creating site: ", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle site deletion
  const handleDeleteSite = async (siteId) => {
    setLoading(true);
    try {
      const siteRef = doc(collection(FIREBASE_DB, "communityServiceSites"), siteId);
      await deleteDoc(siteRef);
      Alert.alert("Site deleted successfully!");
      // After site deletion, fetch the updated site list again
      fetchSites();
    } catch (error) {
      console.error("Error deleting site: ", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to render each site item in the FlatList
  const renderSiteItem = ({ item }) => {
    return (
      <View style={styles.siteItem}>
        <Text style={styles.siteName}>{item.name}</Text>
        {/* Render other site details here, e.g., location, slots, etc. */}
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteSite(item.id)}
        >
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

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
      <Text style={styles.title}>Admin Dashboard</Text>
      {/* Input fields for creating a new site */}
      {/* ... */}
      <TouchableOpacity style={styles.button} onPress={handleCreateSite}>
        <Text style={styles.buttonText}>Create Site</Text>
      </TouchableOpacity>

      {/* Render the list of community service sites */}
      {loading ? (
        <ActivityIndicator size="small" color="#2877EE" />
      ) : (
        <FlatList
          data={sites}
          renderItem={renderSiteItem}
          keyExtractor={(item) => item.id}
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
    buttonText: {
      color: "white",
      fontSize: 18,
      fontWeight: "bold",
    },
    siteItem: {
      backgroundColor: "white",
      padding: 20,
      borderRadius: 8,
      marginBottom: 10,
      shadowColor: "black",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    siteName: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 5,
    },
    deleteButton: {
      backgroundColor: "red",
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 5,
    },
    deleteButtonText: {
      color: "white",
      fontSize: 18,
      fontWeight: "bold",
    },
    // Additional styles for the FlatList and ActivityIndicator
    listContainer: {
      paddingBottom: 20,
      marginTop: 10,
    },
  });
  

export default AdminDashboard;
