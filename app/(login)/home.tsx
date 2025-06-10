import React, { FlatList, StyleSheet, Button, Text, View, TouchableOpacity} from  'react-native';
import auth from '@react-native-firebase/auth';
import Item from "../../components/item";
import AddButton from '../../components/AddButton'; // novo botão
import LoggedUser from '../../components/LoggedUser'; // novo botão
 
const Page = () => {
    const user = auth().currentUser;
 
    const tarefas =[
        {titulo: "Tarefa 0001"},
        {titulo: "Tarefa 0002"},
        {titulo: "Tarefa 0003"},
        {titulo: "Tarefa 0004"},
        {titulo: "Tarefa 0005"}              
    ];
 
    return (
        <View>
            <Text> Bem vindo {user?.email}</Text>
            <LoggedUser/>
            <Item
            data={tarefas}
            onDelete={()=> alert('evento do componente de exclusão')}
           onEdit={() => alert('evento do componente de edição')}/>
           
        <AddButton onPress={() => alert('evento do componente de adicionar tarefas')} />
        </View>
    );
};
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 65,
        flex: 1,
        justifyContent: "space-between"
    },
});
export default Page;
  