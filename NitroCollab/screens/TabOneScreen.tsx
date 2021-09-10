import React, { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ToDoItem from '../components/ToDoItem';
import { Text, View } from '../components/Themed';

let id = '4';

export default function TabOneScreen() {
  const [todos, setTodos] = useState([
    {
      id: '1',
      content: 'Dummy ToDo 1',
      isCompleted: false,
    },
    {
      id: '2',
      content: 'Dummy ToDo 2',
      isCompleted: false,
    },
    {
      id: '3',
      content: 'Dummy ToDo 3',
      isCompleted: false,
    },
  ]);

  const createNewItem = (atIndex: number) => {
    const newTodos = [...todos];
    newTodos.splice(atIndex, 0, { id: id, content: '', isCompleted: false });
    setTodos(newTodos);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ToDo</Text>

      <FlatList
        data={todos}
        renderItem={({ item, index }) => (
          <ToDoItem todo={item} onSubmit={() => createNewItem(index + 1)} />
        )}
        style={{ width: '100%' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
