import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type Props = {
  onPress: () => void;
  type: 'add' | 'edit' | 'delete';
};

const ActionButton = ({ onPress, type }: Props) => {
  const getButtonStyle = () => {
    switch (type) {
      case 'add':
        return [styles.button, { backgroundColor: '#28a745' }]; // Verde
      case 'edit':
        return [styles.button, { backgroundColor: '#ffc107' }]; // Amarelo
      case 'delete':
        return [styles.button, { backgroundColor: '#dc3545' }]; // Vermelho
      default:
        return styles.button;
    }
  };

  const getLabel = () => {
    switch (type) {
      case 'add':
        return '+';
      case 'edit':
        return '✎';
      case 'delete':
        return '🗑️';
      default:
        return '?';
    }
  };

  return (
    <TouchableOpacity style={getButtonStyle()} onPress={onPress}>
      <Text style={styles.label}>{getLabel()}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    margin: 10,
  },
  label: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default ActionButton;
