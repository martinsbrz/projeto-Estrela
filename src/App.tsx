import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, Text, TextInput, Button, View, StyleSheet } from 'react-native';

const API_URL = 'http://192.168.1.5:5000'; // Certifique-se de usar o endereço correto para o backend

interface User {
  id: number;
  name: string;
  age: number;
}

const App = () => {
  const [data, setData] = useState<User[]>([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Função para buscar usuários da API SQLite
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/users`);
      const json = await response.json();
      setData(json.users); // Definindo a resposta da API no estado
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  // Função para adicionar usuário na API SQLite
  const addUser = async () => {
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, age: parseInt(age) }),
      });

      if (response.ok) {        
        fetchUsers(); // Atualiza a lista após adicionar
        setName(''); // Limpa os campos
        setAge('');
      }
    } catch (error) {
      console.error('Erro ao adicionar usuário:', error);
    }
  };

  // Função para atualizar usuário na API SQLite
  const updateUser = async () => {
    if (selectedUser) {
      try {
        const response = await fetch(`${API_URL}/users/${selectedUser.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, age: parseInt(age) }),
        });

        if (response.ok) {          
          setSelectedUser(null); // Limpar seleção
          fetchUsers(); // Atualiza a lista após atualizar
          setName(''); // Limpa os campos
          setAge('');
        }
      } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
      }
    }
  };

  // Função para deletar usuário na API SQLite
  const deleteUser = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {        
        fetchUsers(); // Atualiza a lista após deletar
      }
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
    }
  };

  // Carregar usuários ao montar o componente
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.item}>{item.name} (Idade: {item.age})</Text>
            <Button title="Deletar" onPress={() => deleteUser(item.id)} />
            <Button title="Editar" onPress={() => {
              setSelectedUser(item);
              setName(item.name);
              setAge(item.age.toString());
            }} />
          </View>
        )}
      />

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Idade"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />
      <Button
        title={selectedUser ? "Atualizar Usuário" : "Adicionar Usuário"}
        onPress={selectedUser ? updateUser : addUser}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  item: {
    fontSize: 16,
  },
});

export default App;
