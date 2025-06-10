import React from 'react-native';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
type Props = {
  onPress: () => void;
};
 
const AddButton= ({ onPress }:Props) => {
 
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.plus}>+</Text>
    </TouchableOpacity>
  );
};
 
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007bff',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000', // Sombra iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    marginLeft: 300,
  },
  plus: {
    color: '#fff',
    fontSize: 32,
    lineHeight: 36,
    marginTop: -2, // pequeno ajuste para centralizar o "+"
    fontWeight: 'bold',
  },
 
});
 
export default AddButton;