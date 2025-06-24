import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, TextInput, Alert, TouchableOpacity, Keyboard } from 'react-native';
import ActionButton from '../../components/AddButton';
import LoggedUser from '../../components/LoggedUser';
import { supabase } from '../lib/supabaseClient';
import { Ionicons } from '@expo/vector-icons';

const Page = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [tarefas, setTarefas] = useState<{ id: number; titulo: string }[]>([]);
  const [input, setInput] = useState('');
  const [editandoId, setEditandoId] = useState<number | null>(null);

  useEffect(() => {
    getUser();
    fetchTarefas();
  }, []);

  const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUserEmail(user?.email ?? null);
  };

  const fetchTarefas = async () => {
    const { data, error } = await supabase
      .from('tarefas')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      Alert.alert('Erro ao buscar tarefas', error.message);
    } else if (data) {
      setTarefas(data);
    }
  };

  const handleAddOrEdit = async () => {
    if (input.trim() === '') {
      Alert.alert('Erro', 'Digite um título para a tarefa');
      return;
    }

    Keyboard.dismiss();

    if (editandoId !== null) {
      const { error } = await supabase
        .from('tarefas')
        .update({ titulo: input })
        .eq('id', editandoId);

      if (error) {
        Alert.alert('Erro ao editar', error.message);
      } else {
        await fetchTarefas();
        setEditandoId(null);
      }
    } else {
      const { error } = await supabase
        .from('tarefas')
        .insert([{ titulo: input, user_email: userEmail }]);

      if (error) {
        Alert.alert('Erro ao adicionar', error.message);
      } else {
        await fetchTarefas();
      }
    }

    setInput('');
  };

  const iniciarEdicao = (id: number, titulo: string) => {
    setInput(titulo);
    setEditandoId(id);
  };

  const excluirTarefa = async (id: number) => {
    const { error } = await supabase
      .from('tarefas')
      .delete()
      .eq('id', id);

    if (error) {
      Alert.alert('Erro ao excluir', error.message);
    } else {
      await fetchTarefas();
    }
  };

  const renderItem = ({ item }: { item: { id: number; titulo: string } }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>{item.titulo}</Text>
      <View style={styles.buttons}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.editButton]}
          onPress={() => iniciarEdicao(item.id, item.titulo)}
        >
          <Ionicons name="pencil" size={18} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => excluirTarefa(item.id)}
        >
          <Ionicons name="trash" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Bem-vindo,</Text>
        <Text style={styles.userEmail}>{userEmail ?? 'Usuário'}</Text>
        <LoggedUser />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome da tarefa..."
          placeholderTextColor="#999"
          value={input}
          onChangeText={setInput}
          onSubmitEditing={handleAddOrEdit}
        />
        <TouchableOpacity 
          style={styles.addButton} 
          onPress={handleAddOrEdit}
        >
          <Ionicons 
            name={editandoId !== null ? "checkmark" : "add"} 
            size={24} 
            color="#fff" 
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={tarefas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="list" size={50} color="#6c5ce7" />
            <Text style={styles.emptyText}>Nenhuma tarefa encontrada</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '300',
    color: '#333',
  },
  userEmail: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6c5ce7',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  addButton: {
    backgroundColor: '#6c5ce7',
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    shadowColor: '#6c5ce7',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  item: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#6c5ce7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#00b894',
  },
  deleteButton: {
    backgroundColor: '#d63031',
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
    marginTop: 15,
  },
});

export default Page;