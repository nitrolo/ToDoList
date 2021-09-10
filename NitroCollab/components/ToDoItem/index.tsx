import React, { useEffect, useRef, useState } from 'react';
import { View, TextInput } from 'react-native';
import Checkbox from '../Checkbox';

interface ToDoItemProps {
  todo: {
    id: string;
    content: string;
    isCompleted: boolean;
  };
  onSubmit: () => void;
}

const ToDoItem = ({ todo, onSubmit }: ToDoItemProps) => {
  const [isChecked, setisChecked] = useState(false);
  const [content, setContent] = useState('');
  const input = useRef(null);

  useEffect(() => {
    if (!todo) {
      return;
    }
    setisChecked(todo.isCompleted);
    setContent(todo.content);
  }, [todo]);

  useEffect(() => {
    if (input.current) {
      input.current.focus();
    }
  }, [input]);

  const onKeyPress = ({ nativeEvent }) => {
    if (nativeEvent.key === 'Backspace' && content === '') {
      //delete item
      console.warn('delete item');
    }
  };

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
        ref={input}
        value={content}
        onChangeText={setContent}
        style={{
          color: 'black',
          flex: 1,
          fontSize: 18,
          marginLeft: 12,
        }}
        multiline
        onSubmitEditing={onSubmit}
        blurOnSubmit
        onKeyPress={onKeyPress}
      />
    </View>
  );
};

export default ToDoItem;
