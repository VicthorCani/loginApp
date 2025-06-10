import React, { FlatList, StyleSheet, Button, Text, View, TouchableOpacity} from  'react-native';
import auth from '@react-native-firebase/auth';
 
 
const LoggedUser= () => {
 
  return (
    <Button title="Sair" onPress={() => auth().signOut()}/>
  );
};
 
const styles = StyleSheet.create({
  button:{
        width:"100%",
        alignItems: "center"
    }
});
 
export default LoggedUser;