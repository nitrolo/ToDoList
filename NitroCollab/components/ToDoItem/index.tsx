import React, { useEffect, useState } from 'react';
import { View, TextInput } from 'react-native';
import Checkbox from '../Checkbox';

interface ToDoItemProps {
  todo: {
    id: string;
    content: string;
    isCompleted: boolean;
  };
}

const ToDoItem = ({ todo }: ToDoItemProps) => {
  const [isChecked, setisChecked] = useState(false);
  const [content, setContent] = useState('');

  useEffect(() => {
    if (!todo) {
      return;
    }
    setisChecked(todo.isCompleted);
    setContent(todo.content);
  }, [todo]);

  return (
    <View
      style={{ alignItems: 'center', flexDirection: 'row', marginVertical: 3 }}
    >
      {/* checkbox */}
      <Checkbox
        isChecked={isChecked}
        onPress={() => {
          setisChecked(!isChecked);
        }}
      />

      {/* Text input */}
      <TextInput
        value={content}
        onChangeText={setContent}
        style={{
          color: 'black',
          flex: 1,
          fontSize: 18,
          marginLeft: 12,
        }}
        multiline
      />
    </View>
  );
};

export default ToDoItem;
