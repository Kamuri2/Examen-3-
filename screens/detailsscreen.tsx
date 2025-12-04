import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types';

// rutas
type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Detalle'>;

const DetailScreen = () => {
  const route = useRoute<DetailScreenRouteProp>();
  const navigation = useNavigation();
  
  // personajes
  const { character } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: character.image }} style={styles.image} />
      <Text style={styles.title}>{character.name}</Text>
      
      <View style={styles.detailsContainer}>
        <Text style={styles.text}>Estado: {character.status}</Text>
        <Text style={styles.text}>Especie: {character.species}</Text>
        <Text style={styles.text}>Género: {character.gender}</Text>
        <Text style={styles.text}>Origen: {character.origin.name}</Text>
      </View>

      <Button title="Volver a la lista" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#a7dda2ff',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  detailsContainer: {
    alignSelf: 'stretch',
    backgroundColor: '#e7d8d8ff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  text: {
    fontSize: 23,
    marginBottom: 5,
    borderRadius: 32,
  },
  button:{
    borderRadius: 23,
  }
});

export default DetailScreen;