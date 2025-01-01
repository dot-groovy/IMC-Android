import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, Image, Dimensions, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const { width } = Dimensions.get('window');

// Tela de Calculadora
function CalculadoraScreen({ navigation }) {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');

  const calcularIMC = () => {
    const alturaEmMetros = parseFloat(altura.replace(',', '.'));
    const pesoEmKg = parseFloat(peso.replace(',', '.'));

    if (isNaN(alturaEmMetros) || isNaN(pesoEmKg) || alturaEmMetros <= 0 || pesoEmKg <= 0) {
      alert('Por favor, insira valores válidos para peso e altura.');
      return;
    }

    const imc = pesoEmKg / (alturaEmMetros * alturaEmMetros);
    let categoria = '';
    let imagem = null;

    if (imc < 16) {
      categoria = 'Magreza';
      imagem = require('./assets/magreza.png');
    } else if (imc < 18.5){
      categoria = 'Abaixo do peso'
      imagem = require('./assets/abaixo.png')
    } else if (imc < 24.9) {
      categoria = 'Peso ideal';
      imagem = require('./assets/ideal.png');
    } else if (imc < 29.9) {
      categoria = 'Sobrepeso';
      imagem = require('./assets/sobrepeso.png');
    } else {
      categoria = 'Obesidade';
      imagem = require('./assets/obesidade.png');
    }

    // Navega para a tela de Resultado
    navigation.navigate('Resultado', {
      imc: imc.toFixed(2),
      categoria,
      imagem,
    });
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Indice de Massa Corporal</Text>
      <ImageBackground source={require('./assets/LaunchScreen.jpg')} style={styles.backgroundImage}></ImageBackground>
        <Text style={styles.subtitle}>Calcule sua massa corporal</Text>
        <TextInput
          style={styles.input}
          placeholder="Peso (Kg)"
          keyboardType="numeric"
          value={peso}
          onChangeText={setPeso}
        />
        <TextInput
          style={styles.input}
          placeholder="Altura (m)"
          keyboardType="numeric"
          value={altura}
          onChangeText={setAltura}
        />
        <TouchableOpacity style={styles.button} onPress={calcularIMC}>
          <Text style={styles.buttonText}>Calcular</Text>
        </TouchableOpacity>
    </View>
  );
}

// Tela de Resultado
function ResultadoScreen({ route, navigation }) {
  const { imc, categoria, imagem } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resultado do IMC</Text>
      <Text style={styles.resultValue}>{imc}: {categoria}</Text>
      {imagem && <Image source={imagem} style={styles.resultImage} />}
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

// Configuração do Navegador
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Calculadora">
        <Stack.Screen name="Calculadora" component={CalculadoraScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Resultado" component={ResultadoScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e0f7fa',
    padding: 20,
  },
  backgroundImage: {
    width: '100%',
    height: 350,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginBottom: 20,
  },
    title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00796b',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'normal',
    color: '#00796b',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#00796b',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#00796b',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00796b',
    textAlign: 'center',
    marginBottom: 50,
  },
  resultImage: {
    width: width * 0.8, // 80% da largura da tela
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'contain',
    marginBottom: 20,
  },
});
