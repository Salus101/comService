import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const data = [
  { id: 1, title: "Post 1", content: "This is the first post." },
  { id: 2, title: "Post 2", content: "This is the second post." },
  { id: 3, title: "Post 3", content: "This is the third post." },
  // Add more posts if needed...
];

const Feed = () => {
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text>{item.content}</Text>
      
    </View>
  );

  return (
    <View>
       <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      style={styles.container}
    /> 
    </View>
    
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  itemContainer: {
    backgroundColor: "#f0f0f0",
    padding: 12,
    marginBottom: 8,
    borderRadius: 4,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
});

export default Feed;