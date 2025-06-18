import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View, TextInput, Alert, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AddButton from '../../components/AddButton';
import LoggedUser from '../../components/LoggedUser';

const Page = () => {
  const user = auth().currentUser;

  const [tarefas, setTarefas] = useState([
    { id: 1, titulo: "Tarefa 0001" },
    { id: 2, titulo: "Tarefa 0002" },
    { id: 3, titulo: "Tarefa 0003" },
    { id: 4, titulo: "Tarefa 0004" },
    { id: 5, titulo: "Tarefa 0005" }
  ]);

  const [input, setInput] = useState('');
  const [editandoId, setEditandoId] = useState<number | null>(null);

  const handleAddOrEdit = () => {
    if (input.trim() === '') {
      Alert.alert('Erro', 'Digite um título para a tarefa');
      return;
    }

    if (editandoId !== null) {
      // Editar tarefa
      setTarefas(prev =>
        prev.map(item =>
          item.id === editandoId ? { ...item, titulo: input } : item
        )
      );
      setEditandoId(null);
    } else {
      // Adicionar nova tarefa
      const novaTarefa = {
        id: tarefas.length + 1,
        titulo: input,
      };
      setTarefas(prev => [...prev, novaTarefa]);
    }

    setInput('');
  };

  const iniciarEdicao = (id: number, titulo: string) => {
    setInput(titulo);
    setEditandoId(id);
  };

  const excluirTarefa = (id: number) => {
    setTarefas(prev => prev.filter(item => item.id !== id));
  };

  const renderItem = ({ item }: { item: { id: number; titulo: string } }) => (
    <View style={styles.item}>
      <Text>{item.titulo}</Text>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.iconButton} onPress={() => iniciarEdicao(item.id, item.titulo)}>
          <Feather name="edit-2" size={20} color="#2E5AAC" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => excluirTarefa(item.id)}>
          <MaterialIcons name="delete" size={20} color="#D11A2A" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text>Bem-vindo {user?.email}</Text>
      <LoggedUser />

      <TextInput
        style={styles.input}
        placeholder="Digite o nome da tarefa"
        value={input}
        onChangeText={setInput}
      />

      <AddButton onPress={handleAddOrEdit} />

      <FlatList
        data={tarefas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    paddingHorizontal: 10,
  },
  item: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttons: {
    flexDirection: 'row',
    gap: 10,
  },
  iconButton: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 25,
    elevation: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 10,
    borderRadius: 5,
  },
});

export default Page;
