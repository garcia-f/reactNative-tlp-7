import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

export default function App() {
  const [userInput, setUserInput] = useState('');
  const [list, setList] = useState([]);

  const updateInput = (value) => {
    setUserInput(value);
  };

  const addItem = () => {
    if (userInput !== '') {
      const newItem = {
        id: Math.random().toString(),
        value: userInput
      };
      setList([...list, newItem]);
      setUserInput('');
    }
  };

  const deleteItem = (id) => {
    setList(list.filter(item => item.id !== id));
  };

  const editItem = (id) => {
    const newValue = prompt('Edit the todo:');
    if (newValue !== null && newValue.trim() !== '') {
      setList(prevList =>
        prevList.map(item => (item.id === id ? { ...item, value: newValue } : item))
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tareas</Text>
      <TextInput
        style={styles.input}
        placeholder="Add item . . ."
        value={userInput}
        onChangeText={updateInput}
      />
      <Button title="Agregar" onPress={addItem} />
      <ScrollView style={styles.listContainer}>
        {list.map(item => (
          <View key={item.id} style={styles.item}>
            <Text>{item.value}</Text>
            <View style={styles.buttonContainer}>
              <Button title="Eliminar" onPress={() => deleteItem(item.id)} />
              <Button title="Editar" onPress={() => editItem(item.id)} />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  listContainer: {
    width: '100%',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'lightgray',
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
});
