/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput, FlatList, StyleSheet } from 'react-native';

const ApiScreen = () => {
  const [data, setData] = useState([]);   // Estado para armazenar os dados recebidos da API
  const [name, setName] = useState('');   // Estado para armazenar o valor a ser enviado via POST
  const [message, setMessage] = useState(''); // Estado para exibir a resposta do POST

  // Função para consumir o endpoint GET
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/data');  // Substitua pela URL correta
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  // Função para consumir o endpoint POST
  const sendData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      const json = await response.json();
      setMessage(json.message);
      fetchData(); // Atualiza a lista após o envio
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };

  // Carregar os dados ao montar o componente
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Usuários</Text>

      {/* Lista de dados retornados pela API */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
      />

      {/* Campo de input para enviar dados via POST */}
      <TextInput
        style={styles.input}
        placeholder="Digite um nome"
        value={name}
        onChangeText={setName}
      />
      <Button title="Enviar" onPress={sendData} />

      {/* Mensagem de resposta após envio do POST */}
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    marginBottom: 10,
    textAlign: 'center',
  },
  item: {
    fontSize: 18,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
  },
  message: {
    fontSize: 18,
    color: 'green',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default ApiScreen;
