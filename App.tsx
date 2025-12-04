// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types'; // Importamos los tipos

// Importamos tus pantallas
import HomeScreen from './screens/Homescreen';
import DetailScreen from './screens/detailsscreen';

// Creamos el Stack con el tipado correcto
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      {/* Aquí se cumple el punto: 
        "Implementa la navegación utilizando React Navigation (Stack)" 
      */}
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen 
          name="Inicio" 
          component={HomeScreen} 
          options={{ title: 'Rick and Morty Characters' }} 
        />
        <Stack.Screen 
          name="Detalle" 
          component={DetailScreen} 
          options={{ title: 'Detalles' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}