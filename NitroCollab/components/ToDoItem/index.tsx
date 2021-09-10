import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
import Checkbox from '../Checkbox';

const ToDoItem = () => {
  const [isChecked, setisChecked] = useState(false);

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
