import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { FIREBASE_AUTH } from "../firebaseConfig";

const AccountScreen = () => {
  const handleLogout = async () => {
    // try {
    //   await firebase.auth().signOut();
    //   // Redirect or perform any additional logic after successful logout
    // } catch (error) {
    //   console.log('Error during logout:', error);
    // }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account</Text>
      <View style={styles.accountInfoContainer}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.info}>John Doe</Text>
      </View>
      <View style={styles.accountInfoContainer}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.info}>johndoe@example.com</Text>
      </View>
      <View style={styles.accountInfoContainer}>
        <Text style={styles.label}>Phone:</Text>
        <Text style={styles.info}>123-456-7890</Text>
      </View>
      {/* Add more account information here */}
      <Button style={styles.button} onPress={() => FIREBASE_AUTH.signOut()} title='Logout'/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  accountInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    width: 80,
    marginRight: 10,
    fontWeight: 'bold',
  },
  info: {
    flex: 1,
  },
  logoutButton: {
    backgroundColor: '#ff5252',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AccountScreen;
