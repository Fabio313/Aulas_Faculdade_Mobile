import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const handleSubmit = () => {
    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert('Erro', 'Por favor, insira um email válido.');
      return;
    }

    if (isNaN(Number(age)) || Number(age) < 0) {
      Alert.alert('Erro', 'Por favor, insira uma idade válida.');
      return;
    }

    // Aqui você pode fazer algo com os dados do formulário
    console.log({ name, email, age, gender, dateOfBirth });
  };

  const handleConfirm = (date: Date) => {
    setDateOfBirth(date);
    setDatePickerVisibility(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome:</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Idade:</Text>
      <TextInput
        style={styles.input}
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Gênero:</Text>
      <Picker
        selectedValue={gender}
        style={styles.picker}
        onValueChange={(itemValue) => setGender(itemValue)}
      >
        <Picker.Item label="Masculino" value="male" />
        <Picker.Item label="Feminino" value="female" />
        <Picker.Item label="Outro" value="other" />
      </Picker>

      <Text style={styles.label}>Data de Nascimento:</Text>
      <Button title="Selecionar Data" onPress={() => setDatePickerVisibility(true)} />
      {dateOfBirth && <Text style={styles.selectedDate}>{dateOfBirth.toLocaleDateString()}</Text>}
      
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={() => setDatePickerVisibility(false)}
      />

      <Button title="Cadastrar" onPress={handleSubmit} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'stretch',
  },
  label: {
    marginTop: 10,
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    marginTop: 5,
  },
  picker: {
    height: 50,
    width: '100%',
    marginTop: 5,
  },
  selectedDate: {
    marginTop: 5,
    fontSize: 16,
    marginBottom: 10
  },
});
