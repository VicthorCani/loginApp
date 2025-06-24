import React from 'react';
import { StyleSheet, Button, View, Alert } from 'react-native';
import { supabase } from '../app/lib/supabaseClient';
import { router } from 'expo-router';

const LoggedUser = () => {
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      Alert.alert('Erro ao sair', error.message);
    } else {
      router.replace('../app/index.tsx');  // 👉 Isso envia o usuário para a tela de login
    }
  };

  return (
    <View style={styles.button}>
      <Button title="Sair" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
});

export default LoggedUser;
