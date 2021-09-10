import React, { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import Checkbox from '../components/Checkbox';
import { Text, View } from '../components/Themed';

export default function TabOneScreen() {
  const [value, setValue] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ToDo</Text>
      <View style={{ flexDirection: 'row' }}>
        {/* checkbox */}
        <Checkbox
          isChecked={value}
          onPress={() => {
            setValue(!value);
          }}
        />

        {/* Text input */}
        <TextInput
          style={{
            color: 'black',
            flex: 1,
            fontSize: 18,
          }}
        />
      </View>
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
