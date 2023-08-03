// UserDashboard.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UserDashboard = ({ bookedLocation }) => {
  return (
    <View style={styles.container}>
      {bookedLocation ? (
        <Text style={styles.dashboardText}>You have booked a slot at: {bookedLocation}</Text>
      ) : (
        <Text style={styles.dashboardText}>No bookings yet.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 10,
  },
  dashboardText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default UserDashboard;
