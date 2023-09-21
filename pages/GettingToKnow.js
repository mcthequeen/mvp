
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import {useNavigation} from "@react-navigation/native"


export function GettingToKnow({ }) {

  const navigation = useNavigation()

  const [formData, setFormData] = useState({
    companyWebsite: '',
    caenCode: '',
    cuiCode: '',
    turnover: '',
    numEmployees: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    for (const key in formData) {
      if (!formData[key]) {
        setErrorMessage('Please fill in all fields.');
        return;
      }
    }
    navigation.navigate("step01a")
    setErrorMessage('');
    // Proceed with form submission or other actions
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>What is the website of your company?</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => handleChange('companyWebsite', value)}
            value={formData.companyWebsite}
            placeholder="Enter website"
            required
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>What is the CAEN code of the enterprise?</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => handleChange('caenCode', value)}
            value={formData.caenCode}
            placeholder="Enter CAEN code"
            required
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>What is the identification code (CUI) of the enterprise?</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => handleChange('cuiCode', value)}
            value={formData.cuiCode}
            placeholder="Enter CUI code"
            required
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>What was your turnover for the previous year (in million)?</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => handleChange('turnover', value)}
            value={formData.turnover}
            placeholder="Enter turnover"
            keyboardType="numeric"
            required
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>How many employees work in your company?</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => handleChange('numEmployees', value)}
            value={formData.numEmployees}
            placeholder="Enter number of employees"
            keyboardType="numeric"
            required
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
        {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    border: '1px solid black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    maxWidth: 400,
    marginVertical: 50,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,

  },
  formGroup: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'rgb(0, 145, 0)',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
    fontSize: 16,
  },
});



