import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/native"


export function HomeScreen({ }) {


  const navigation = useNavigation()

  return (
    <View style={styles.home}>
      <View style={styles.centeredContent}>
        <Image source={require('../src/logo.png')} style={styles.logo} />
        <Text style={{
          fontWeight: "bold",
          fontSize: 50,
          color: 'rgb(85,107,47)',
          textAlign: 'center',
        }}>Committing Business to <Text style={{
          fontWeight: "bold",
          fontSize: 50,
          color: 'green',
          textAlign: 'center',
        }}>Ecology.</Text></Text>
        <TouchableOpacity
          onPress={() => {
            // Handle button press here, e.g., navigate to another screen
            navigation.navigate("GettingToKnowYou")
          }}
          style={styles.buttonHome}
        >
          <Text style={styles.buttonText}>My carbon footprint</Text>

        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  home: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100%',

    width: '100%',
    backgroundColor: 'white',
  },
  centeredContent: {
    width: '100%',

    alignItems: 'center',
    textAlign: 'center',
  },
  buttonHome: {
    backgroundColor: 'rgb(0, 145, 0)',
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
  },
  logo: {
    width: 400,
    height: 200,
  },
});

