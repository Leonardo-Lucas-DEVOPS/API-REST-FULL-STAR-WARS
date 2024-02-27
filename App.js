import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

const request = async (callback) => {
  try {
    const response = await fetch('https://swapi.dev/api/people/');
    const parsed = await response.json();
    callback(parsed.results);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export default function App() {
  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    request(setRegistros);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>API STAR WARS</Text>
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={registros}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.nameText}>Nome: {item.name}</Text>
            <Text style={styles.eyeColorText}>Cor dos Olhos: {item.eye_color}</Text> 
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 20,
  },
  listContainer: {
    paddingHorizontal: 20,
    width: 400,
    backgroundColor: 'grey',
  },
  itemContainer: {
    marginBottom: 20,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  eyeColorText: {
    fontSize: 16,
  },
});
