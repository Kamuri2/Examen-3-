import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, Button, Text, Alert, Image } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker'; // Librería para elegir archivos
import { Audio } from 'expo-av'; // Librería para reproducir audio

import CharacterCard from '../componentes/Charactercard';
import { Character, RootStackParamList } from '../types';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Inicio'>;

// Imagen que usaremos como portada cuando se elija una canción
const MUSIC_COVER_URL = 'https://cdn-icons-png.flaticon.com/512/461/461238.png';

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  
  // Estados para datos de la API
  const [data, setData] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Estados para el AUDIO (Música de fondo)
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [songName, setSongName] = useState<string | null>(null);
  const [hasMusic, setHasMusic] = useState<boolean>(false);

  // Cargar datos de la API
  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character')
      .then((response) => response.json())
      .then((json) => {
        setData(json.results);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  // Limpieza del audio al salir
  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  // Función para elegir y reproducir canción
  const pickAndPlaySong = async () => {
    try {
      // Abrir selector de archivos
      const result = await DocumentPicker.getDocumentAsync({
        type: 'audio/*', 
        copyToCacheDirectory: true,
      });

      if (result.canceled) return;

      const asset = result.assets[0]; 

    
      if (sound) {
        await sound.unloadAsync();
      }

      // Cargar y reproducir el nuevo sonido
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: asset.uri },
        { shouldPlay: true, isLooping: true } 
      );

      setSound(newSound);
      setSongName(asset.name); 
      setHasMusic(true); // imagen
      
    } catch (error) {
      Alert.alert("Error", "No se pudo cargar el audio");
      console.log(error);
    }
  };

  // Función para detener música
  const stopMusic = async () => {
    if (sound) {
      await sound.stopAsync();
      
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      
      
      <View style={styles.musicPlayer}>
        
        <View style={styles.infoContainer}>
          
            {hasMusic ? (
                <Image 
                    source={{ uri: MUSIC_COVER_URL }} 
                    style={styles.coverImage} 
                />
            ) : (
                
                <View style={[styles.coverImage, styles.placeholderCover]}>
                    <Text>🔇</Text>
                </View>
            )}

            <View style={styles.textContainer}>
                <Text style={styles.label}>Reproduciendo:</Text>
                <Text style={styles.musicTitle} numberOfLines={2}>
                {songName ? songName : 'Selecciona una canción...'}
                </Text>
            </View>
        </View>

        <View style={styles.buttonsRow}>
          <Button title="🎵 Elegir Canción" onPress={pickAndPlaySong} />
          <View style={{ width: 10 }} /> 
          <Button title="⏹️ Detener" onPress={stopMusic} color="red" />
        </View>
      </View>

      {/* LISTA DE PERSONAJES */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CharacterCard 
            item={item} 
            onPress={() => navigation.navigate('Detalle', { character: item })} 
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a4d29fff', 
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  
  musicPlayer: {
    padding: 15,
    backgroundColor: '#efe6cfff', 
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 5,
    elevation: 5, 
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  coverImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#999',
  },
  placeholderCover: {
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  musicTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end', 
  }
});

export default HomeScreen;